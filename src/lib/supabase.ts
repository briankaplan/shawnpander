import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Check .env file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function useSupabase() {
  return supabase
}

export type { User, Session } from '@supabase/supabase-js' 