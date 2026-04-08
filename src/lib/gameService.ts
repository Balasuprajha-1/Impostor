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
}

export const gameService = {
  // Create a new game room
  async createGameRoom(hostName: string, roomName: string): Promise<string> {
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

    // Select random impostor
    const impostorIndex = Math.floor(Math.random() * room.players.length)
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
      { main: 'hospital', impostor: 'healthcare' },
      { main: 'supermarket', impostor: 'shopping' },
      { main: 'telephone', impostor: 'communication' },
    ]

    const wordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)]

    // Assign words to players
    const updatedPlayers = room.players.map((player) => ({
      ...player,
      word: player.id === impostorId ? wordPair.impostor : wordPair.main,
      isImpostor: player.id === impostorId,
      voted: undefined,
      description: undefined,
    }))

    const roomRef = doc(db, 'gameRooms', roomId)
    await updateDoc(roomRef, {
      status: 'playing',
      currentPhase: 'description',
      players: updatedPlayers,
      mainWord: wordPair.main,
      impostorWord: wordPair.impostor,
      impostorId,
      playerVotes: {},
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

    const updatedPlayers = room.players.map((player) =>
      player.id === playerId ? { ...player, description } : player
    )

    const roomRef = doc(db, 'gameRooms', roomId)
    await updateDoc(roomRef, {
      players: updatedPlayers,
    })
  },

  // Move to voting phase
  async moveToVoting(roomId: string): Promise<void> {
    const roomRef = doc(db, 'gameRooms', roomId)
    await updateDoc(roomRef, {
      currentPhase: 'voting',
    })
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

    const updatedPlayers = room.players.map((player) =>
      player.id === voterId ? { ...player, voted: votedPlayerId } : player
    )

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

  // Reset game
  async resetGame(roomId: string): Promise<void> {
    const room = await this.getGameRoom(roomId)
    if (!room) throw new Error('Room not found')

    const resetPlayers = room.players.map((player) => ({
      ...player,
      word: undefined,
      description: undefined,
      voted: undefined,
      isImpostor: false,
      isAlive: true,
    }))

    const roomRef = doc(db, 'gameRooms', roomId)
    await updateDoc(roomRef, {
      status: 'waiting',
      currentPhase: undefined,
      players: resetPlayers,
      mainWord: undefined,
      impostorWord: undefined,
      impostorId: undefined,
      playerVotes: {},
    })
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
