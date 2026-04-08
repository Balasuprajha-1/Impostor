'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { gameService, GameRoom } from '@/lib/gameService'
import { useGame } from '@/lib/gameContext'

interface ResultsPhaseProps {
  room: GameRoom
  playerId: string | null
}

export default function ResultsPhase({ room, playerId }: ResultsPhaseProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { clearGame } = useGame()

  const votes = room.playerVotes || {}
  const voteCount: Record<string, number> = {}

  // Count votes
  Object.values(votes).forEach((votedId: string) => {
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

  const eliminatedPlayer = room.players.find((p) => p.id === eliminatedPlayerId)
  const isImpostorEliminated = eliminatedPlayerId === room.impostorId
  const currentPlayer = room.players.find((p) => p.id === playerId)
  const hasMoreCycles = (room.impostorCycle || 1) < (room.totalImpostorCycles || 2)

  const handlePlayAgain = async () => {
    setLoading(true)
    try {
      await gameService.resetGame(room.id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-4xl font-bold text-white mb-2">Results</h1>
          <p className="text-gray-300 text-lg">
            Impostor Cycle {room.impostorCycle || 1} of {room.totalImpostorCycles || 2}
          </p>
        </div>

        {/* Main Result */}
        <div className="mb-8">
          <div
            className={`rounded-lg p-8 text-center ${
              isImpostorEliminated
                ? 'bg-gradient-to-r from-green-900 to-green-700'
                : 'bg-gradient-to-r from-red-900 to-red-700'
            }`}
          >
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-100 mb-2">
              {isImpostorEliminated ? '🎉 TEAM WINS! 🎉' : '😈 IMPOSTOR WINS! 😈'}
            </p>
            <p className="text-3xl font-bold text-white">
              {isImpostorEliminated
                ? 'The impostor was eliminated!'
                : 'The impostor deceived everyone!'}
            </p>
          </div>
        </div>

        {/* Game Info */}
        <div className="grid md:grid-cols-1 gap-6 mb-8">

          {/* Impostor Info */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">The Impostor</h2>
            <div className="bg-red-900 border-2 border-red-600 rounded-lg p-4">
              <p className="text-red-200 text-sm mb-2">Impostor Name:</p>
              <p className="text-3xl font-bold text-red-100 mb-4">
                {room.players.find((p) => p.id === room.impostorId)?.name}
              </p>
              <div className="border-t border-red-700 pt-3 mt-3">
                <p className="text-red-200 text-sm mb-1">Their Word Was:</p>
                <p className="text-3xl font-bold text-red-300">🕵️ ??? (Hidden!)</p>
                <p className="text-red-300 text-xs mt-1">They had to guess: {room.mainWord}</p>
              </div>
              <div className="border-t border-red-700 pt-3 mt-3">
                <p className="text-red-200 text-sm mb-1">They Described it as:</p>
                <p className="text-xl font-bold text-red-300">
                  "{room.players.find((p) => p.id === room.impostorId)?.description}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Voting Results */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Vote Results</h2>
          <div className="space-y-3">
            {room.players.map((player) => {
              const playerVotes = voteCount[player.id] || 0
              const votePercentage =
                room.players.length > 0
                  ? Math.round((playerVotes / room.players.length) * 100)
                  : 0

              return (
                <div key={player.id} className="rounded overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                    <span className="font-semibold">{player.name}</span>
                    <span className="text-sm text-gray-400">
                      {playerVotes} vote{playerVotes !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="h-1 bg-gray-600 rounded">
                    <div
                      className={`h-full transition-all ${
                        player.id === eliminatedPlayerId
                          ? 'bg-red-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${votePercentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Eliminated Player */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Eliminated This Round</h2>
          <div
            className={`p-6 rounded-lg border-2 ${
              isImpostorEliminated
                ? 'bg-green-900 border-green-600'
                : 'bg-red-900 border-red-600'
            }`}
          >
            <p className="text-2xl font-bold text-white mb-3">
              {eliminatedPlayer?.name}
            </p>
            <div className="space-y-2">
              <div>
                <p className={`text-sm ${isImpostorEliminated ? 'text-green-200' : 'text-red-200'}`}>
                  Received Votes:
                </p>
                <p className="text-lg font-bold text-white">{maxVotes}</p>
              </div>
              <div>
                <p className={`text-sm ${isImpostorEliminated ? 'text-green-200' : 'text-red-200'}`}>
                  Their Word Was:
                </p>
                <p className="text-lg font-bold text-white">{eliminatedPlayer?.word}</p>
              </div>
              <div>
                <p className={`text-sm ${isImpostorEliminated ? 'text-green-200' : 'text-red-200'}`}>
                  They Described it as:
                </p>
                <p className="text-lg font-bold text-white">"{eliminatedPlayer?.description}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* All Player Answers */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">All Players & Their Descriptions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {room.players.map((player) => (
              <div
                key={player.id}
                className={`p-4 rounded-lg border-l-4 ${
                  player.id === room.impostorId
                    ? 'bg-red-900 border-red-600'
                    : 'bg-blue-900 border-blue-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-white">
                    {player.name}
                  </p>
                  {player.id === room.impostorId && (
                    <span className="text-xs bg-red-700 text-red-100 px-2 py-1 rounded">
                      IMPOSTOR
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Word: <span className="font-bold text-white">
                    {player.id === room.impostorId ? '🕵️ ??? (Hidden!)' : player.word}
                  </span>
                </p>
                <p className="text-gray-300 text-sm">
                  Described as: <span className="font-bold text-white">"{player.description}"</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          {hasMoreCycles ? (
            <button
              onClick={handlePlayAgain}
              disabled={loading}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-colors"
            >
              {loading ? 'Loading...' : 'Play Next Impostor'}
            </button>
          ) : (
            <button
              onClick={handlePlayAgain}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-colors"
            >
              {loading ? 'Loading...' : 'Play Again'}
            </button>
          )}
          <button
            onClick={handleLeaveRoom}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
          >
            Leave Room
          </button>
        </div>

        {hasMoreCycles && (
          <div className="bg-blue-900 border border-blue-600 rounded-lg p-4 mb-8 text-center">
            <p className="text-blue-100 text-lg font-semibold">
              ✨ Great round! New impostor coming up...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
