'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { gameService } from '@/lib/gameService'
import { useGame } from '@/lib/gameContext'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create')
  const [playerName, setPlayerName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [roomId, setRoomIdInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { setRoomId, setPlayerId, setPlayerName: setContextPlayerName } = useGame()

  const handleCreateRoom = async () => {
    if (!playerName.trim() || !roomName.trim()) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const newRoomId = await gameService.createGameRoom(playerName, roomName)
      const room = await gameService.getGameRoom(newRoomId)

      if (room) {
        setRoomId(newRoomId)
        setContextPlayerName(playerName)
        setPlayerId(room.players[0].id)
        router.push(`/game/${newRoomId}`)
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinRoom = async () => {
    if (!playerName.trim() || !roomId.trim()) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const playerId = await gameService.joinGameRoom(roomId, playerName)
      setRoomId(roomId)
      setContextPlayerName(playerName)
      setPlayerId(playerId)
      router.push(`/game/${roomId}`)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Word Impostor</h1>
          <p className="text-gray-300">Find the impostor among your teammates</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-2xl p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => {
                setActiveTab('create')
                setError('')
              }}
              className={`flex-1 py-2 px-4 rounded font-semibold transition-colors ${
                activeTab === 'create'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Create Room
            </button>
            <button
              onClick={() => {
                setActiveTab('join')
                setError('')
              }}
              className={`flex-1 py-2 px-4 rounded font-semibold transition-colors ${
                activeTab === 'join'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Join Room
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-100">
              {error}
            </div>
          )}

          {/* Create Room Tab */}
          {activeTab === 'create' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter room name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleCreateRoom}
                disabled={loading}
                className="w-full mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded transition-colors"
              >
                {loading ? 'Creating...' : 'Create Room'}
              </button>
            </div>
          )}

          {/* Join Room Tab */}
          {activeTab === 'join' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Room ID
                </label>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomIdInput(e.target.value)}
                  placeholder="Enter room ID"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleJoinRoom}
                disabled={loading}
                className="w-full mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded transition-colors"
              >
                {loading ? 'Joining...' : 'Join Room'}
              </button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-center text-sm text-gray-400">
              Max 12 players per room
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
