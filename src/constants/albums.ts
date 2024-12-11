import type { Album } from '@/types/music'

export const ALBUMS: Album[] = [
  {
    id: 'forever-and-for-now',
    title: 'Forever & For Now',
    artwork: '/images/albums/forever-and-for-now.webp',
    releaseDate: '2024-03-15',
    tracks: [
      {
        id: 'track-1',
        title: "Let's Just Groove",
        duration: 225,
        side: 'A',
        position: 1
      },
      {
        id: 'track-2',
        title: 'Forever & For Now',
        duration: 198,
        side: 'A',
        position: 2
      }
    ],
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/forever-and-for-now',
      appleMusic: 'https://music.apple.com/album/forever-and-for-now',
      youtube: 'https://youtube.com/playlist/forever-and-for-now'
    }
  }
] 