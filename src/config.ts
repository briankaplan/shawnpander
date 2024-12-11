const SITE_CONFIG = {
  name: 'Shawn Pander',
  description: 'Official website of Shawn Pander - Musician, Songwriter, Performer',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  sections: {
    music: { enabled: true },
    shows: { enabled: true },
    press: { enabled: true },
    connect: { enabled: true }
  },
  social: {
    spotify: 'https://open.spotify.com/artist/shawnpander',
    appleMusic: 'https://music.apple.com/artist/shawnpander',
    instagram: 'https://instagram.com/shawnpander',
    youtube: 'https://youtube.com/@shawnpander'
  }
} as const

export const CONFIG = {
  site: SITE_CONFIG,
  env: {
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development'
  },
  music: {
    defaultCoverImage: '/images/albums/default-cover.webp',
    artworkPath: '/images/albums',
    supportedFormats: ['webp', 'jpg', 'png']
  }
} as const

export type Config = typeof CONFIG 