'use client'

import { useState } from 'react'
import { VinylPlayer } from '@/components/VinylPlayer'
import { upcomingReleases } from '@/config/releases'

const mockAlbums = [
  {
    id: '1',
    title: 'Forever & For Now',
    releaseDate: '2023-12-22',
    artwork: '/images/albums/forever-and-now.jpg',
    isReleased: false,
    tracks: []
  },
  {
    id: '2',
    title: 'Notes from Hoover Street',
    releaseDate: '2022-01-01',
    artwork: '/images/albums/notes-from-hoover.jpg',
    isReleased: true,
    tracks: [
      {
        id: '1',
        title: 'Track 1',
        duration: 180,
        previewUrl: 'https://example.com/preview1.mp3'
      }
    ]
  }
]

export function VinylSection() {
  const [currentAlbum, setCurrentAlbum] = useState(mockAlbums[0])

  return (
    <section id="vinyl" className="relative min-h-screen bg-gradient-to-b from-black via-orange-900/10 to-black py-20 mt-[100vh]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {mockAlbums.map((album, index) => (
            <button
              key={album.id}
              onClick={() => setCurrentAlbum(album)}
              className={`px-6 py-2 rounded-full transition ${
                currentAlbum.id === album.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-zinc-800 text-white/70'
              }`}
              data-testid={`album-button-${index + 1}`}
            >
              {album.title}
            </button>
          ))}
        </div>

        <VinylPlayer
          albums={mockAlbums}
          currentAlbum={currentAlbum}
          onAlbumChange={setCurrentAlbum}
        />
      </div>
    </section>
  )
} 