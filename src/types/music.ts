export interface SpotifyAlbum {
  id: string
  title: string
  year: string
  image: string
  releaseDate?: string
  streamingLinks?: Record<string, string>
}