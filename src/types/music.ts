export type Platform = 'spotify' | 'appleMusic' | 'youtube' | 'amazonMusic'

export interface Track {
  id: string
  title: string
  duration: number
  side: 'A' | 'B'
  position: number
}

export interface Album {
  id: string
  title: string
  artwork: string
  releaseDate: string
  tracks: Track[]
  streamingLinks: {
    [K in Platform]?: string
  }
}

export interface MusicPlatformContextType {
  platform: Platform | null
  currentAlbum: Album | null
  isAuthenticated: boolean
  isPlaying: boolean
  currentTrack: Track | null
  loading: boolean
  albums: Album[]
  setCurrentAlbum: (album: Album | null) => void
  setCurrentTrack: (track: Track | null) => void
  togglePlayback: () => void
  switchPlatform: (platform: Platform) => Promise<void>
  login: () => Promise<void>
}