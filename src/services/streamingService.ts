export type ServiceType = 'spotify' | 'apple' | 'amazon'

export interface StreamingPlatform {
  name: string
  icon: string
  color: string
  url: string
  isExternal: boolean
}

export interface Album {
  id: string
  title: string
  releaseDate: string
  artwork: string
  spotifyUrl: string
  description?: string
  credits?: string
  tracks: Track[]
  streamingLinks: {
    spotify: string
    apple: string
    amazon: string
  }
  sides?: {
    A: Track[]
    B: Track[]
  }
}

interface Track {
  id: string
  title: string
  duration: string
  side?: 'A' | 'B'
  position?: number
}

// Helper function to split tracks into sides
function splitTracksIntoSides(tracks: Track[]): { A: Track[], B: Track[] } {
  const midpoint = Math.ceil(tracks.length / 2)
  return {
    A: tracks.slice(0, midpoint).map((track, index) => ({
      ...track,
      side: 'A' as const,
      position: index + 1
    })),
    B: tracks.slice(midpoint).map((track, index) => ({
      ...track,
      side: 'B' as const,
      position: index + 1
    }))
  }
}

// Mock albums for development
export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Forever & For Now',
    releaseDate: '2024',
    artwork: '/images/albums/Forever_and_for_now.webp',
    spotifyUrl: 'https://open.spotify.com/artist/5msMT1CsExJLdv96xtMwXE',
    description: 'The latest album featuring "Let\'s Just Groove" and more...',
    credits: 'Produced by Shawn Pander. Mixed by...',
    tracks: [
      { id: '1', title: "Let's Just Groove", duration: '3:45' },
      { id: '2', title: 'Forever & For Now', duration: '4:12' },
      { id: '3', title: 'Track 3', duration: '3:55' },
      { id: '4', title: 'Track 4', duration: '4:01' },
      { id: '5', title: 'Track 5', duration: '3:48' },
      { id: '6', title: 'Track 6', duration: '4:22' }
    ],
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/...',
      apple: 'https://music.apple.com/album/...',
      amazon: 'https://music.amazon.com/albums/...'
    },
    get sides() {
      return splitTracksIntoSides(this.tracks)
    }
  },
  {
    id: '2',
    title: 'Notes from Hoover Street',
    releaseDate: '2023',
    artwork: '/images/albums/notes_from_hoover_street.jpeg',
    spotifyUrl: 'https://open.spotify.com/artist/5msMT1CsExJLdv96xtMwXE',
    description: 'A collection of stories from Hoover Street...',
    tracks: [
      { id: '7', title: 'Hoover Street Blues', duration: '3:55' },
      { id: '8', title: 'City Lights', duration: '4:10' },
      { id: '9', title: 'Midnight Train', duration: '3:45' },
      { id: '10', title: 'Street Corner', duration: '4:20' },
      { id: '11', title: 'Neon Signs', duration: '3:50' },
      { id: '12', title: 'Last Call', duration: '4:15' }
    ],
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/...',
      apple: 'https://music.apple.com/album/...',
      amazon: 'https://music.amazon.com/albums/...'
    },
    get sides() {
      return splitTracksIntoSides(this.tracks)
    }
  },
  {
    id: '3',
    title: 'Being Here',
    releaseDate: '2022',
    artwork: '/images/albums/being_here.jpeg',
    spotifyUrl: 'https://open.spotify.com/artist/5msMT1CsExJLdv96xtMwXE',
    description: 'An intimate acoustic album...',
    tracks: [
      { id: '13', title: 'Present Moment', duration: '3:30' },
      { id: '14', title: 'Here & Now', duration: '4:05' },
      { id: '15', title: 'Timeless', duration: '3:45' },
      { id: '16', title: 'Eternal', duration: '4:00' },
      { id: '17', title: 'Forever', duration: '3:55' },
      { id: '18', title: 'Always', duration: '4:10' }
    ],
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/...',
      apple: 'https://music.apple.com/album/...',
      amazon: 'https://music.amazon.com/albums/...'
    },
    get sides() {
      return splitTracksIntoSides(this.tracks)
    }
  }
]

export const streamingPlatforms: Record<ServiceType, StreamingPlatform> = {
  spotify: {
    name: 'Spotify',
    icon: 'spotify',
    color: '#1DB954',
    url: `https://open.spotify.com/artist/5msMT1CsExJLdv96xtMwXE`,
    isExternal: false
  },
  apple: {
    name: 'Apple Music',
    icon: 'apple',
    color: '#FA57C1',
    url: 'https://music.apple.com/artist/shawn-pander',
    isExternal: true
  },
  amazon: {
    name: 'Amazon Music',
    icon: 'amazon',
    color: '#00A8E1',
    url: 'https://music.amazon.com/artists/shawn-pander',
    isExternal: true
  }
}

export const streamingLinks = {
  spotify: streamingPlatforms.spotify.url,
  apple: streamingPlatforms.apple.url,
  amazon: streamingPlatforms.amazon.url
}

// Helper function to get streaming URLs for a release
export function getStreamingUrls(spotifyId: string) {
  return {
    spotify: `https://open.spotify.com/album/${spotifyId}`,
    apple: 'https://music.apple.com/artist/shawn-pander',
    amazon: 'https://music.amazon.com/artists/shawn-pander'
  }
}

// Helper function to get Spotify-specific URLs
export function getSpotifyUrls(type: 'artist' | 'album' | 'track', id: string) {
  const baseUrl = 'https://open.spotify.com'
  return {
    url: `${baseUrl}/${type}/${id}`,
    uri: `spotify:${type}:${id}`
  }
} 