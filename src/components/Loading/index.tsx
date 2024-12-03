'use client'

import { Music } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Loading() {
  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
      role="alert"
      aria-label="Loading content"
    >
      <div className="text-center">
        {/* Vinyl Animation */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Spinning Record */}
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-gradient-to-br from-zinc-900 to-black",
              "border-4 border-zinc-800",
              "flex items-center justify-center",
              "animate-spin-vinyl"
            )}
          >
            {/* Record Label */}
            <div className={cn(
              "absolute inset-[30%] rounded-full",
              "bg-gradient-to-br from-orange-500 to-orange-700",
              "flex items-center justify-center"
            )}>
              <Music className="w-6 h-6 text-white" />
            </div>

            {/* Record Grooves */}
            <div 
              className="absolute inset-[10%] rounded-full"
              style={{
                background: 'repeating-radial-gradient(circle at center, #222 0px, #111 1px, #222 2px, #111 3px)'
              }}
            />
          </div>

          {/* Reflection */}
          <div className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-b from-white/5 to-transparent",
            "transform -rotate-45"
          )} />
        </div>

        {/* Loading Text */}
        <div className="opacity-0 animate-fade-in">
          <h2 className="text-xl font-bold text-white mb-2">Loading</h2>
          <p className="text-white/60">Preparing your experience</p>
        </div>

        {/* Progress Bar */}
        <div
          className="w-48 h-1 bg-zinc-800 rounded-full mt-6 mx-auto overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
        >
          <div
            className={cn(
              "h-full bg-orange-500",
              "animate-loading"
            )}
          />
        </div>
      </div>
    </div>
  )
}