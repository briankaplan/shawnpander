'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { StreamingLink } from '@/components/ui/StreamingLink'

interface Album {
  id: string
  title: string
  year: string
  coverUrl: string
  streamingLinks: {
    spotify?: string
    appleMusic?: string
    youtube?: string
    amazon?: string
  }
}

const albums: Album[] = [
  {
    id: 'forever-and-for-now',
    title: 'Forever & For Now',
    year: '2023',
    coverUrl: '/images/albums/forever-and-for-now.jpg',
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/xxx',
      appleMusic: 'https://music.apple.com/album/xxx',
      youtube: 'https://music.youtube.com/playlist/xxx',
      amazon: 'https://music.amazon.com/albums/xxx'
    }
  },
  // Add more albums here
]

export function Discography() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {albums.map((album, index) => (
        <motion.div
          key={album.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
            {/* Album Cover */}
            <div className="relative aspect-square">
              <Image
                src={album.coverUrl}
                alt={album.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Album Info */}
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">{album.title}</h3>
                <p className="text-white/60">{album.year}</p>
              </div>

              {/* Streaming Links */}
              <div className="space-y-2">
                {album.streamingLinks.spotify && (
                  <StreamingLink
                    platform="spotify"
                    href={album.streamingLinks.spotify}
                  />
                )}
                {album.streamingLinks.appleMusic && (
                  <StreamingLink
                    platform="apple"
                    href={album.streamingLinks.appleMusic}
                  />
                )}
                {album.streamingLinks.youtube && (
                  <StreamingLink
                    platform="youtube"
                    href={album.streamingLinks.youtube}
                  />
                )}
                {album.streamingLinks.amazon && (
                  <StreamingLink
                    platform="amazon"
                    href={album.streamingLinks.amazon}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 