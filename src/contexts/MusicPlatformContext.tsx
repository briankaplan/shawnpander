'use client'

import { createContext, useContext, useState } from 'react'
import { Album, mockAlbums } from '@/services/streamingService'

interface MusicPlatformContextType {
  currentAlbum: Album | null
  setCurrentAlbum: (album: Album | null) => void
  albums: Album[]
}

const MusicPlatformContext = createContext<MusicPlatformContextType | null>(null)

export function MusicPlatformProvider({ children }: { children: React.ReactNode }) {
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(mockAlbums[0] || null)

  return (
    <MusicPlatformContext.Provider value={{
      currentAlbum,
      setCurrentAlbum,
      albums: mockAlbums
    }}>
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