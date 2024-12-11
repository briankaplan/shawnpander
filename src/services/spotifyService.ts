import SpotifyWebApi from 'spotify-web-api-node';
import { MUSIC_CONFIG } from '@/config/music';
import type { MusicService } from '@/types/music';

export class SpotifyService implements MusicService {
  private static instance: SpotifyService;
  private spotify: SpotifyWebApi;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private stateKey = 'spotify_auth_state';

  private constructor() {
    this.spotify = new SpotifyWebApi({
      clientId: MUSIC_CONFIG.spotify.clientId,
      redirectUri: MUSIC_CONFIG.spotify.redirectUri
    });
  }

  static getInstance(): SpotifyService {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }
    return SpotifyService.instance;
  }

  get isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  async login(): Promise<void> {
    try {
      const state = this.generateRandomString(16);
      localStorage.setItem(this.stateKey, state);

      const authUrl = new URL('https://accounts.spotify.com/authorize');
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: MUSIC_CONFIG.spotify.clientId,
        scope: MUSIC_CONFIG.spotify.scopes.join(' '),
        redirect_uri: MUSIC_CONFIG.spotify.redirectUri,
        state: state
      });

      window.location.href = `${authUrl}?${params.toString()}`;
    } catch (error) {
      console.error('Spotify login error:', error);
      throw new Error('Failed to initialize Spotify login');
    }
  }

  async handleCallback(code: string, state: string): Promise<void> {
    const storedState = localStorage.getItem(this.stateKey);
    if (!state || state !== storedState) {
      throw new Error('State mismatch');
    }

    try {
      const data = await fetch('/api/spotify/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      }).then(res => res.json());

      if (data.error) {
        throw new Error(data.error);
      }

      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.spotify.setAccessToken(data.access_token);
      this.spotify.setRefreshToken(data.refresh_token);

      // Set up token refresh
      setTimeout(() => {
        this.refreshAccessToken();
      }, (data.expires_in - 60) * 1000); // Refresh 1 minute before expiry
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  async play(trackId: string): Promise<void> {
    if (!this.isAuthenticated) {
      throw new Error('Not authenticated');
    }

    try {
      await this.spotify.play({ uris: [`spotify:track:${trackId}`] });
    } catch (error) {
      console.error('Playback error:', error);
      throw error;
    }
  }

  async pause(): Promise<void> {
    if (!this.isAuthenticated) {
      throw new Error('Not authenticated');
    }

    try {
      await this.spotify.pause();
    } catch (error) {
      console.error('Pause error:', error);
      throw error;
    }
  }

  async seek(position: number): Promise<void> {
    if (!this.isAuthenticated) {
      throw new Error('Not authenticated');
    }

    try {
      await this.spotify.seek(position);
    } catch (error) {
      console.error('Seek error:', error);
      throw error;
    }
  }

  async getCurrentTrack() {
    if (!this.isAuthenticated) return null;

    try {
      const response = await this.spotify.getMyCurrentPlayingTrack();
      const track = response.body.item;

      if (!track) return null;

      return {
        id: track.id,
        title: track.name,
        duration: track.duration_ms,
        url: track.external_urls.spotify,
        artwork: track.album.images[0]?.url,
        platform: 'spotify' as const
      };
    } catch (error) {
      console.error('Get current track error:', error);
      return null;
    }
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) return;

    try {
      const data = await fetch('/api/spotify/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: this.refreshToken })
      }).then(res => res.json());

      if (data.error) {
        throw new Error(data.error);
      }

      this.accessToken = data.access_token;
      this.spotify.setAccessToken(data.access_token);

      // Set up next refresh
      setTimeout(() => {
        this.refreshAccessToken();
      }, (data.expires_in - 60) * 1000);
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
    }
  }

  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.spotify.resetAccessToken();
    this.spotify.resetRefreshToken();
    localStorage.removeItem(this.stateKey);
  }

  private generateRandomString(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
      .map((x) => possible[x % possible.length])
      .join('');
  }
}