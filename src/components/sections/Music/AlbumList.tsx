'use client'

import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import { ALBUMS } from '@/constants/albums'
import Image from 'next/image'

export function AlbumList() {
  const { setCurrentAlbum, currentAlbum } = useMusicPlatform()

  return (
    <div className="space-y-4">
      {ALBUMS.map((album) => (
        <button
          key={album.id}
          onClick={() => setCurrentAlbum(album)}
          className={`w-full p-4 rounded-lg transition-all ${
            currentAlbum?.id === album.id
              ? 'bg-orange-500/20 border-orange-500'
              : 'bg-black/20 hover:bg-black/30 border-transparent'
          } border backdrop-blur-sm`}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={album.artwork}
                alt={album.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-medium text-white">{album.title}</h3>
              <p className="text-sm text-white/60">
                {album.tracks.length} tracks
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
} 