import type { SpotifyAlbum, SpotifyTrack } from '@/types/music'

const foreverAndForNowTracks: SpotifyTrack[] = [
  {
    id: 'forever-1',
    title: "Let's Just Groove",
    artist: "Shawn Pander",
    duration: 240000, // 4:00
    albumArt: "/images/albums/Forever_and_for_now.webp",
    previewUrl: undefined,
    trackNumber: 1
  },
  {
    id: 'forever-2',
    title: "Forever & For Now",
    artist: "Shawn Pander",
    duration: 210000, // 3:30
    albumArt: "/images/albums/Forever_and_for_now.webp",
    previewUrl: undefined,
    trackNumber: 2
  },
  {
    id: 'forever-3',
    title: "Track 3",
    artist: "Shawn Pander",
    duration: 180000, // 3:00
    albumArt: "/images/albums/Forever_and_for_now.webp",
    previewUrl: undefined,
    trackNumber: 3
  }
]

export const mockAlbums: SpotifyAlbum[] = [
  {
    id: 'forever-and-for-now',
    title: "Forever & For Now",
    artist: "Shawn Pander",
    image: "/images/albums/Forever_and_for_now.webp",
    year: 2024,
    releaseDate: "2024-12-22",
    description: "Available December 22nd, featuring the first single 'Let's Just Groove' coming December 3rd",
    streamingLinks: {
      spotify: "https://open.spotify.com",
      appleMusic: "https://music.apple.com",
      amazonMusic: "https://music.amazon.com"
    },
    tracks: foreverAndForNowTracks
  },
  {
    id: 'notes-from-hoover',
    title: "Notes from Hoover Street",
    artist: "Shawn Pander",
    image: "/images/albums/notes_from_hoover_street.jpeg",
    year: 2023,
    tracks: [
      {
        id: '1-1',
        title: "Track 1",
        artist: "Shawn Pander",
        duration: 180000,
        albumArt: "/images/albums/notes_from_hoover_street.jpeg",
        previewUrl: undefined,
        trackNumber: 1
      },
      {
        id: '1-2',
        title: "Track 2",
        artist: "Shawn Pander",
        duration: 210000,
        albumArt: "/images/albums/notes_from_hoover_street.jpeg",
        previewUrl: undefined,
        trackNumber: 2
      },
      {
        id: '1-3',
        title: "Track 3",
        artist: "Shawn Pander",
        duration: 240000,
        albumArt: "/images/albums/notes_from_hoover_street.jpeg",
        previewUrl: undefined,
        trackNumber: 3
      }
    ]
  },
  {
    id: 'being-here',
    title: "Being Here",
    artist: "Shawn Pander",
    image: "/images/albums/being_here.jpeg",
    year: 2022,
    tracks: [
      {
        id: '3-1',
        title: "Track 1",
        artist: "Shawn Pander",
        duration: 180000,
        albumArt: "/images/albums/being_here.jpeg",
        previewUrl: undefined,
        trackNumber: 1
      },
      {
        id: '3-2',
        title: "Track 2",
        artist: "Shawn Pander",
        duration: 210000,
        albumArt: "/images/albums/being_here.jpeg",
        previewUrl: undefined,
        trackNumber: 2
      },
      {
        id: '3-3',
        title: "Track 3",
        artist: "Shawn Pander",
        duration: 240000,
        albumArt: "/images/albums/being_here.jpeg",
        previewUrl: undefined,
        trackNumber: 3
      }
    ]
  },
  {
    id: 'black-and-white',
    title: "Black and White",
    artist: "Shawn Pander",
    image: "/images/albums/black_and_white.jpg",
    year: 2021,
    tracks: [
      {
        id: '4-1',
        title: "Track 1",
        artist: "Shawn Pander",
        duration: 180000,
        albumArt: "/images/albums/black_and_white.jpg",
        previewUrl: undefined,
        trackNumber: 1
      },
      {
        id: '4-2',
        title: "Track 2",
        artist: "Shawn Pander",
        duration: 210000,
        albumArt: "/images/albums/black_and_white.jpg",
        previewUrl: undefined,
        trackNumber: 2
      },
      {
        id: '4-3',
        title: "Track 3",
        artist: "Shawn Pander",
        duration: 240000,
        albumArt: "/images/albums/black_and_white.jpg",
        previewUrl: undefined,
        trackNumber: 3
      }
    ]
  },
  {
    id: 'memories-4-sale',
    title: "Memories 4 Sale",
    artist: "Shawn Pander",
    image: "/images/albums/memories4sale.jpg",
    year: 2020,
    tracks: [
      {
        id: '5-1',
        title: "Track 1",
        artist: "Shawn Pander",
        duration: 180000,
        albumArt: "/images/albums/memories4sale.jpg",
        previewUrl: undefined,
        trackNumber: 1
      },
      {
        id: '5-2',
        title: "Track 2",
        artist: "Shawn Pander",
        duration: 210000,
        albumArt: "/images/albums/memories4sale.jpg",
        previewUrl: undefined,
        trackNumber: 2
      },
      {
        id: '5-3',
        title: "Track 3",
        artist: "Shawn Pander",
        duration: 240000,
        albumArt: "/images/albums/memories4sale.jpg",
        previewUrl: undefined,
        trackNumber: 3
      }
    ]
  }
]

// For backward compatibility
export const albums = mockAlbums