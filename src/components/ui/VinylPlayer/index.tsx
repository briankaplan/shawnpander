'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { THEME_COLORS } from '@/config/theme'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import { Album, Track } from '@/types/music'
import { cn } from '@/lib/utils'
import { Play, Pause } from 'lucide-react'

interface VinylPlayerProps {
  album: Album
  onSideFlip?: () => void
}

export function VinylPlayer({ album, onSideFlip }: VinylPlayerProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentSide, setCurrentSide] = useState<'A' | 'B'>('A')
  const [isSpinning, setIsSpinning] = useState(false)
  const controls = useAnimation()
  
  const { 
    isPlaying, 
    currentTrack, 
    play, 
    pause, 
    seek,
    isAuthenticated,
    login 
  } = useMusicPlatform()

  // Handle vinyl rotation
  useEffect(() => {
    if (isPlaying) {
      controls.start({
        rotate: 360,
        transition: {
          duration: 2,
          ease: "linear",
          repeat: Infinity
        }
      })
      setIsSpinning(true)
    } else {
      controls.stop()
      setIsSpinning(false)
    }
  }, [isPlaying, controls])

  const handleFlip = async () => {
    await controls.start({ rotateY: isFlipped ? 0 : 180 })
    setIsFlipped(!isFlipped)
    setCurrentSide(currentSide === 'A' ? 'B' : 'A')
    if (onSideFlip) onSideFlip()
  }

  const currentTracks = currentSide === 'A' ? album.sideA : album.sideB

  function getPlayerTheme(platform: Platform) {
    switch (platform) {
      case 'spotify':
        return {
          primary: '#1DB954',
          secondary: '#1ed760',
          accent: '#191414'
        }
      case 'apple':
        return {
          primary: '#fc3c44',
          secondary: '#fa2d55',
          accent: '#000000'
        }
      default:
        return {
          primary: '#EA580C',
          secondary: '#F97316',
          accent: '#27272A'
        }
    }
  }

  const theme = getPlayerTheme(platform)

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Vinyl Container */}
      <motion.div 
        className="relative aspect-square"
        animate={controls}
      >
        {/* Vinyl Record */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: 1000 }}
        >
          <div className="relative w-full h-full">
            {/* Record Surface */}
            <div 
              className={cn(
                "absolute inset-0 rounded-full bg-black",
                isSpinning && "animate-spin-vinyl"
              )}
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-[15%] rounded-full border-2 border-white/5" />
              <div className="absolute inset-[25%] rounded-full border-2 border-white/5" />
              <div className="absolute inset-[35%] rounded-full border-2 border-white/5" />
              
              {/* Label */}
              <div className="absolute inset-[40%] rounded-full"
                style={{
                  background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})`
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs">Side {currentSide}</span>
                </div>
              </div>
            </div>

            {/* Album Artwork Overlay */}
            {album.artwork && (
              <div 
                className="absolute inset-0 rounded-full bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url(${album.artwork})` }}
              />
            )}
          </div>
        </motion.div>

        {/* Tonearm */}
        <motion.div
          className="absolute -right-12 -top-12 w-48 h-48 origin-bottom-right"
          animate={{ rotate: isPlaying ? 25 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 right-0 w-2 h-48 bg-zinc-800 rounded-full transform -rotate-45" />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-zinc-700" />
          </div>
        </motion.div>
      </motion.div>

      {/* Controls */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {!isAuthenticated ? (
          <button
            onClick={login}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
          >
            Connect to Listen
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={() => isPlaying ? pause() : play(currentTracks[0].id)}
              className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={handleFlip}
              className="p-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full"
            >
              Flip Record
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 