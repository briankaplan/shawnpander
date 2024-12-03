import SpotifyWebApi from 'spotify-web-api-node'
import type { PlaybackService } from './types'

class SpotifyService implements PlaybackService {
  private spotifyApi: SpotifyWebApi
  private deviceId: string | null = null

  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })
  }

  async initialize(token: string) {
    this.spotifyApi.setAccessToken(token)
    await this.getPlaybackDevice()
  }

  private async getPlaybackDevice() {
    try {
      const devices = await this.spotifyApi.getMyDevices()
      this.deviceId = devices.body.devices[0]?.id || null
    } catch (error) {
      console.error('Failed to get Spotify devices:', error)
    }
  }

  async play(trackId: string) {
    if (!this.deviceId) await this.getPlaybackDevice()
    
    try {
      await this.spotifyApi.play({
        device_id: this.deviceId!,
        uris: [`spotify:track:${trackId}`]
      })
    } catch (error) {
      console.error('Failed to play track:', error)
      throw error
    }
  }

  async pause() {
    try {
      await this.spotifyApi.pause()
    } catch (error) {
      console.error('Failed to pause playback:', error)
      throw error
    }
  }

  async seek(position: number) {
    try {
      await this.spotifyApi.seek(position)
    } catch (error) {
      console.error('Failed to seek:', error)
      throw error
    }
  }

  async getCurrentState() {
    try {
      const state = await this.spotifyApi.getMyCurrentPlaybackState()
      return {
        isPlaying: state.body.is_playing,
        position: state.body.progress_ms || 0,
        track: state.body.item ? {
          id: state.body.item.id,
          name: state.body.item.name,
          artist: state.body.item.artists[0].name,
          duration: state.body.item.duration_ms,
          albumArt: state.body.item.album.images[0].url
        } : null
      }
    } catch (error) {
      console.error('Failed to get playback state:', error)
      return null
    }
  }
}

export const spotifyService = new SpotifyService() 