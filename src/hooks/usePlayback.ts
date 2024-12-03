'use client'

import { useState, useEffect, useCallback } from 'react'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import { playbackManager } from '@/services/playback'
import type { Album, Track } from '@/types/music'

interface PlaybackState {
  track: Track | null
  isPlaying: boolean
  position: number
  duration: number
  volume: number
  isMuted: boolean
  album: Album | null
}

export function usePlayback() {
  const { platform } = useMusicPlatform()
  const [state, setState] = useState<PlaybackState>({
    track: null,
    isPlaying: false,
    position: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    album: null
  })
  const [error, setError] = useState<string | null>(null)

  // Update playback state periodically
  useEffect(() => {
    let interval: NodeJS.Timeout

    const updateState = async () => {
      try {
        const currentState = await playbackManager.getCurrentState()
        if (currentState) {
          setState(prev => ({
            ...prev,
            ...currentState
          }))
        }
      } catch (error) {
        console.error('Failed to update playback state:', error)
      }
    }

    if (platform) {
      interval = setInterval(updateState, 1000)
      updateState()
    }

    return () => clearInterval(interval)
  }, [platform])

  const initialize = useCallback(async (token: string) => {
    if (!platform) return
    
    try {
      await playbackManager.initialize(platform, token)
      setError(null)
    } catch (error) {
      console.error('Failed to initialize playback:', error)
      setError('Failed to initialize music player')
    }
  }, [platform])

  const play = useCallback(async (trackId: string) => {
    try {
      await playbackManager.play(trackId)
      setState(prev => ({ ...prev, isPlaying: true }))
      setError(null)
    } catch (error) {
      console.error('Failed to play track:', error)
      setError('Failed to play track')
    }
  }, [])

  const pause = useCallback(async () => {
    try {
      await playbackManager.pause()
      setState(prev => ({ ...prev, isPlaying: false }))
      setError(null)
    } catch (error) {
      console.error('Failed to pause playback:', error)
      setError('Failed to pause playback')
    }
  }, [])

  const seek = useCallback(async (position: number) => {
    try {
      await playbackManager.seek(position)
      setState(prev => ({ ...prev, position }))
      setError(null)
    } catch (error) {
      console.error('Failed to seek:', error)
      setError('Failed to seek')
    }
  }, [])

  const setVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, volume, isMuted: volume === 0 }))
  }, [])

  const toggleMute = useCallback(() => {
    setState(prev => ({
      ...prev,
      volume: prev.isMuted ? 1 : 0,
      isMuted: !prev.isMuted
    }))
  }, [])

  return {
    ...state,
    error,
    initialize,
    play,
    pause,
    seek,
    setVolume,
    toggleMute
  }
} 