'use client'

import { useState, useEffect } from 'react'
import { Keyboard, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Shortcut {
  key: string
  description: string
}

const shortcuts: Shortcut[] = [
  { key: 'Space', description: 'Play/Pause' },
  { key: 'Ctrl/⌘ + →', description: 'Next Track' },
  { key: 'Ctrl/⌘ + ←', description: 'Previous Track' },
  { key: 'Ctrl/⌘ + ↑', description: 'Volume Up' },
  { key: 'Ctrl/⌘ + ↓', description: 'Volume Down' },
  { key: 'Ctrl/⌘ + M', description: 'Mute/Unmute' },
  { key: 'Ctrl/⌘ + F', description: 'Flip Vinyl' },
  { key: '1-9', description: 'Navigate to Section' }
]

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    } else {
      const timer = setTimeout(() => setMounted(false), 300) // Match animation duration
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-40",
          "w-12 h-12 rounded-full",
          "bg-zinc-900/80 backdrop-blur-sm",
          "flex items-center justify-center",
          "border border-zinc-800",
          "text-white/70 hover:text-white",
          "transition-all duration-200",
          "hover:scale-105 active:scale-95",
          "shadow-lg"
        )}
        aria-label="Show Keyboard Shortcuts"
      >
        <Keyboard size={20} />
      </button>

      {/* Modal Overlay */}
      {mounted && (
        <div
          className={cn(
            "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
            "transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            onClick={e => e.stopPropagation()}
            className={cn(
              "relative w-full max-w-lg mx-auto mt-20",
              "bg-zinc-900/90 backdrop-blur-lg",
              "rounded-xl shadow-2xl",
              "border border-zinc-800",
              "p-6",
              "transition-all duration-300",
              isOpen 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-4 scale-95"
            )}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className={cn(
                "absolute top-4 right-4",
                "w-8 h-8 rounded-full",
                "flex items-center justify-center",
                "text-white/70 hover:text-white",
                "transition-all duration-200",
                "hover:scale-110 active:scale-90"
              )}
            >
              <X size={20} />
            </button>

            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
              <Keyboard size={24} className="text-orange-500" />
              <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
            </div>

            {/* Shortcuts Grid */}
            <div className="grid gap-4">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={shortcut.key}
                  className={cn(
                    "flex items-center justify-between",
                    "opacity-0 -translate-x-4 animate-fade-in",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <kbd className={cn(
                      "px-3 py-1.5 rounded-lg",
                      "bg-black/50",
                      "border border-zinc-800",
                      "text-sm font-mono text-white/90",
                      "shadow-inner"
                    )}>
                      {shortcut.key}
                    </kbd>
                    <span className="text-white/70">{shortcut.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div 
              className={cn(
                "mt-6 pt-4 border-t border-zinc-800",
                "opacity-0 translate-y-2 animate-fade-in",
                "animation-delay-500"
              )}
            >
              <p className="text-sm text-white/50 text-center">
                Press <kbd className="px-2 py-0.5 rounded bg-black/50 border border-zinc-800 text-xs">?</kbd> to toggle shortcuts
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}