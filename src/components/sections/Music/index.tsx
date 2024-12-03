'use client'

import { motion } from 'framer-motion'
import { VinylPlayer } from './VinylPlayer'
import { AlbumList } from './AlbumList'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'

export function MusicSection() {
  const { currentAlbum } = useMusicPlatform()

  return (
    <section id="music" className="w-full min-h-screen bg-neutral-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Music</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="discography-container">
            <AlbumList />
          </div>
          
          <div className="vinyl-player-container">
            <VinylPlayer album={currentAlbum} />
          </div>
        </div>
      </div>
    </section>
  )
} 