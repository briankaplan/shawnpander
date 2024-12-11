'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import type { Platform } from '@/types/music'
import { Loader2 } from 'lucide-react'
import { StreamingLink } from '@/components/ui/StreamingLink'

export function PlatformSelector() {
  const { platform, currentAlbum, isAuthenticated, loading } = useMusicPlatform()

  if (!currentAlbum) return null

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-white">Listen On</h3>
      <div className="flex flex-wrap gap-4">
        {Object.entries(currentAlbum.streamingLinks).map(([key, url]) => (
          <StreamingLink
            key={key}
            platform={key as Platform}
            url={url}
            className={platform === key ? 'ring-2 ring-orange-500 rounded-full px-4 py-2' : 'px-4 py-2'}
          />
        ))}
      </div>
      {loading && (
        <div className="flex items-center gap-2 text-white/60">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Connecting...</span>
        </div>
      )}
    </div>
  )
} 