interface StoredAlbum {
  id: string
  title: string
  releaseDate: string
  artwork: string
  spotifyId: string
  appleMusicId: string
  tracks: StoredTrack[]
}

interface StoredTrack {
  id: string
  title: string
  duration: number
  spotifyId: string
  appleMusicId: string
  previewUrl?: string
  position: number
} 