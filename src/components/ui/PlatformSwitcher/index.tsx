'use client'

import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import type { Platform } from '@/types/music'

export function PlatformSwitcher() {
  const { platform, switchPlatform } = useMusicPlatform()

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => switchPlatform('spotify')}
        className={`p-2 rounded-full ${
          platform === 'spotify' ? 'bg-green-500' : 'bg-zinc-800'
        }`}
      >
        Spotify
      </button>
      <button
        onClick={() => switchPlatform('apple')}
        className={`p-2 rounded-full ${
          platform === 'apple' ? 'bg-pink-500' : 'bg-zinc-800'
        }`}
      >
        Apple Music
      </button>
    </div>
  )
} 