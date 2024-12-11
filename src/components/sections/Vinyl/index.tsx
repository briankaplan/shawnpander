'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import { VinylBackground } from '@/components/ui/VinylBackground'
import { Skeleton } from '@/components/ui/Skeleton'

export function Vinyl() {
  const [mounted, setMounted] = useState(false)
  const { currentAlbum, isPlaying, albums } = useMusicPlatform()
  const [selectedAlbum, setSelectedAlbum] = useState(currentAlbum || albums[0])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (currentAlbum) {
      setSelectedAlbum(currentAlbum)
    }
  }, [currentAlbum])

  if (!mounted) return <Skeleton className="w-full aspect-square rounded-full" />

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedAlbum.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square"
        >
          <VinylBackground
            imageUrl={selectedAlbum.artwork}
            isPlaying={isPlaying}
            className="w-full"
          />
        </motion.div>
      </AnimatePresence>

      {/* Album Selection */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {albums.map(album => (
          <button
            key={album.id}
            onClick={() => setSelectedAlbum(album)}
            className={`w-3 h-3 rounded-full transition-colors ${
              selectedAlbum.id === album.id
                ? 'bg-white'
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}