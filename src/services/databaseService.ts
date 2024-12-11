import { supabase } from '@/lib/supabase'
import type { Album, Track } from './types/music'

export async function getStoredAlbums(): Promise<Album[]> {
  const { data: albums, error } = await supabase
    .from('albums')
    .select('*')
    .order('releaseDate', { ascending: false })

  if (error) throw error
  
  return albums.map(album => ({
    id: album.id,
    title: album.title,
    artwork: album.artwork,
    releaseDate: album.releaseDate,
    tracks: album.tracks,
    url: `https://open.spotify.com/album/${album.spotifyId}`,
    platform: 'spotify'
  }))
} 