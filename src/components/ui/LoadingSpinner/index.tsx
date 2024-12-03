'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export function LoadingSpinner({
  className,
  size = 'md',
  text = 'Loading...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={cn(
          'border-t-2 border-orange-500 rounded-full animate-spin',
          sizeClasses[size],
          className
        )}
      />
      {text && (
        <p className="text-white/60 animate-pulse text-sm">{text}</p>
      )}
    </div>
  )
}

export function LoadingScreen({
  text = 'Loading...',
  className
}: {
  text?: string
  className?: string
}) {
  return (
    <div className={cn(
      'min-h-screen bg-black flex items-center justify-center',
      className
    )}>
      <LoadingSpinner size="lg" text={text} />
    </div>
  )
}