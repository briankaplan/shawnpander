'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface VinylBackgroundProps {
  imageUrl: string
  isPlaying?: boolean
  className?: string
}

export function VinylBackground({ imageUrl, isPlaying = false, className = '' }: VinylBackgroundProps) {
  return (
    <div className={`relative aspect-square ${className}`}>
      {/* Record */}
      <motion.div
        className="absolute inset-0 rounded-full bg-black/90 backdrop-blur-sm"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          duration: 2,
          repeat: isPlaying ? Infinity : 0,
          ease: 'linear'
        }}
      >
        {/* Grooves */}
        <div className="absolute inset-[20%] rounded-full border border-white/5" />
        <div className="absolute inset-[30%] rounded-full border border-white/5" />
        <div className="absolute inset-[40%] rounded-full border border-white/5" />
        <div className="absolute inset-[50%] rounded-full border border-white/5" />
        
        {/* Label */}
        <div className="absolute inset-[15%] rounded-full overflow-hidden">
          <Image
            src={imageUrl}
            alt="Album artwork"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </motion.div>

      {/* Shine */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
    </div>
  )
}