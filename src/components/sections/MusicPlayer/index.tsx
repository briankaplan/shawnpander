'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import { VinylBackground } from '@/components/ui/VinylBackground'

export function MusicPlayer() {
  const {
    currentAlbum,
    currentTrack,
    isPlaying,
    togglePlayback,
    setCurrentTrack
  } = useMusicPlatform()

  const progressRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isPlaying || !currentTrack) return

    const duration = currentTrack.duration
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext()
          return 0
        }
        return prev + (100 / duration)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, currentTrack])

  const handlePrevious = useCallback(() => {
    if (!currentAlbum || !currentTrack) return

    const currentIndex = currentAlbum.tracks.findIndex(t => t.id === currentTrack.id)
    const previousTrack = currentAlbum.tracks[currentIndex - 1]
    if (previousTrack) {
      setCurrentTrack(previousTrack)
      setProgress(0)
    }
  }, [currentAlbum, currentTrack, setCurrentTrack])

  const handleNext = useCallback(() => {
    if (!currentAlbum || !currentTrack) return

    const currentIndex = currentAlbum.tracks.findIndex(t => t.id === currentTrack.id)
    const nextTrack = currentAlbum.tracks[currentIndex + 1]
    if (nextTrack) {
      setCurrentTrack(nextTrack)
      setProgress(0)
    }
  }, [currentAlbum, currentTrack, setCurrentTrack])

  if (!currentAlbum || !currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <VinylBackground
              imageUrl={currentAlbum.artwork}
              isPlaying={isPlaying}
            />
          </div>

          <div className="flex-1">
            <h3 className="font-medium text-white">{currentTrack.title}</h3>
            <p className="text-sm text-white/60">{currentAlbum.title}</p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrevious}
              disabled={currentAlbum.tracks[0].id === currentTrack.id}
              className="text-white/60 hover:text-white disabled:opacity-50"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlayback}
              className="p-2 rounded-full bg-white text-black hover:bg-white/90"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button 
              onClick={handleNext}
              disabled={currentAlbum.tracks[currentAlbum.tracks.length - 1].id === currentTrack.id}
              className="text-white/60 hover:text-white disabled:opacity-50"
            >
              <SkipForward size={20} />
            </button>
          </div>
        </div>

        <div
          ref={progressRef}
          className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer"
          onClick={e => {
            if (!progressRef.current) return
            const rect = progressRef.current.getBoundingClientRect()
            const percent = ((e.clientX - rect.left) / rect.width) * 100
            setProgress(Math.min(100, Math.max(0, percent)))
          }}
        >
          <motion.div
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
} 