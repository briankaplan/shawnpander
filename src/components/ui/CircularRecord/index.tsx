'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface CircularRecordProps {
  isPlaying?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
}

export function CircularRecord({ isPlaying = false, size = 'md', className = '' }: CircularRecordProps) {
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden",
        sizes[size],
        isPlaying && "animate-spin-slow",
        className
      )}
    >
      <Image
        src="/images/albums/logo.webp"
        alt="Record"
        fill
        className="object-cover"
        sizes={`(max-width: ${size === 'lg' ? '64px' : size === 'md' ? '48px' : '32px'}) 100vw, ${
          size === 'lg' ? '64px' : size === 'md' ? '48px' : '32px'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40" />
      <div className="absolute inset-[25%] rounded-full bg-black/80" />
      <div className="absolute inset-[45%] rounded-full bg-orange-600" />
    </div>
  )
}