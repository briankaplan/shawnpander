import SpotifyWebApi from 'spotify-web-api-node'
import { supabase } from '@/lib/supabase'

interface AppleMusicAlbum {
  id: string
  tracks: {
    id: string
    title: string
    duration: number
  }[]
}

export class MetadataService {
  private spotify: SpotifyWebApi
  
  constructor() {
    this.spotify = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })
  }

  async scrapeAndStore() {
    console.log('Getting Spotify access token...')
    const auth = await this.spotify.clientCredentialsGrant()
    this.spotify.setAccessToken(auth.body.access_token)

    console.log('Fetching albums...')
    const artistId = process.env.SPOTIFY_ARTIST_ID!
    const albums = await this.spotify.getArtistAlbums(artistId, {
      limit: 50,
      include_groups: 'album,single'
    })

    console.log(`Found ${albums.body.items.length} albums`)

    for (const album of albums.body.items) {
      try {
        console.log(`Processing album: ${album.name}`)
        
        // Get detailed album info including tracks
        const spotifyAlbum = await this.spotify.getAlbum(album.id)
        
        // Store in database
        console.log('Storing in database...')
        const { error } = await supabase
          .from('albums')
          .upsert({
            id: album.id,
            title: album.name,
            releaseDate: album.release_date,
            artwork: album.images[0]?.url,
            spotifyId: album.id,
            tracks: spotifyAlbum.body.tracks.items.map((track) => ({
              id: track.id,
              title: track.name,
              duration: track.duration_ms,
              spotifyId: track.id,
              position: track.track_number,
              previewUrl: track.preview_url
            }))
          })

        if (error) {
          console.error('Error storing album:', error)
        } else {
          console.log(`Successfully stored album: ${album.name}`)
        }

        // Rate limiting pause
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error processing album ${album.name}:`, error)
      }
    }
  }

  async handleNewRelease(spotifyId: string): Promise<void> {
    try {
      const album = await this.spotify.getAlbum(spotifyId)
      await this.scrapeAndStore()
      
      // Notify subscribers
      if (process.env.DISCORD_WEBHOOK_URL) {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `New release: ${album.body.name} is now available!`
          })
        })
      }
    } catch (error) {
      console.error('Error handling new release:', error)
      throw error
    }
  }
} 