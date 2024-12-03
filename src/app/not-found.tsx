'use client'

import { Home, Search, Music } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div
          className={cn(
            "bg-zinc-900/80 backdrop-blur-sm",
            "rounded-xl p-8",
            "border border-zinc-800",
            "text-center",
            "opacity-0 translate-y-4 animate-fade-in"
          )}
        >
          {/* 404 Icon */}
          <div
            className={cn(
              "relative w-24 h-24 mx-auto mb-6",
              "scale-0 animate-scale-in",
              "animation-delay-100"
            )}
          >
            {/* Vinyl Record */}
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
                <span className="text-white font-bold text-xl">404</span>
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

          {/* Message */}
          <div
            className={cn(
              "opacity-0 animate-fade-in",
              "animation-delay-200"
            )}
          >
            <h1 className="text-2xl font-bold text-white mb-2">
              Page Not Found
            </h1>
            <p className="text-white/60 mb-8">
              Looks like this track skipped a beat. The page you're looking for doesn't exist.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className={cn(
                "px-6 py-3 rounded-full",
                "bg-orange-500 hover:bg-orange-600",
                "text-white font-medium",
                "flex items-center justify-center gap-2",
                "transition-all duration-200",
                "hover:scale-105 active:scale-95"
              )}
            >
              <Home size={18} />
              Back Home
            </a>

            <a
              href="/#music"
              className={cn(
                "px-6 py-3 rounded-full",
                "bg-zinc-800 hover:bg-zinc-700",
                "text-white font-medium",
                "flex items-center justify-center gap-2",
                "transition-all duration-200",
                "hover:scale-105 active:scale-95"
              )}
            >
              <Music size={18} />
              Listen to Music
            </a>
          </div>

          {/* Search Suggestion */}
          <div
            className={cn(
              "mt-8 flex items-center justify-center gap-2 text-white/40",
              "opacity-0 animate-fade-in",
              "animation-delay-400"
            )}
          >
            <Search size={14} />
            <span className="text-sm">Try searching for something else</span>
          </div>
        </div>
      </div>
    </div>
  )
}