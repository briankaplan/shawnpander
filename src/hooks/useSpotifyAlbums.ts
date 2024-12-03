'use client'

import { useState, useEffect } from 'react'
import type { SpotifyMetadata } from '@/types/spotify'

// Temporary mock data until Spotify API is set up
const mockAlbums: SpotifyMetadata[] = [
  {
    id: '1',
    name: 'Forever & For Now',
    artwork: '/images/albums/Forever_and_for_now.webp',
    releaseDate: '2023-12-22',
    artist: 'Shawn Pander',
    tracks: [
      {
        id: '1',
        name: "Let's Just Groove",
        duration: 180000,
        trackNumber: 1,
        previewUrl: undefined
      }
    ]
  }
]

export function useSpotifyAlbums() {
  const [albums, setAlbums] = useState<SpotifyMetadata[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const loadAlbums = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setAlbums(mockAlbums)
      } catch (err) {
        console.error('Failed to load albums:', err)
        setError(err instanceof Error ? err.message : 'Failed to load albums')
      } finally {
        setLoading(false)
      }
    }

    loadAlbums()
  }, [])

  return { albums, loading, error }
} 