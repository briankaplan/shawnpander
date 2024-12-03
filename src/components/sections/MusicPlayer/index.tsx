'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePlayback } from '@/hooks/usePlayback'
import { useMusicAuth } from '@/hooks/useMusicAuth'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import { Volume2, VolumeX, ExternalLink, Mic } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MusicPlayerProps {
  selectedAlbumId: string
}

export function MusicPlayer({ selectedAlbumId }: MusicPlayerProps) {
  const { platform, showPlatformSelect } = useMusicPlatform()
  const { isAuthenticated, connect } = useMusicAuth()
  const { 
    isPlaying,
    track,
    position,
    error,
    play,
    pause,
    seek 
  } = usePlayback()

  const progressRef = useRef<HTMLDivElement>(null)

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !track) return

    const rect = progressRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newPosition = Math.floor(track.duration * percentage)
    seek(newPosition)
  }

  const handlePlayPause = async () => {
    if (!isAuthenticated) {
      if (!platform) {
        showPlatformSelect()
        return
      }
      await connect()
      return
    }

    if (isPlaying) {
      await pause()
    } else if (track) {
      await play(track.id)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-zinc-800">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-500/10 border-t border-red-500/20 px-4 py-2 text-center"
          >
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Track Info */}
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
              {track ? (
                <Image
                  src={track.albumArt}
                  alt={track.name}
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 rounded-lg" />
              )}
            </div>
            <div>
              <h3 className="text-white font-medium">
                {track?.name || 'Not Playing'}
              </h3>
              <p className="text-zinc-400 text-sm">
                {track?.artist || 'Select a track'}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex-1 max-w-2xl px-8">
            <div className="flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                  isAuthenticated ? "bg-orange-500 hover:bg-orange-600" : "bg-zinc-700 hover:bg-zinc-600"
                )}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Progress Bar */}
            <div
              ref={progressRef}
              className="relative w-full h-1 rounded-full bg-zinc-800 cursor-pointer mt-4"
              onClick={handleProgressClick}
            >
              {track && (
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full bg-orange-500"
                  style={{ width: `${(position / track.duration) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </div>

            {/* Time */}
            {track && (
              <div className="flex justify-between mt-1 text-xs text-zinc-400">
                <span>{formatTime(position)}</span>
                <span>{formatTime(track.duration)}</span>
              </div>
            )}
          </div>

          {/* Platform Info */}
          <div className="flex items-center space-x-4">
            {platform ? (
              <Image
                src={`/images/platforms/${platform}.svg`}
                alt={platform}
                width={24}
                height={24}
                className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={showPlatformSelect}
              />
            ) : (
              <button
                onClick={showPlatformSelect}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Choose Platform
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}