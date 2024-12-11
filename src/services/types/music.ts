export interface Track {
  id: string
  title: string
  duration: number
  url: string
  previewUrl?: string
  artwork?: string
  platform: 'spotify' | 'apple'
}

export interface Album {
  id: string
  title: string
  artwork: string
  releaseDate: string
  tracks: Track[]
  url: string
  platform: 'spotify' | 'apple'
}

export interface MusicService {
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => void
  play: (trackId: string) => Promise<void>
  pause: () => Promise<void>
  seek: (position: number) => Promise<void>
  getCurrentTrack: () => Promise<Track | null>
  getAlbums: () => Promise<Album[]>
  getAlbum: (id: string) => Promise<Album | null>
} 