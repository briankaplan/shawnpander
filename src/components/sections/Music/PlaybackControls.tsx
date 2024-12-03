'use client'

import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlaybackControlsProps {
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onNext: () => void
  onPrev: () => void
  progress: number
  duration: string
  currentTime: string
  className?: string
}

export function PlaybackControls({
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  progress,
  duration,
  currentTime,
  className
}: PlaybackControlsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Progress Bar */}
      <div className="relative h-1 bg-black/20 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-sm text-white/60">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onPrev}
          className="p-2 text-white/60 hover:text-white transition-colors"
        >
          <SkipBack size={24} />
        </button>

        <button
          onClick={isPlaying ? onPause : onPlay}
          className="p-4 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>

        <button
          onClick={onNext}
          className="p-2 text-white/60 hover:text-white transition-colors"
        >
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  )
} 