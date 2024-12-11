'use client'

import { Album } from '@/types/music'

interface VinylPlayerProps {
  album: Album | null
}

export function VinylPlayer({ album }: VinylPlayerProps) {
  if (!album) {
    return <div>Select an album to play</div>
  }

  return (
    // Your vinyl player implementation
    <div>Vinyl Player for {album.title}</div>
  )
} 