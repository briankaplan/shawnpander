'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CircularRecordProps {
  artwork: string
  isPlaying: boolean
  className?: string
}

export function CircularRecord({ artwork, isPlaying, className }: CircularRecordProps) {
  return (
    <div className={cn('relative aspect-square', className)}>
      {/* Vinyl Background */}
      <div className="absolute inset-0 rounded-full bg-black/90" />
      
      {/* Album Artwork */}
      <motion.div
        className="absolute inset-[15%] rounded-full overflow-hidden"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: isPlaying ? Infinity : 0
        }}
      >
        <img
          src={artwork}
          alt="Album artwork"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Center Hole */}
      <div className="absolute inset-[48%] rounded-full bg-black/90" />
    </div>
  )
}