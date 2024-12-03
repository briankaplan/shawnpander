import type { SpotifyAlbum } from '@/types/music'

export interface VinylPlayerProps {
  selectedAlbumId: string
  onAlbumSelect: (album: SpotifyAlbum) => void
} 