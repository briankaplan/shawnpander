declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Environment
      NODE_ENV: 'development' | 'production' | 'test'

      // Site URLs
      NEXT_PUBLIC_SITE_URL: string

      // Spotify Configuration
      NEXT_PUBLIC_SPOTIFY_CLIENT_ID: string
      SPOTIFY_CLIENT_SECRET: string
      SPOTIFY_REDIRECT_URI: string
      NEXT_PUBLIC_SPOTIFY_ARTIST_ID: string

      // Supabase Configuration
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
      NEXT_PUBLIC_CRYPTO_KEY: string
      TOKEN_ENCRYPTION_ENABLED: string
      TOKEN_REFRESH_BUFFER: string
      TOKEN_MAX_REFRESH_ATTEMPTS: string
      TOKEN_REFRESH_RETRY_DELAY: string
    }
  }
}

// This empty export is necessary to make this a module
export {}