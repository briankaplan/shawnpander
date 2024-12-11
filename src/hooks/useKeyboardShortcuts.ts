'use client'

import { useEffect } from 'react'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'

export function useKeyboardShortcuts() {
  const { 
    isPlaying, 
    togglePlayPause, 
    currentTrack,
    platform,
    switchPlatform 
  } = useMusicPlatform()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault()
          togglePlayPause(currentTrack?.id)
          break
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            switchPlatform('spotify')
          }
          break
        case 'a':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            switchPlatform('apple')
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, togglePlayPause, currentTrack, switchPlatform])
}