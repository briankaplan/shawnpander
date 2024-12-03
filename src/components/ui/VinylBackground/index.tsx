'use client'

import { cn } from '@/lib/utils'

interface VinylBackgroundProps {
  color?: 'orange' | 'teal'
  animate?: boolean
  className?: string
}

export function VinylBackground({ color = 'orange', animate = false, className = 'w-full h-full' }: VinylBackgroundProps) {
  const gradientColors = {
    orange: 'from-orange-500 to-red-700',
    teal: 'from-teal-500 to-teal-700'
  }

  return (
    <div 
      className={cn(
        "relative rounded-full bg-black",
        animate ? "animate-spin-vinyl" : "",
        className
      )}
    >
      {/* Vinyl Grooves */}
      <div 
        className="absolute inset-[10%] rounded-full"
        style={{
          background: 'repeating-radial-gradient(circle at center, #333 0px, #222 1px, #333 2px)'
        }}
      />
      
      {/* Center Label */}
      <div className={cn(
        "absolute inset-[30%] rounded-full bg-gradient-to-br",
        gradientColors[color],
        "flex items-center justify-center shadow-lg"
      )}>
        <div className="text-center">
          <h3 className="text-white font-bold">Forever & For Now</h3>
          <div className="w-4 h-4 rounded-full bg-white/20 mx-auto mt-2" />
        </div>
      </div>

      {/* Reflection Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent" />

      {/* Edge Highlight */}
      <div className="absolute inset-0 rounded-full border border-white/10" />
    </div>
  )
}

interface VinylBackgroundWithSilhouetteProps extends VinylBackgroundProps {
  silhouetteUrl?: string
}

export function VinylBackgroundWithSilhouette({ 
  color = 'orange', 
  animate = false, 
  className = 'w-full h-full',
  silhouetteUrl = '/vercel.svg'
}: VinylBackgroundWithSilhouetteProps) {
  const gradientColors = {
    orange: 'from-orange-500 to-red-700',
    teal: 'from-teal-500 to-teal-700'
  }

  return (
    <div 
      className={cn(
        "relative rounded-full bg-black",
        animate ? "animate-spin-vinyl" : "",
        className
      )}
    >
      {/* Vinyl Grooves */}
      <div 
        className="absolute inset-[10%] rounded-full"
        style={{
          background: 'repeating-radial-gradient(circle at center, #333 0px, #222 1px, #333 2px)'
        }}
      />
      
      {/* Center Label with Silhouette */}
      <div className={cn(
        "absolute inset-[30%] rounded-full bg-gradient-to-br",
        gradientColors[color],
        "flex items-center justify-center shadow-lg overflow-hidden"
      )}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Silhouette Image */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${silhouetteUrl})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="text-center z-10">
            <h3 className="text-white font-bold">Forever & For Now</h3>
            <div className="w-4 h-4 rounded-full bg-white/20 mx-auto mt-2" />
          </div>
        </div>
      </div>

      {/* Reflection Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent" />

      {/* Edge Highlight */}
      <div className="absolute inset-0 rounded-full border border-white/10" />
    </div>
  )
}