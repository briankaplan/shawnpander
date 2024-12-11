import { Album } from '@/types/music'

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Forever & For Now',
    artwork: '/images/albums/Forever_and_for_now.webp',
    releaseDate: '2024-01-01',
    tracks: [
      {
        id: '1-1',
        title: "Let's Just Groove",
        duration: 180,
        side: 'A',
        position: 1
      },
      // Add more tracks...
    ],
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/forever-and-for-now',
      appleMusic: 'https://music.apple.com/album/forever-and-for-now'
    }
  },
  // Add more albums...
]

// For backward compatibility
export const albums = mockAlbums