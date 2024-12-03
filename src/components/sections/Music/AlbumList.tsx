'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import { mockAlbums } from '@/services/streamingService'

export function AlbumList() {
  const { currentAlbum, setCurrentAlbum } = useMusicPlatform()
  const albums = process.env.NODE_ENV === 'development' ? mockAlbums : []

  if (!albums.length) {
    return (
      <div className="text-center text-white/60 py-8">
        Loading albums...
      </div>
    )
  }

  return (
    <div className="album-list h-[600px] overflow-y-auto pr-4 space-y-4">
      {albums.map((album, index) => (
        <motion.div
          key={album.id}
          className={`
            flex items-center p-4 rounded-lg cursor-pointer
            ${currentAlbum?.id === album.id ? 'bg-orange-500/20' : 'bg-black/20'}
            hover:bg-orange-500/10 transition-colors
          `}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => setCurrentAlbum(album)}
        >
          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
            <Image
              src={album.artwork}
              alt={album.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-bold text-white">{album.title}</h3>
            <p className="text-sm text-white/60">{album.releaseDate}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 