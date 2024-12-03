export const AUTH_CONFIG = {
  // Spotify OAuth scopes
  SPOTIFY_SCOPES: [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-library-read',
    'playlist-read-private',
  ],

  // Session configuration
  SESSION: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // Redirect paths
  REDIRECT_PATHS: {
    afterLogin: '/#music',
    afterLogout: '/',
    onError: '/error',
  },

  // Role configuration
  ROLES: {
    ADMIN: 'admin',
    USER: 'user',
  },
} 