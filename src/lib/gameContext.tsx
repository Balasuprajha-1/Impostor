'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { GameRoom } from './gameService'

interface GameContextType {
  roomId: string | null
  playerId: string | null
  playerName: string | null
  room: GameRoom | null
  setRoomId: (id: string) => void
  setPlayerId: (id: string) => void
  setPlayerName: (name: string) => void
  setRoom: (room: GameRoom) => void
  clearGame: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [roomId, setRoomIdState] = useState<string | null>(null)
  const [playerId, setPlayerIdState] = useState<string | null>(null)
  const [playerName, setPlayerNameState] = useState<string | null>(null)
  const [room, setRoomState] = useState<GameRoom | null>(null)

  const setRoomId = useCallback((id: string) => setRoomIdState(id), [])
  const setPlayerId = useCallback((id: string) => setPlayerIdState(id), [])
  const setPlayerName = useCallback((name: string) => setPlayerNameState(name), [])
  const setRoom = useCallback((room: GameRoom) => setRoomState(room), [])
  const clearGame = useCallback(() => {
    setRoomIdState(null)
    setPlayerIdState(null)
    setPlayerNameState(null)
    setRoomState(null)
  }, [])

  return (
    <GameContext.Provider
      value={{
        roomId,
        playerId,
        playerName,
        room,
        setRoomId,
        setPlayerId,
        setPlayerName,
        setRoom,
        clearGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}
