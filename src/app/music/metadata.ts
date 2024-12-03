import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music | Shawn Pander',
  description: 'Listen to Shawn Pander\'s latest album "Forever & For Now" and explore his discography featuring soulful blues and rock music.',
  openGraph: {
    title: 'Music | Shawn Pander',
    description: 'Listen to Shawn Pander\'s latest album "Forever & For Now" and explore his discography.',
    images: [
      {
        url: '/images/albums/forever-and-now.jpg',
        width: 1200,
        height: 1200,
        alt: 'Forever & For Now Album Cover'
      }
    ],
    type: 'music.album',
    siteName: 'Shawn Pander',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music | Shawn Pander',
    description: 'Listen to Shawn Pander\'s latest album "Forever & For Now" and explore his discography.',
    images: ['/images/albums/forever-and-now.jpg'],
    creator: '@shawnpander'
  }
}