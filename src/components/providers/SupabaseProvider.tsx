'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import type { Database } from '@/types/supabase'

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() =>
    createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  return children
} 