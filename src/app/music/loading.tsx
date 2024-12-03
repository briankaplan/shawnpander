'use client'

import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { cn } from '@/lib/utils'

export default function MusicLoading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* Loading Animation */}
      <div className="relative opacity-0 scale-95 animate-fade-in">
        {/* Vinyl Record Animation */}
        <div className="w-32 h-32 rounded-full bg-zinc-900 relative overflow-hidden">
          <div className="absolute inset-0 animate-spin-slow">
            {/* Record Grooves */}
            <div 
              className="absolute inset-[10%] rounded-full"
              style={{
                background: 'repeating-radial-gradient(circle at center, #333 0px, #222 1px, #333 2px)'
              }}
            />
            
            {/* Center Label */}
            <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-orange-500 to-red-700" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-8 text-center opacity-0 translate-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <LoadingSpinner size="lg" className="text-orange-500" />
          <p className={cn(
            "mt-4 text-white/60",
            "animate-pulse duration-1000"
          )}>
            Loading music player...
          </p>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black z-0" />

      {/* Background noise texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(320%) brightness(100%)'
        }}
      />
    </div>
  )
}