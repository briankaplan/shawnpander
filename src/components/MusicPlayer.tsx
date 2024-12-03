'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata'
import Image from 'next/image'

interface MusicPlayerProps {
  selectedAlbumId: string
  selectedTrackId?: string
  onPlay?: () => void
  onPause?: () => void
  onNext?: () => void
  onPrev?: () => void
}

export function MusicPlayer({ 
  selectedAlbumId, 
  selectedTrackId,
  onPlay,
  onPause,
  onNext,
  onPrev
}: MusicPlayerProps) {
  const { metadata } = useAlbumMetadata(selectedAlbumId)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const selectedTrack = metadata?.tracks.find(t => t.id === selectedTrackId)

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.()
    } else {
      onPlay?.()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.div 
      className="bg-black/80 backdrop-blur-lg border-t border-white/10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-8">
          {/* Now Playing */}
          <div className="flex items-center gap-4">
            {metadata?.artwork && (
              <div className="relative w-12 h-12 rounded-md overflow-hidden">
                <Image
                  src={metadata.artwork}
                  alt={metadata.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-white font-medium">{selectedTrack?.name || 'Select a track'}</p>
              <p className="text-white/60 text-sm">{metadata?.name}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button 
              className="text-white/60 hover:text-white"
              onClick={onPrev}
            >
              <SkipBack size={20} />
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button 
              className="text-white/60 hover:text-white"
              onClick={onNext}
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="h-1 bg-white/10 rounded-full">
              <motion.div 
                className="h-full bg-orange-500 rounded-full"
                style={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <Volume2 size={20} className="text-white/60" />
            <div className="w-24 h-1 bg-white/10 rounded-full">
              <div className="w-1/2 h-full bg-white/60 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 