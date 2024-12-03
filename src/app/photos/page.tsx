'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

const photos = [
  {
    src: '/images/albums/Forever_and_for_now.webp',
    alt: 'Forever & For Now Album Cover',
    caption: 'Forever & For Now - Album Cover 2024'
  },
  {
    src: '/images/albums/notes_from_hoover_street.jpeg',
    alt: 'Notes from Hoover Street Album',
    caption: 'Notes from Hoover Street - 2023'
  },
  {
    src: '/images/albums/being_here.jpeg',
    alt: 'Being Here Album',
    caption: 'Being Here - 2022'
  },
  {
    src: '/images/albums/black_and_white.jpg',
    alt: 'Black and White Album',
    caption: 'Black and White - 2021'
  },
  {
    src: '/images/albums/memories4sale.jpg',
    alt: 'Memories 4 Sale Album',
    caption: 'Memories 4 Sale - 2020'
  }
]

export default function PhotosPage() {
  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "text-center mb-12",
            "opacity-0 translate-y-4 animate-fade-in"
          )}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Photos</h1>
          <p className="text-xl text-orange-400">A Visual Journey Through the Music</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className={cn(
                "group",
                "opacity-0 translate-y-4 animate-fade-in",
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-center font-medium">{photo.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Background Gradient */}
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black z-0" />
      </div>
    </main>
  )
}