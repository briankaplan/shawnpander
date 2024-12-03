export interface PlaybackState {
  isPlaying: boolean
  position: number
  track: {
    id: string
    name: string
    artist: string
    duration: number
    albumArt: string
  } | null
}

export interface PlaybackService {
  initialize(token: string): Promise<void>
  play(trackId: string): Promise<void>
  pause(): Promise<void>
  seek(position: number): Promise<void>
  getCurrentState(): Promise<PlaybackState | null>
} 