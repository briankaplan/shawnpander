import type { MusicService } from '@/types/music'
import { APPLE_MUSIC_CONFIG } from '@/config/music'
import jwt from 'jsonwebtoken'

export class AppleMusicService implements MusicService {
  private static instance: AppleMusicService
  private musicKit: any // MusicKit type
  private accessToken: string | null = null

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMusicKit()
    }
  }

  static getInstance(): AppleMusicService {
    if (!AppleMusicService.instance) {
      AppleMusicService.instance = new AppleMusicService()
    }
    return AppleMusicService.instance
  }

  private async initializeMusicKit() {
    try {
      // Fetch developer token from API
      const response = await fetch('/api/music/apple/token')
      const data = await response.json()
      
      if (!response.ok || !data.token) {
        throw new Error(data.error || 'Failed to get Apple Music token')
      }

      // Configure MusicKit
      await window.MusicKit.configure({
        developerToken: data.token,
        app: {
          name: APPLE_MUSIC_CONFIG.appName,
          build: APPLE_MUSIC_CONFIG.appVersion
        },
        redirectURI: process.env.NEXT_PUBLIC_APPLE_MUSIC_REDIRECT_URI,
        scopes: ['musickit.library.read', 'musickit.library.modify']
      })

      this.musicKit = window.MusicKit.getInstance()
    } catch (error) {
      console.error('MusicKit initialization error:', error)
      throw new Error('Failed to initialize Apple Music')
    }
  }

  get isAuthenticated(): boolean {
    return this.musicKit?.isAuthorized || false
  }

  async login(): Promise<void> {
    try {
      if (!this.musicKit) {
        await this.initializeMusicKit()
      }
      await this.musicKit.authorize()
      this.accessToken = this.musicKit.musicUserToken
    } catch (error) {
      console.error('Apple Music login error:', error)
      throw new Error('Failed to login to Apple Music')
    }
  }

  async logout(): Promise<void> {
    if (this.musicKit) {
      await this.musicKit.unauthorize()
      this.accessToken = null
    }
  }

  async play(trackId: string): Promise<void> {
    if (!this.isAuthenticated) throw new Error('Not authenticated')
    await this.musicKit.setQueue({
      songs: [trackId]
    })
    await this.musicKit.play()
  }

  async pause(): Promise<void> {
    if (!this.isAuthenticated) throw new Error('Not authenticated')
    await this.musicKit.pause()
  }

  async seek(position: number): Promise<void> {
    if (!this.isAuthenticated) throw new Error('Not authenticated')
    await this.musicKit.seekToTime(position / 1000) // Convert ms to seconds
  }

  async getCurrentTrack() {
    if (!this.isAuthenticated) return null
    const nowPlaying = this.musicKit.player.nowPlayingItem

    if (!nowPlaying) return null

    return {
      id: nowPlaying.id,
      title: nowPlaying.title,
      duration: nowPlaying.playbackDuration * 1000, // Convert to ms
      url: nowPlaying.attributes?.url,
      artwork: nowPlaying.attributes?.artwork?.url,
      platform: 'apple' as const
    }
  }
} 