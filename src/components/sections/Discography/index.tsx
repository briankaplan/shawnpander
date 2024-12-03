'use client'

import { motion } from 'framer-motion'
import { useSpotifyAlbums } from '@/hooks/useSpotifyAlbums'
import Image from 'next/image'
import type { SpotifyMetadata } from '@/types/spotify'

interface AlbumCardProps {
  album: SpotifyMetadata
  onClick: (albumId: string) => void
  isSelected: boolean
  index: number
}

function AlbumCard({ album, onClick, isSelected, index }: AlbumCardProps) {
  return (
    <motion.div
      className="relative aspect-square cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 10,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(album.id)}
    >
      <div className="relative w-full h-full">
        <Image
          src={album.artwork}
          alt={album.name}
          fill
          className="object-cover rounded-lg"
          priority={index < 4}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold truncate">{album.name}</h3>
          <p className="text-white/60 text-sm">{new Date(album.releaseDate).getFullYear()}</p>
        </div>

        {isSelected && (
          <motion.div 
            className="absolute inset-0 border-2 border-orange-500 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            layoutId="selectedAlbum"
          />
        )}
      </div>
    </motion.div>
  )
}

export function Discography({ onAlbumSelect, selectedAlbumId }: {
  onAlbumSelect: (albumId: string) => void
  selectedAlbumId?: string
}) {
  const { albums, loading } = useSpotifyAlbums()

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="aspect-square bg-zinc-900/50 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-white mb-8">Discography</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album, index) => (
          <AlbumCard
            key={album.id}
            album={album}
            onClick={onAlbumSelect}
            isSelected={album.id === selectedAlbumId}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}