'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { gameService, GameRoom } from '@/lib/gameService'
import { useGame } from '@/lib/gameContext'
import WaitingPhase from '@/components/phases/WaitingPhase'
import DescriptionPhase from '@/components/phases/DescriptionPhase'
import VotingPhase from '@/components/phases/VotingPhase'
import ResultsPhase from '@/components/phases/ResultsPhase'

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const roomId = params.id as string
  const { playerId, playerName, room, setRoom } = useGame()
  const [loading, setLoading] = useState(true)
  const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null)

  useEffect(() => {
    if (!playerId || !playerName) {
      router.push('/')
      return
    }

    // Subscribe to room updates
    const unsub = gameService.subscribeToRoom(roomId, (updatedRoom) => {
      setRoom(updatedRoom)
      setLoading(false)
    })

    setUnsubscribe(() => unsub)

    return () => {
      unsub()
    }
  }, [roomId, playerId, playerName, router, setRoom])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading game...</p>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Room not found</h2>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  let phase = null

  if (room.status === 'waiting') {
    phase = <WaitingPhase room={room} playerId={playerId} />
  } else if (room.currentPhase === 'description') {
    phase = <DescriptionPhase room={room} playerId={playerId} playerName={playerName!} />
  } else if (room.currentPhase === 'voting') {
    phase = <VotingPhase room={room} playerId={playerId} playerName={playerName!} />
  } else if (room.currentPhase === 'results' || room.status === 'results') {
    phase = <ResultsPhase room={room} playerId={playerId} />
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {phase}
    </div>
  )
}
