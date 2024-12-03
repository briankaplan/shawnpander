'use client'

import { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { getSpotifyApi } from '@/lib/spotify'

export default function MusicAdmin() {
  const supabase = useSupabaseClient()
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [spotifyUrl, setSpotifyUrl] = useState('')

  const handleAddAlbum = async () => {
    try {
      // Extract Spotify ID from URL
      const spotifyId = spotifyUrl.split('/').pop()
      if (!spotifyId) return

      // Fetch album details from Spotify
      const spotifyApi = await getSpotifyApi()
      const albumData = await spotifyApi.getAlbum(spotifyId)
      
      // Insert album into Supabase
      const { data: album, error: albumError } = await supabase
        .from('albums')
        .insert({
          title: albumData.body.name,
          release_date: albumData.body.release_date,
          cover_url: albumData.body.images[0].url,
          spotify_id: spotifyId,
        })
        .select()
        .single()

      if (albumError) throw albumError

      // Insert tracks
      const tracks = albumData.body.tracks.items.map((track, index) => ({
        album_id: album.id,
        title: track.name,
        duration: msToMinutesAndSeconds(track.duration_ms),
        spotify_uri: track.uri,
        side: index < albumData.body.tracks.items.length / 2 ? 'A' : 'B',
        position: index + 1,
      }))

      const { error: tracksError } = await supabase
        .from('tracks')
        .insert(tracks)

      if (tracksError) throw tracksError

      // Refresh albums list
      fetchAlbums()
      setSpotifyUrl('')
    } catch (error) {
      console.error('Error adding album:', error)
      alert('Error adding album')
    }
  }

  const fetchAlbums = async () => {
    try {
      const { data, error } = await supabase
        .from('albums')
        .select(`
          *,
          tracks (*)
        `)
        .order('release_date', { ascending: false })

      if (error) throw error
      setAlbums(data || [])
    } catch (error) {
      console.error('Error fetching albums:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Music Admin</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Album</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={spotifyUrl}
            onChange={(e) => setSpotifyUrl(e.target.value)}
            placeholder="Spotify Album URL"
            className="flex-1 px-4 py-2 rounded border"
          />
          <button
            onClick={handleAddAlbum}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Add Album
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {albums.map((album) => (
          <div key={album.id} className="p-4 border rounded">
            <div className="flex gap-4">
              <img
                src={album.cover_url}
                alt={album.title}
                className="w-32 h-32 object-cover"
              />
              <div>
                <h3 className="text-xl font-medium">{album.title}</h3>
                <p className="text-gray-600">{album.release_date}</p>
                <div className="mt-2">
                  <h4 className="font-medium">Tracks:</h4>
                  <ul className="ml-4">
                    {album.tracks.map((track) => (
                      <li key={track.id}>
                        {track.position}. {track.title} - {track.duration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function msToMinutesAndSeconds(ms: number) {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`
} 