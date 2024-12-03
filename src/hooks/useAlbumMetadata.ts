import { useState, useEffect } from 'react'
import { getSpotifyApi } from '@/lib/spotify'

export interface SpotifyMetadata {
  id: string
  name: string
  artwork: string
  artist: string
  releaseDate: string
  tracks: {
    id: string
    name: string
    duration: number
    trackNumber: number
    previewUrl?: string
  }[]
}

export function useAlbumMetadata(albumId: string) {
  const [metadata, setMetadata] = useState<SpotifyMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!albumId) {
      setLoading(false)
      return
    }

    const fetchMetadata = async () => {
      try {
        setLoading(true)
        const spotifyApi = await getSpotifyApi()
        const response = await spotifyApi.getAlbum(albumId)
        const album = response.body

        setMetadata({
          id: album.id,
          name: album.name,
          artwork: album.images[0].url,
          artist: album.artists[0].name,
          releaseDate: album.release_date,
          tracks: album.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            duration: track.duration_ms,
            trackNumber: track.track_number,
            previewUrl: track.preview_url || undefined
          }))
        })
        setError(null)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetadata()
  }, [albumId])

  return { metadata, loading, error }
} 