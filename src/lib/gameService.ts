import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import { v4 as uuidv4 } from 'uuid'

export interface Player {
  id: string
  name: string
  word?: string
  description?: string
  isImpostor: boolean
  voted?: string
  isAlive?: boolean
}

export interface GameRoom {
  id: string
  name: string
  host: string
  status: 'waiting' | 'playing' | 'voting' | 'results' | 'ended'
  players: Player[]
  mainWord?: string
  impostorWord?: string
  impostorId?: string
  createdAt: Timestamp
  currentPhase?: 'description' | 'voting' | 'results'
  playerVotes?: Record<string, string>
  currentRound: number
  roundsPerImpostor: number
  totalImpostorCycles: number
  impostorCycle: number
}

// Helper function to clean player objects (remove undefined values)
function cleanPlayer(player: Player): any {
  const cleanPlayer: any = {
    id: player.id,
    name: player.name,
    isImpostor: player.isImpostor,
  }
  if (player.word !== undefined) cleanPlayer.word = player.word
  if (player.description !== undefined && player.description !== '') cleanPlayer.description = player.description
  if (player.voted !== undefined && player.voted !== '') cleanPlayer.voted = player.voted
  if (player.isAlive !== undefined) cleanPlayer.isAlive = player.isAlive
  return cleanPlayer
}

