'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { gameService, GameRoom } from '@/lib/gameService'
import { useGame } from '@/lib/gameContext'

interface WaitingPhaseProps {
  room: GameRoom
  playerId: string | null
}

export default function WaitingPhase({ room, playerId }: WaitingPhaseProps) {
  const router = useRouter()
  const { clearGame } = useGame()
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const isHost = room.host === room.players.find((p) => p.id === playerId)?.name
  const canStartGame = room.players.length >= 3

  const handleStartGame = async () => {
    setLoading(true)
    try {
      await gameService.startGame(room.id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(room.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLeaveRoom = async () => {
    try {
      if (playerId) {
        await gameService.leaveRoom(room.id, playerId)
      }
      clearGame()
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-2">{room.name}</h1>
          <p className="text-gray-300 mb-4">Room ID: {room.id}</p>
          <button
            onClick={handleCopyRoomId}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
          >
            {copied ? 'Copied!' : 'Copy Room ID'}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Players List */}
          <div className="md:col-span-2 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Players ({room.players.length}/12)
            </h2>
            <div className="space-y-2">
              {room.players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded"
                >
                  <span className="font-semibold">
                    {player.name}
                    {player.name === room.host && (
                      <span className="ml-2 text-sm text-yellow-400">(Host)</span>
                    )}
                  </span>
                  <span className="text-sm text-gray-400">
                    {room.players.indexOf(player) + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Game Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-lg font-semibold text-blue-400">Waiting for players</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Min Players</p>
                <p className="text-lg font-semibold text-white">3 players</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Max Players</p>
                <p className="text-lg font-semibold text-white">12 players</p>
              </div>
              <div className="pt-3 border-t border-gray-700">
                <p className="text-sm text-gray-300">
                  {canStartGame
                    ? 'Ready to start!'
                    : `Need ${3 - room.players.length} more players`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {isHost && (
            <button
              onClick={handleStartGame}
              disabled={!canStartGame || loading}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-colors"
            >
              {loading ? 'Starting...' : 'Start Game'}
            </button>
          )}
          <button
            onClick={handleLeaveRoom}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
          >
            Leave Room
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
          <ol className="space-y-2 text-gray-300 list-decimal list-inside">
            <li>Gather 3-12 players in this room</li>
            <li>Host clicks "Start Game" when everyone is ready</li>
            <li>Each player gets a word (impostor gets a different one)</li>
            <li>Players describe their word using just ONE word</li>
            <li>Team votes to find the impostor</li>
            <li>If impostor is found, they lose. If not, impostor wins!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
