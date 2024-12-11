'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { Album, Track, Platform, MusicPlatformContextType } from '@/types/music'
import { ALBUMS } from '@/constants/albums'

const MusicPlatformContext = createContext<MusicPlatformContextType | null>(null)

export function MusicPlatformProvider({ children }: { children: React.ReactNode }) {
  const [platform, setPlatform] = useState<Platform | null>(null)
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)

  const switchPlatform = useCallback(async (newPlatform: Platform) => {
    setLoading(true)
    try {
      setPlatform(newPlatform)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Failed to switch platform:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async () => {
    setLoading(true)
    try {
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Failed to login:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const togglePlayback = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const value = {
    platform,
    currentAlbum,
    currentTrack,
    isPlaying,
    isAuthenticated,
    loading,
    albums: ALBUMS,
    setCurrentAlbum,
    setCurrentTrack,
    switchPlatform,
    login,
    togglePlayback
  }

  return (
    <MusicPlatformContext.Provider value={value}>
      {children}
    </MusicPlatformContext.Provider>
  )
}

export function useMusicPlatform() {
  const context = useContext(MusicPlatformContext)
  if (!context) {
    throw new Error('useMusicPlatform must be used within a MusicPlatformProvider')
  }
  return context
}