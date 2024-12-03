import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

const supabaseUrl = 'https://nthsogplglnizgjacbqg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50aHNvZ3BsZ2xuaXpnamFjYnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwOTc2MTYsImV4cCI6MjA0ODY3MzYxNn0.5dh0swZxwaJ8Vby14CqWh1Y5_f_G6lIyaRmpwW2XsZY'

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

export function useSupabase() {
  return supabase
}

export type { User, Session } from '@supabase/supabase-js' 