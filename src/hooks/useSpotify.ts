'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SpotifyState {
  isAuthenticated: boolean
  currentPlatform: 'spotify' | 'apple' | 'amazon' | null
  accessToken: string | null
  error: string | null
}

export function useSpotify() {
  const router = useRouter()
  const [state, setState] = useState<SpotifyState>({
    isAuthenticated: false,
    currentPlatform: null,
    accessToken: null,
    error: null
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/spotify/check-auth')
      const data = await response.json()
      setState(prev => ({
        ...prev,
        isAuthenticated: data.isAuthenticated,
        accessToken: data.accessToken
      }))
    } catch (error) {
      console.error('Auth check failed:', error)
    }
  }

  const connect = async () => {
    try {
      const response = await fetch('/api/spotify/auth-url')
      const { url } = await response.json()
      router.push(url)
    } catch (error) {
      console.error('Failed to get auth URL:', error)
    }
  }

  const playTrack = async (trackId: string) => {
    if (!state.isAuthenticated) return
    try {
      await fetch('/api/spotify/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trackId })
      })
    } catch (error) {
      console.error('Failed to play track:', error)
    }
  }

  const getCurrentTrack = async () => {
    if (!state.isAuthenticated) return null
    try {
      const response = await fetch('/api/spotify/current-track')
      return await response.json()
    } catch (error) {
      console.error('Failed to get current track:', error)
      return null
    }
  }

  const getLyrics = async (trackId: string) => {
    try {
      const response = await fetch(`/api/lyrics?trackId=${trackId}`)
      const data = await response.json()
      return data.lyrics
    } catch (error) {
      console.error('Failed to get lyrics:', error)
      return null
    }
  }

  return {
    ...state,
    connect,
    playTrack,
    getCurrentTrack,
    getLyrics
  }
} 