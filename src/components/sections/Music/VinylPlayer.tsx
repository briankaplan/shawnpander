'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import { Album, Track } from '@/services/streamingService'
import { StreamingLinks } from '@/components/StreamingLinks'
import { VinylAnimation } from './VinylAnimation'
import { PlaybackControls } from './PlaybackControls'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface VinylPlayerProps {
  album: Album
}

function splitTracksIntoSides(tracks: Track[]) {
  const midpoint = Math.ceil(tracks.length / 2)
  return {
    A: tracks.slice(0, midpoint).map((track, index) => ({
      ...track,
      side: 'A' as const,
      position: index + 1
    })),
    B: tracks.slice(midpoint).map((track, index) => ({
      ...track,
      side: 'B' as const,
      position: index + 1
    }))
  }
}

export function VinylPlayer({ album }: VinylPlayerProps) {
  const [currentSide, setCurrentSide] = useState<'A' | 'B'>('A')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const isMobile = useMediaQuery('(max-width: 640px)')

  // Calculate sides from tracks if not already present
  const sides = useMemo(() => {
    if (!album?.tracks?.length) return { A: [], B: [] }
    return album.sides || splitTracksIntoSides(album.tracks)
  }, [album])

  const tracks = sides[currentSide] || []

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext()
            return 0
          }
          return prev + 1
        })
        
        // Update current time
        const duration = parseDuration(currentTrack.duration)
        const current = Math.floor((duration * progress) / 100)
        setCurrentTime(formatTime(current))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTrack])

  const handleNext = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id)
    if (currentIndex < tracks.length - 1) {
      handleTrackSelect(tracks[currentIndex + 1])
    } else if (currentSide === 'A') {
      setCurrentSide('B')
      handleTrackSelect(sides.B[0])
    }
  }

  const handlePrev = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id)
    if (currentIndex > 0) {
      handleTrackSelect(tracks[currentIndex - 1])
    } else if (currentSide === 'B') {
      setCurrentSide('A')
      handleTrackSelect(sides.A[sides.A.length - 1])
    }
  }

  // Helper functions
  const parseDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number)
    return minutes * 60 + seconds
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="vinyl-player-container">
      {!album ? (
        <div className="text-center text-white/60 py-8">
          No album selected
        </div>
      ) : (
        <>
          {/* Album Info */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">{album.title}</h2>
              <p className="text-lg text-orange-400">{album.releaseDate}</p>
            </div>
            <StreamingLinks links={album.streamingLinks} />
          </div>

          {/* Vinyl Player */}
          <div className="relative aspect-square max-w-2xl mx-auto mb-8">
            <VinylAnimation
              coverUrl={album.artwork}
              isPlaying={isPlaying}
              onFlip={() => setCurrentSide(currentSide === 'A' ? 'B' : 'A')}
            />
          </div>

          {/* Side Selection */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setCurrentSide('A')}
              className={cn(
                "px-6 py-2 rounded-full transition-colors",
                currentSide === 'A' 
                  ? "bg-orange-500 text-white"
                  : "bg-black/30 text-white/60 hover:bg-black/50"
              )}
            >
              Side A
            </button>
            <button
              onClick={() => setCurrentSide('B')}
              className={cn(
                "px-6 py-2 rounded-full transition-colors",
                currentSide === 'B'
                  ? "bg-orange-500 text-white"
                  : "bg-black/30 text-white/60 hover:bg-black/50"
              )}
            >
              Side B
            </button>
          </div>

          {/* Track List */}
          <div className="space-y-2">
            {tracks.map((track) => (
              <motion.button
                key={track.id}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-lg",
                  "transition-colors duration-200",
                  currentTrack?.id === track.id
                    ? "bg-orange-500/20 text-white"
                    : "bg-black/20 text-white/60 hover:bg-black/30"
                )}
                onClick={() => handleTrackSelect(track)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm opacity-60">{track.position}</span>
                  <span className="font-medium">{track.title}</span>
                </div>
                <span className="text-sm opacity-60">{track.duration}</span>
              </motion.button>
            ))}
          </div>

          {/* Playback Controls */}
          {currentTrack && (
            <PlaybackControls
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onNext={handleNext}
              onPrev={handlePrev}
              progress={progress}
              duration={currentTrack.duration}
              currentTime={currentTime}
              className="mt-8"
            />
          )}

          {/* Album Details */}
          <motion.div
            className="mt-8 pt-8 border-t border-white/10"
            initial={false}
            animate={{ height: showDetails ? 'auto' : 0, opacity: showDetails ? 1 : 0 }}
          >
            <div className="prose prose-invert">
              <h3 className="text-xl font-bold text-white mb-4">About the Album</h3>
              <p className="text-white/80">{album.description}</p>
              {album.credits && (
                <>
                  <h4 className="text-lg font-bold text-white mt-6 mb-2">Credits</h4>
                  <p className="text-white/60">{album.credits}</p>
                </>
              )}
            </div>
          </motion.div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 text-orange-400 hover:text-orange-300 transition-colors"
          >
            {showDetails ? 'Show Less' : 'Show More'}
          </button>
        </>
      )}
    </div>
  )
} 