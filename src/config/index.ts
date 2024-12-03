import { validateEnvironment } from './validation'
import { SPOTIFY_CONFIG } from './spotify'
import { SUPABASE_CONFIG } from './supabase'
import { FEATURES } from './features'

// Validate environment variables
const validation = validateEnvironment()
if (!validation.isValid) {
  console.error('Environment validation failed:', validation.errors)
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Invalid environment configuration')
  }
}

export const CONFIG = {
  ENV: process.env.NODE_ENV || 'development',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL!,
  
  SPOTIFY: SPOTIFY_CONFIG,
  SUPABASE: SUPABASE_CONFIG,
  FEATURES: FEATURES,
  
  SECURITY: {
    CRYPTO_KEY: process.env.NEXT_PUBLIC_CRYPTO_KEY!,
    TOKEN_ENCRYPTION: process.env.TOKEN_ENCRYPTION_ENABLED === 'true',
    TOKEN_REFRESH_BUFFER: Number(process.env.TOKEN_REFRESH_BUFFER),
    TOKEN_MAX_REFRESH_ATTEMPTS: Number(process.env.TOKEN_MAX_REFRESH_ATTEMPTS),
    TOKEN_REFRESH_RETRY_DELAY: Number(process.env.TOKEN_REFRESH_RETRY_DELAY),
  },

  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
} as const

// Type for the entire configuration
export type AppConfig = typeof CONFIG

// Helper to access config in components
export function useConfig(): AppConfig {
  return CONFIG
}

// Re-export feature flag utilities
export { isFeatureEnabled, type FeatureFlag } from './features' 