'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Release } from '@/config/releases'
import { ReleaseCountdown } from '@/components/ReleaseCountdown'

interface Album {
  id: string
  title: string
  releaseDate: string
  artwork: string
  isReleased: boolean
  tracks: Track[]
}

interface Track {
  id: string
  title: string
  duration: number
  previewUrl?: string
}

interface VinylPlayerProps {
  albums: Album[]
  currentAlbum?: Album
  onAlbumChange?: (album: Album) => void
}

export function VinylPlayer({ albums, currentAlbum, onAlbumChange }: VinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [rotation, setRotation] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const animate = () => {
    setRotation(prev => (prev + 1) % 360)
    animationRef.current = requestAnimationFrame(animate)
  }

  const handlePlay = (track: Track) => {
    if (!track.previewUrl) return

    if (currentTrack?.id === track.id && isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl
        audioRef.current.play()
      } else {
        audioRef.current = new Audio(track.previewUrl)
        audioRef.current.play()
      }
      setCurrentTrack(track)
      setIsPlaying(true)
      animate()
    }
  }

  const handleAlbumSelect = (album: Album) => {
    if (!album.isReleased) return
    onAlbumChange?.(album)
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }

  return (
    <div className="relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Vinyl Display */}
        <div className="relative aspect-square">
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-[90%] h-[90%]">
              {/* Vinyl Record */}
              <motion.div
                className="relative rounded-full bg-black w-full h-full"
                style={{ rotate: isPlaying ? rotation : 0 }}
              >
                {/* Grooves */}
                <div 
                  className="absolute inset-[10%] rounded-full"
                  style={{
                    background: 'repeating-radial-gradient(circle at center, #333 0px, #222 1px, #333 2px)'
                  }}
                />
                {/* Label */}
                <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <h3 className="text-white font-bold">
                      {currentAlbum?.title || 'Select an Album'}
                    </h3>
                    <div className="w-4 h-4 rounded-full bg-white/20 mx-auto mt-2" />
                  </div>
                </div>
                {/* Reflections */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent" />
                <div className="absolute inset-0 rounded-full border border-white/10" />
              </motion.div>
              {/* Tonearm */}
              <motion.div
                className="absolute top-[10%] right-[10%] w-[40%] h-2 bg-gradient-to-r from-zinc-600 to-zinc-400 origin-right"
                animate={{ rotate: isPlaying ? -25 : -45 }}
                transition={{ duration: 0.5 }}
                data-testid="tonearm"
              >
                <div className="absolute left-0 -top-1 w-4 h-4 rounded-full bg-zinc-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Track List */}
        <div className="space-y-6">
          {!currentAlbum?.isReleased ? (
            <ReleaseCountdown />
          ) : (
            <>
              <div className="space-y-2">
                {currentAlbum?.tracks.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => handlePlay(track)}
                    className={cn(
                      'w-full flex items-center justify-between p-4 rounded-lg transition-colors',
                      currentTrack?.id === track.id && isPlaying
                        ? 'bg-orange-500 text-white'
                        : 'bg-zinc-800/50 hover:bg-zinc-700/50 text-white/70'
                    )}
                    disabled={!track.previewUrl}
                    data-testid={`track-button-${currentAlbum.id}-${index + 1}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="opacity-50">{index + 1}</span>
                      <span>{track.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="opacity-50">
                        {Math.floor(track.duration / 60)}:
                        {String(Math.floor(track.duration % 60)).padStart(2, '0')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="px-4">
                <div className="relative w-full h-2 rounded-full cursor-pointer h-1 bg-zinc-800">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-orange-500"
                    style={{
                      width: audioRef.current
                        ? `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%`
                        : '0%'
                    }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center px-4">
                <button
                  className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors"
                  onClick={() => currentTrack && handlePlay(currentTrack)}
                  data-testid="play-pause-button"
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
            </>
          )}
        </div>
      </div>
    </div>
  )
} 