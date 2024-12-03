export type Platform = 'spotify' | 'apple' | 'amazon' | null

export interface StreamingPlatform {
  id: Platform
  name: string
  logo: string
  color: string
  canPlayInline: boolean
  externalUrl: string
}

export const STREAMING_PLATFORMS: StreamingPlatform[] = [
  {
    id: 'spotify',
    name: 'Spotify',
    logo: '/images/platforms/spotify.svg',
    color: '#1DB954',
    canPlayInline: true,
    externalUrl: 'https://open.spotify.com/artist/'
  },
  {
    id: 'apple',
    name: 'Apple Music',
    logo: '/images/platforms/apple-music.svg',
    color: '#FA2C55',
    canPlayInline: false,
    externalUrl: 'https://music.apple.com/artist/'
  },
  {
    id: 'amazon',
    name: 'Amazon Music',
    logo: '/images/platforms/amazon-music.svg',
    color: '#00A8E1',
    canPlayInline: false,
    externalUrl: 'https://music.amazon.com/artists/'
  }
] 