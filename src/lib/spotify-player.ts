declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

export class SpotifyPlayer {
  private player: any;
  private deviceId: string | null = null;
  private isReady = false;
  private onStateChange: ((state: any) => void) | null = null;

  constructor(token: string, onStateChange?: (state: any) => void) {
    this.onStateChange = onStateChange || null;
    this.initializePlayer(token);
  }

  private initializePlayer(token: string) {
    if (!window.Spotify) {
      this.loadSpotifyScript().then(() => this.createPlayer(token));
    } else {
      this.createPlayer(token);
    }
  }

  private loadSpotifyScript(): Promise<void> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve();
      };
    });
  }

  private createPlayer(token: string) {
    this.player = new window.Spotify.Player({
      name: 'Web Vinyl Player',
      getOAuthToken: (cb: (token: string) => void) => cb(token),
      volume: 0.5
    });

    this.player.addListener('ready', ({ device_id }: { device_id: string }) => {
      this.deviceId = device_id;
      this.isReady = true;
    });

    if (this.onStateChange) {
      this.player.addListener('player_state_changed', this.onStateChange);
    }

    this.player.connect();
  }

  public async playTrack(uri: string) {
    if (!this.isReady || !this.deviceId) return;

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [uri] }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error playing track:', error);
    }
  }

  public togglePlay() {
    if (this.player) {
      this.player.togglePlay();
    }
  }

  public disconnect() {
    if (this.player) {
      this.player.disconnect();
    }
  }
} 