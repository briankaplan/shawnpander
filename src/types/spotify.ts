export interface SpotifyTrack {
  id: string
  name: string
  duration: number
  trackNumber: number
  previewUrl?: string
}

export interface SpotifyMetadata {
  id: string
  name: string
  artwork: string
  artist: string
  releaseDate: string
  tracks: SpotifyTrack[]
} 