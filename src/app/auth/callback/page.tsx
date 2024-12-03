'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { AUTH_CONFIG } from '@/config/auth'

export default function AuthCallback() {
  const router = useRouter()
  const supabase = useSupabaseClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error during auth callback:', error)
          router.push(`${AUTH_CONFIG.REDIRECT_PATHS.onError}?message=${encodeURIComponent(error.message)}`)
          return
        }

        // Redirect back to the music section
        router.push(AUTH_CONFIG.REDIRECT_PATHS.afterLogin)
      } catch (error) {
        console.error('Unexpected error during auth callback:', error)
        router.push(AUTH_CONFIG.REDIRECT_PATHS.onError)
      }
    }

    handleAuthCallback()
  }, [router, supabase.auth])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Authenticating...</h2>
        <p className="text-gray-400">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  )
} 