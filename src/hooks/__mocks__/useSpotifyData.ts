import type { SpotifyState, SpotifyAlbum, SpotifyTrack } from '@/types/music'

const mockTracks: SpotifyTrack[] = [
  {
    id: '1',
    title: 'Cold Days in June',
    artist: 'Shawn Pander',
    duration: 225000,
    albumArt: '/images/albums/Forever_and_for_now.webp',
    previewUrl: undefined,
    trackNumber: 1
  },
  {
    id: '2',
    title: 'Human Condition',
    artist: 'Shawn Pander',
    duration: 252000,
    albumArt: '/images/albums/Forever_and_for_now.webp',
    previewUrl: undefined,
    trackNumber: 2
  }
]

const mockAlbum: SpotifyAlbum = {
  id: 'album1',
  title: 'Forever & For Now',
  artist: 'Shawn Pander',
  image: '/images/albums/Forever_and_for_now.webp',
  year: 2023,
  tracks: mockTracks,
  name: 'Forever & For Now'
}

const mockSpotifyState: SpotifyState = {
  albums: [mockAlbum],
  currentAlbum: mockAlbum,
  currentTrack: mockTracks[0],
  loading: false,
  isPlaying: false,
  error: null,
  selectAlbum: jest.fn(),
  selectTrack: jest.fn(),
  togglePlay: jest.fn()
}

export const useSpotifyData = (): SpotifyState => mockSpotifyState