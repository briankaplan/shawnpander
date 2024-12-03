export type ContentType = 'song' | 'show' | 'album' | 'custom'

export interface BaseContent {
  id: string
  type: ContentType
  title: string
  description?: string
  image: string
  startDate?: string
  endDate?: string
  active: boolean
  order: number
  releaseDate?: string
}

export interface SongContent extends BaseContent {
  type: 'song'
  streamingLinks: {
    spotify?: string
    appleMusic?: string
    amazonMusic?: string
  }
  releaseDate: string
}

export interface ShowContent extends BaseContent {
  type: 'show'
  venue: string
  location: string
  ticketUrl?: string
  price?: string
  time?: string
}

export interface AlbumContent extends BaseContent {
  type: 'album'
  streamingLinks: {
    spotify?: string
    appleMusic?: string
    amazonMusic?: string
  }
  releaseDate: string
}

export interface CustomContent extends BaseContent {
  type: 'custom'
  buttonText?: string
  buttonUrl?: string
}

export type HeaderContent = SongContent | ShowContent | AlbumContent | CustomContent 