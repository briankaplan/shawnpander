export interface Release {
  type: 'album' | 'single'
  title: string
  releaseDate: string
  spotifyId?: string
  artwork?: string
  description?: string
}

export const upcomingReleases: Release[] = [
  {
    type: 'single',
    title: 'First Single',
    releaseDate: '2023-12-03T00:00:00Z',
    description: 'Get ready for the first single from Forever & For Now'
  },
  {
    type: 'album',
    title: 'Forever & For Now',
    releaseDate: '2023-12-22T00:00:00Z',
    description: 'The full album drops just in time for the holidays'
  }
] 