export const gameService = {
  // Create a new game room
  async createGameRoom(hostName: string, roomName: string, impostorCycles: number = 2): Promise<string> {
    const roomId = uuidv4()
    const room: GameRoom = {
      id: roomId,
      name: roomName,
      host: hostName,
      status: 'waiting',
      players: [
        {
          id: uuidv4(),
          name: hostName,
          isImpostor: false,
          isAlive: true,
        },
      ],
      currentRound: 0,
      roundsPerImpostor: 2,
      totalImpostorCycles: impostorCycles,
      impostorCycle: 0,
      createdAt: serverTimestamp() as Timestamp,
    }

    await setDoc(doc(db, 'gameRooms', roomId), room)
    return roomId
  },

  // Join a game room
  async joinGameRoom(roomId: string, playerName: string): Promise<string> {
    const roomRef = doc(db, 'gameRooms', roomId)
    const roomSnap = await getDoc(roomRef)

    if (!roomSnap.exists()) {
      throw new Error('Room not found')
    }

    const room = roomSnap.data() as GameRoom

    if (room.players.length >= 12) {
      throw new Error('Room is full')
    }

    if (room.status !== 'waiting') {
      throw new Error('Game has already started')
    }

    const playerId = uuidv4()
    const newPlayer: Player = {
      id: playerId,
      name: playerName,
      isImpostor: false,
      isAlive: true,
    }

    room.players.push(newPlayer)
    await updateDoc(roomRef, {
      players: room.players,
    })

    return playerId
  },

  // Get game room data
  async getGameRoom(roomId: string): Promise<GameRoom | null> {
    const roomRef = doc(db, 'gameRooms', roomId)
    const roomSnap = await getDoc(roomRef)

    if (!roomSnap.exists()) {
      return null
    }

    return roomSnap.data() as GameRoom
  },

  // Start the game
  async startGame(roomId: string): Promise<void> {
    const room = await this.getGameRoom(roomId)
    if (!room) throw new Error('Room not found')

    const nextRound = (room.currentRound || 0) + 1
    
    // Determine if we start a new impostor cycle
    const roundInCycle = ((nextRound - 1) % room.roundsPerImpostor) + 1
    const CycleNumber = Math.floor((nextRound - 1) / room.roundsPerImpostor)
    
    // Find host player
    const hostPlayer = room.players.find((p) => p.name === room.host)
    const hostPlayerId = hostPlayer?.id

    // Select impostor: changes after every 2 rounds, but never the host
    let impostorIndex = CycleNumber % room.players.length
    
    // If selected impostor is the host, pick the next player
    if (room.players[impostorIndex].id === hostPlayerId) {
      impostorIndex = (impostorIndex + 1) % room.players.length
    }
    
    const impostorId = room.players[impostorIndex].id

    // Assign words
    const wordPairs = [
      { main: 'toothbrush', impostor: 'cleaning' },
      { main: 'basketball', impostor: 'ball' },
      { main: 'pizza', impostor: 'food' },
      { main: 'computer', impostor: 'electronics' },
      { main: 'airplane', impostor: 'travel' },
      { main: 'library', impostor: 'books' },
      { main: 'restaurant', impostor: 'dining' },
      { main: 'hospital', impostor: 'health' },
      { main: 'supermarket', impostor: 'shopping' },
      { main: 'telephone', impostor: 'communication' },
    ]

    const wordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)]

    // Assign words to players - impostor gets NO WORD
    const updatedPlayers = room.players.map((player) => {
      const cleanedPlayer = {
        id: player.id,
        name: player.name,
        isImpostor: player.id === impostorId,
        word: player.id === impostorId ? undefined : wordPair.main,
      } as any

      // Add optional fields if they exist
      if (player.description) cleanedPlayer.description = player.description
      if (player.voted) cleanedPlayer.voted = player.voted
      if (player.isAlive !== undefined) cleanedPlayer.isAlive = player.isAlive

      // Remove word field if undefined
      if (cleanedPlayer.word === undefined) delete cleanedPlayer.word

      return cleanedPlayer
    })

    const roomRef = doc(db, 'gameRooms', roomId)
    await updateDoc(roomRef, {
      status: 'playing',
      currentPhase: 'description',
      currentRound: nextRound,
      impostorCycle: CycleNumber + 1,
      players: updatedPlayers,
      mainWord: wordPair.main,
      impostorId,
    })
  },

  // Submit description
  async submitDescription(
    roomId: string,
    playerId: string,
    description: string
  ): Promise<void> {
    const room = await this.getGameRoom(roomId)
    if (!room) throw new Error('Room not found')

    const updatedPlayers = room.players.map((player) => {
      if (player.id === playerId) {
        const cleanedPlayer = cleanPlayer(player)
        cleanedPlayer.description = description
        return cleanedPlayer
      }
      return cleanPlayer(player)
    })

    const roomRef = doc(db, 'gameRooms', roomId)
    await updateDoc(roomRef, {
      players: updatedPlayers,
    })
  },

  // Move to voting phase (after 2 rounds)
  async moveToVoting(roomId: string): Promise<void> {
    const room = await this.getGameRoom(roomId)
    if (!room) throw new Error('Room not found')

    const roundInCycle = ((room.currentRound - 1) % room.roundsPerImpostor) + 1

    // If we've completed 2 rounds with same impostor, move to voting
    if (roundInCycle === room.roundsPerImpostor) {
      const roomRef = doc(db, 'gameRooms', roomId)
      await updateDoc(roomRef, {
        currentPhase: 'voting',
        playerVotes: {},
      })
    } else {
      // Otherwise go back to waiting for next round with same impostor
      // Clear descriptions for next round
      const updatedPlayers = room.players.map((player) => {
        const cleaned = cleanPlayer(player)
        cleaned.description = ''
        return cleaned
      })

      const roomRef = doc(db, 'gameRooms', roomId)
      await updateDoc(roomRef, {
        status: 'waiting',
        currentPhase: 'description',
        players: updatedPlayers,
      })
    }
  },

  // Submit vote
  async submitVote(
    roomId: string,
    voterId: string,
    votedPlayerId: string
  ): Promise<void> {
    const room = await this.getGameRoom(roomId)
    if (!room) throw new Error('Room not found')

    const votes = room.playerVotes || {}
    votes[voterId] = votedPlayerId

    const updatedPlayers = room.players.map((player) => {
      if (player.id === voterId) {
        const cleanedPlayer = cleanPlayer(player)
        cleanedPlayer.voted = votedPlayerId
        return cleanedPlayer
      }
      return cleanPlayer(player)
    })

    const roomRef = doc(db, 'gameRooms', roomId)
    await updateDoc(roomRef, {
      playerVotes: votes,
      players: updatedPlayers,
    })
  },

  // Finish voting and calculate results
  async finishVoting(roomId: string): Promise<void> {
    const room = await this.getGameRoom(roomId)
    if (!room) throw new Error('Room not found')

    const votes = room.playerVotes || {}
    const voteCount: Record<string, number> = {}

    Object.values(votes).forEach((votedId) => {
      voteCount[votedId] = (voteCount[votedId] || 0) + 1
    })

    // Find the player with most votes
    let eliminatedPlayerId = ''
    let maxVotes = 0

    Object.entries(voteCount).forEach(([playerId, count]) => {
      if (count > maxVotes) {
        maxVotes = count
        eliminatedPlayerId = playerId
      }
    })

    const isImpostorEliminated = eliminatedPlayerId === room.impostorId

    const roomRef = doc(db, 'gameRooms', roomId)
    await updateDoc(roomRef, {
      currentPhase: 'results',
      status: 'results',
    })
  },

  // Subscribe to room updates
  subscribeToRoom(
    roomId: string,
    callback: (room: GameRoom) => void
  ): (() => void) {
    const roomRef = doc(db, 'gameRooms', roomId)
    return onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as GameRoom)
      }
    })
  },

  // Reset game for next impostor or end
  async resetGame(roomId: string): Promise<void> {
    const room = await this.getGameRoom(roomId)
    if (!room) throw new Error('Room not found')

    // Build clean player objects without undefined values
    const resetPlayers = room.players.map((player) => {
      const cleaned = cleanPlayer(player)
      cleaned.isImpostor = false
      cleaned.isAlive = true
      return cleaned
    })

    // Check if we have more impostors to play
    const nextCycle = (room.impostorCycle || 0) + 1
    const hasMoreCycles = nextCycle <= room.totalImpostorCycles

    const roomRef = doc(db, 'gameRooms', roomId)
    
    if (hasMoreCycles) {
      // Continue with next impostor cycle
      await updateDoc(roomRef, {
        status: 'waiting',
        currentRound: 0,
        players: resetPlayers,
      })
    } else {
      // Game ended, no more cycles
      await updateDoc(roomRef, {
        status: 'ended',
        players: resetPlayers,
      })
    }
  },

  // Leave room
  async leaveRoom(roomId: string, playerId: string): Promise<void> {
    const room = await this.getGameRoom(roomId)
    if (!room) throw new Error('Room not found')

    const updatedPlayers = room.players.filter((p) => p.id !== playerId)

    if (updatedPlayers.length === 0) {
      // Delete room if empty
      const roomRef = doc(db, 'gameRooms', roomId)
      await updateDoc(roomRef, { status: 'ended' })
      return
    }

    const roomRef = doc(db, 'gameRooms', roomId)
    await updateDoc(roomRef, {
      players: updatedPlayers,
    })
  },
}
