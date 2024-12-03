'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ExternalLink } from 'lucide-react'
import { STREAMING_PLATFORMS } from '@/types/platform'

interface PlatformSelectProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (platformId: string) => void
  currentTrackUrl?: string
}

export function PlatformSelect({ isOpen, onClose, onSelect, currentTrackUrl }: PlatformSelectProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const handleSelect = (platform: typeof STREAMING_PLATFORMS[0]) => {
    setSelectedPlatform(platform.id)
    if (platform.canPlayInline) {
      onSelect(platform.id)
    } else {
      // Redirect to external platform
      if (currentTrackUrl) {
        window.open(currentTrackUrl, '_blank')
      } else {
        window.open(platform.externalUrl + process.env.NEXT_PUBLIC_ARTIST_ID, '_blank')
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-md bg-zinc-900 rounded-xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Platform</h2>
              <p className="text-zinc-400 mb-6">
                Note: Only Spotify supports direct playback on the site. Other platforms will open in a new tab.
              </p>

              <div className="space-y-4">
                {STREAMING_PLATFORMS.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handleSelect(platform)}
                    className="w-full flex items-center justify-between p-4 rounded-lg transition-all"
                    style={{ backgroundColor: platform.color + '20' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-8 h-8">
                        <Image
                          src={platform.logo}
                          alt={platform.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-white font-medium">{platform.name}</span>
                    </div>
                    {!platform.canPlayInline && (
                      <ExternalLink className="text-white/60" size={18} />
                    )}
                  </button>
                ))}
              </div>

              <p className="mt-6 text-sm text-zinc-400 text-center">
                Your preference will be saved for future visits
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 