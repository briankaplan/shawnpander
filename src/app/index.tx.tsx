'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Landing() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Sunset */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600 via-red-800 to-black opacity-70" />
      </div>

      {/* Animated Birds */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-5 h-3",
              "animate-bird-fly"
            )}
            style={{
              background: 'black',
              clipPath: 'polygon(0 50%, 50% 0, 100% 50%)',
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${15 + i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Perspective Road */}
      <div className="absolute bottom-0 w-full h-[60vh]">
        <div 
          className="w-full h-full"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent 0%, transparent 47%, rgba(255,255,255,0.2) 50%, transparent 53%, transparent 100%)',
            transform: 'rotateX(60deg)',
            transformOrigin: 'bottom',
            perspective: '1000px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 
          className={cn(
            "text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6",
            "opacity-0 translate-y-8",
            "animate-fade-in"
          )}
        >
          Forever & For Now
        </h1>
        
        <h2 
          className={cn(
            "text-2xl md:text-3xl lg:text-4xl text-orange-400",
            "opacity-0 translate-y-4",
            "animate-fade-in",
            "animate-delay-500"
          )}
        >
          Shawn Pander
        </h2>
      </div>
    </section>
  )
}