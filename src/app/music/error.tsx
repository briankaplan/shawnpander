'use client'

import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export default function MusicError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className={cn(
        "max-w-md w-full bg-zinc-900/50 backdrop-blur-sm rounded-lg p-8",
        "border border-orange-500/10 shadow-xl",
        "opacity-0 scale-95 animate-fade-in"
      )}>
        <div className="flex items-center justify-center mb-6">
          <AlertCircle className="w-12 h-12 text-orange-500" />
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Something went wrong!
        </h1>

        <p className="text-orange-200/70 text-center mb-8">
          {error.message || "An error occurred while loading the music player."}
        </p>

        <div className="flex justify-center">
          <Button 
            onClick={reset}
            className={cn(
              "bg-orange-500 hover:bg-orange-600 text-white",
              "opacity-0 translate-y-2 animate-fade-in",
              "animation-delay-200"
            )}
          >
            Try again
          </Button>
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