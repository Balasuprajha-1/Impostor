'use client'

import { useState } from 'react'
import { gameService, GameRoom } from '@/lib/gameService'

interface VotingPhaseProps {
  room: GameRoom
  playerId: string | null
  playerName: string
}

export default function VotingPhase({
  room,
  playerId,
  playerName,
}: VotingPhaseProps) {
  const [selectedVote, setSelectedVote] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const currentPlayer = room.players.find((p) => p.id === playerId)
  const allVoted = room.players.every((p) => p.voted)

  const handleSubmitVote = async () => {
    if (!selectedVote) return

    setLoading(true)
    try {
      await gameService.submitVote(room.id, playerId!, selectedVote)
      setSubmitted(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleFinishVoting = async () => {
    setLoading(true)
    try {
      await gameService.finishVoting(room.id)
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
          <h1 className="text-4xl font-bold text-white mb-2">Voting Phase</h1>
          <p className="text-gray-300">
            Who is the impostor? Cast your vote now!
          </p>
        </div>

        {/* Descriptions Reminder */}
        <div className="mb-8 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Descriptions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {room.players.map((player) => (
              <div
                key={player.id}
                className="p-3 bg-gray-700 rounded border-l-4 border-blue-500"
              >
                <p className="text-sm text-gray-400">{player.name}</p>
                <p className="text-base font-bold text-white">{player.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Voting Interface */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Players to Vote */}
          <div className="md:col-span-2 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Who is the Impostor?</h2>
            <div className="space-y-2">
              {room.players.map((player) => (
                <button
                  key={player.id}
                  onClick={() => {
                    if (!submitted) setSelectedVote(player.id)
                  }}
                  disabled={submitted}
                  className={`w-full p-4 rounded-lg font-semibold transition-colors text-left ${
                    selectedVote === player.id && !submitted
                      ? 'bg-red-600 text-white ring-2 ring-red-400'
                      : submitted && currentPlayer?.voted === player.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span>{player.name}</span>
                    {submitted && currentPlayer?.voted === player.id && (
                      <span className="text-sm">✓ Your vote</span>
                    )}
                  </span>
                </button>
              ))}
            </div>

            {!submitted ? (
              <button
                onClick={handleSubmitVote}
                disabled={!selectedVote || loading}
                className="w-full mt-6 py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold rounded transition-colors"
              >
                {loading ? 'Submitting...' : 'Submit Vote'}
              </button>
            ) : (
              <div className="mt-6 p-3 bg-green-900 border border-green-600 rounded text-green-100 text-center font-semibold">
                ✓ Vote submitted
              </div>
            )}
          </div>

          {/* Voting Status */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Voting Status</h3>
            <div className="space-y-2">
              {room.players.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-3 rounded ${
                    player.voted ? 'bg-green-900' : 'bg-gray-700'
                  }`}
                >
                  <span className="font-semibold">{player.name}</span>
                  <span className="text-sm">
                    {player.voted ? '✓ Voted' : 'Voting...'}
                  </span>
                </div>
              ))}
            </div>

            {/* Move to Results */}
            {allVoted && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={handleFinishVoting}
                  disabled={loading}
                  className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded transition-colors"
                >
                  {loading ? 'Loading...' : 'See Results'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
