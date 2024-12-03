import { AuthConfig } from '@supabase/supabase-js'

export const SUPABASE_CONFIG = {
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  AUTH: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  } satisfies AuthConfig,
  TABLES: {
    ALBUMS: 'albums',
    TRACKS: 'tracks',
    USER_PREFERENCES: 'user_preferences',
  },
} as const 