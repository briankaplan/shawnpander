'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface StylizedLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
}

export function StylizedLogo({ className = '', size = 'md', animated = true }: StylizedLogoProps) {
  return (
    <div
      className={cn(
        "relative",
        sizes[size],
        animated && "opacity-0 animate-scale-up",
        className
      )}
    >
      <Image
        src="/images/albums/logo.webp"
        alt="Band Logo"
        fill
        priority
        className="object-contain"
        sizes={`(max-width: ${size === 'lg' ? '64px' : size === 'md' ? '48px' : '32px'}) 100vw, ${
          size === 'lg' ? '64px' : size === 'md' ? '48px' : '32px'
        }`}
      />
    </div>
  )
}