'use client'

import { useState } from 'react'
import { gameService, GameRoom } from '@/lib/gameService'

interface DescriptionPhaseProps {
  room: GameRoom
  playerId: string | null
  playerName: string
}

export default function DescriptionPhase({
  room,
  playerId,
  playerName,
}: DescriptionPhaseProps) {
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const currentPlayer = room.players.find((p) => p.id === playerId)
  const allSubmitted = room.players.every((p) => p.description)

  const handleSubmitDescription = async () => {
    if (!description.trim()) return

    setLoading(true)
    try {
      await gameService.submitDescription(room.id, playerId!, description)
      setSubmitted(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleMoveToVoting = async () => {
    setLoading(true)
    try {
      await gameService.moveToVoting(room.id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-2">Description Phase</h1>
          <p className="text-gray-300">Describe your word in just ONE word!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Description Input */}
          <div className="md:col-span-2 bg-gray-800 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">Your Word</h2>
              {currentPlayer?.isImpostor && (
                <div className="p-4 bg-red-900 border-2 border-red-600 rounded-lg mb-4">
                  <p className="text-red-100 font-bold">⚠️ You are the IMPOSTOR!</p>
                  <p className="text-red-200 text-sm mt-1">
                    Your word: {currentPlayer.word}
                  </p>
                </div>
              )}
              {!currentPlayer?.isImpostor && (
                <div className="p-4 bg-blue-900 border-2 border-blue-600 rounded-lg mb-4">
                  <p className="text-blue-100 text-lg font-bold">
                    {currentPlayer?.word}
                  </p>
                </div>
              )}
            </div>

            {!submitted ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Description (one word only)
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Type one word..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    disabled={submitted}
                  />
                </div>
                <button
                  onClick={handleSubmitDescription}
                  disabled={!description.trim() || loading}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded transition-colors"
                >
                  {loading ? 'Submitting...' : 'Submit Description'}
                </button>
              </div>
            ) : (
              <div className="p-4 bg-green-900 border border-green-600 rounded text-green-100">
                ✓ Your description submitted: <span className="font-bold">{description}</span>
              </div>
            )}
          </div>

          {/* Players Status */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Player Status</h3>
            <div className="space-y-2">
              {room.players.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-3 rounded ${
                    player.description ? 'bg-green-900' : 'bg-gray-700'
                  }`}
                >
                  <span className="font-semibold">{player.name}</span>
                  <span className="text-sm">
                    {player.description ? '✓ Done' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>

            {/* Move to Voting */}
            {allSubmitted && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={handleMoveToVoting}
                  disabled={loading}
                  className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded transition-colors"
                >
                  {loading ? 'Loading...' : 'Move to Voting'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Descriptions Board */}
        {room.players.some((p) => p.description) && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">All Descriptions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {room.players.map((player) => (
                <div
                  key={player.id}
                  className="p-4 bg-gray-700 rounded border-l-4 border-blue-500"
                >
                  <p className="text-sm text-gray-400 mb-1">{player.name}</p>
                  {player.description ? (
                    <p className="text-lg font-bold text-white">{player.description}</p>
                  ) : (
                    <p className="text-lg font-bold text-gray-500">Waiting...</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
