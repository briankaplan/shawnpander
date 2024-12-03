'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Photo {
  id: string
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  credit?: string
  date?: string
  category: 'live' | 'press' | 'behind-the-scenes'
  downloadUrl?: string
  location?: string
  tags?: string[]
}

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'live', label: 'Live Shows' },
  { id: 'press', label: 'Press Photos' },
  { id: 'behind-the-scenes', label: 'Behind the Scenes' }
]

const photos: Photo[] = [
  {
    id: '1',
    src: '/images/gallery/live-1.jpg',
    alt: 'Live at Continental Club',
    width: 1920,
    height: 1080,
    caption: 'Album Release Show',
    credit: 'Photographer Name',
    date: '2023-12-22',
    category: 'live',
    location: 'Continental Club, Austin TX',
    tags: ['live', 'album release', 'performance']
  },
  // Add more photos...
]

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredPhotos = photos.filter(
    photo => selectedCategory === 'all' || photo.category === selectedCategory
  )

  useEffect(() => {
    if (selectedPhoto) {
      const index = filteredPhotos.findIndex(p => p.id === selectedPhoto.id)
      setCurrentIndex(index)
    }
  }, [selectedPhoto, filteredPhotos])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedPhoto) return

    switch (e.key) {
      case 'ArrowLeft':
        if (currentIndex > 0) {
          setSelectedPhoto(filteredPhotos[currentIndex - 1])
        }
        break
      case 'ArrowRight':
        if (currentIndex < filteredPhotos.length - 1) {
          setSelectedPhoto(filteredPhotos[currentIndex + 1])
        }
        break
      case 'Escape':
        setSelectedPhoto(null)
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto, currentIndex, filteredPhotos])

  return (
    <div className="container mx-auto px-4">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              'px-6 py-2 rounded-full transition-colors',
              selectedCategory === category.id
                ? 'bg-orange-500 text-white'
                : 'bg-zinc-800/50 text-white/70 hover:bg-zinc-700/50'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            layoutId={photo.id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              onLoadingComplete={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm">{photo.caption}</p>
                {photo.location && (
                  <p className="text-white/70 text-xs mt-1">{photo.location}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Navigation */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPhoto(filteredPhotos[currentIndex - 1])
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/70 hover:text-white"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {currentIndex < filteredPhotos.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPhoto(filteredPhotos[currentIndex + 1])
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/70 hover:text-white"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white/70 hover:text-white"
            >
              <X size={24} />
            </button>

            {/* Photo */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative w-full max-w-5xl aspect-[3/2]">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Photo Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
              <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white text-lg font-medium mb-1">
                      {selectedPhoto.caption}
                    </p>
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                      {selectedPhoto.credit && (
                        <span>Photo by {selectedPhoto.credit}</span>
                      )}
                      {selectedPhoto.date && <span>{selectedPhoto.date}</span>}
                      {selectedPhoto.location && (
                        <span>{selectedPhoto.location}</span>
                      )}
                    </div>
                    {selectedPhoto.tags && (
                      <div className="flex gap-2 mt-2">
                        {selectedPhoto.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full bg-white/10 text-white/80 text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {selectedPhoto.downloadUrl && (
                      <a
                        href={selectedPhoto.downloadUrl}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                      >
                        <Download size={20} />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle share
                      }}
                      className="p-2 rounded-full bg-zinc-800 text-white/70 hover:text-white"
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 