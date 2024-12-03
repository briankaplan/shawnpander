import { spotifyService } from './platforms/spotify'
import { appleMusicService } from './platforms/apple'
import { amazonMusicService } from './platforms/amazon'
import type { PlaybackService } from './platforms/types'

class PlaybackManager {
  private services: Record<string, PlaybackService> = {
    spotify: spotifyService,
    apple: appleMusicService,
    amazon: amazonMusicService
  }

  private currentService: PlaybackService | null = null
  private currentPlatform: string | null = null

  async initialize(platform: string, token: string) {
    if (this.currentPlatform === platform) return

    const service = this.services[platform]
    if (!service) throw new Error(`Unsupported platform: ${platform}`)

    await service.initialize(token)
    this.currentService = service
    this.currentPlatform = platform
  }

  async play(trackId: string) {
    if (!this.currentService) throw new Error('No platform initialized')
    await this.currentService.play(trackId)
  }

  async pause() {
    if (!this.currentService) return
    await this.currentService.pause()
  }

  async seek(position: number) {
    if (!this.currentService) return
    await this.currentService.seek(position)
  }

  async getCurrentState() {
    if (!this.currentService) return null
    return await this.currentService.getCurrentState()
  }
}

export const playbackManager = new PlaybackManager() 