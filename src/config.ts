export const CONFIG = {
  SUPABASE: {
    URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    AUTH: {
      persistSession: true,
      autoRefreshToken: true,
    }
  },
  // Add other config values as needed
} 