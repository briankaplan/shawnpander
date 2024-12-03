'use client'

import Image from 'next/image'
import { Music2, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Landing() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background with Parallax */}
      <div 
        className={cn(
          "absolute inset-0",
          "animate-parallax-slow"
        )}
        style={{
          backgroundImage: "url('/images/albums/header.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
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
              background: 'white',
              clipPath: 'polygon(0 50%, 50% 0, 100% 50%)',
              top: `${20 + i * 10}%`,
              filter: 'blur(1px)',
              animationDelay: `${i * 3}s`,
              animationDuration: `${15 + i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Animated Rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3].map((_, i) => (
          <div
            key={`ring-${i}`}
            className={cn(
              "absolute rounded-full border-2 border-orange-500/30",
              "animate-ring-rotate"
            )}
            style={{
              width: `${100 + i * 40}vh`,
              height: `${100 + i * 40}vh`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + i * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div
          className={cn(
            "mb-8",
            "opacity-0 scale-90",
            "animate-scale-up"
          )}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-orange-400 mb-4">
            Shawn Pander
          </h2>
          <div 
            className={cn(
              "relative w-64 h-64 md:w-72 md:h-72 mx-auto mb-6",
              "transition-transform duration-300 hover:scale-105"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg transform rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-orange-500 to-red-600 rounded-lg transform -rotate-3"></div>
            <div className="relative w-full h-full bg-black rounded-lg flex items-center justify-center p-4">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl text-white font-bold">
                  Forever & For Now
                </h1>
                <div className="text-orange-400 text-xl font-semibold">
                  Available December 22
                </div>
                <div className="text-white/80">
                  Release Show - December 22
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Streaming Links */}
        <div
          className={cn(
            "flex gap-6 justify-center mb-8",
            "opacity-0 translate-y-4",
            "animate-fade-in",
            "animate-delay-300"
          )}
        >
          <a
            href="#spotify"
            className="text-white hover:text-orange-400 transition-colors"
            aria-label="Listen on Spotify"
          >
            <Music2 size={32} />
          </a>
          <a
            href="#apple"
            className="text-white hover:text-orange-400 transition-colors"
            aria-label="Listen on Apple Music"
          >
            <Music2 size={32} />
          </a>
          <a
            href="#amazon"
            className="text-white hover:text-orange-400 transition-colors"
            aria-label="Listen on Amazon Music"
          >
            <ShoppingBag size={32} />
          </a>
        </div>

        <div
          className={cn(
            "flex flex-col md:flex-row gap-4 items-center justify-center",
            "opacity-0 translate-y-4",
            "animate-fade-in",
            "animate-delay-400"
          )}
        >
          <a
            href="#listen"
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors duration-300"
          >
            Listen Now
          </a>
          <a
            href="#tour"
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition-colors duration-300"
          >
            Tour Dates
          </a>
        </div>
      </div>
    </section>
  )
}