import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { CONFIG } from '@/config'

interface SpotifyAuthState {
  user: User | null
  spotifyToken: string | null
  loading: boolean
  error: Error | null
}

export function useSpotifyAuth() {
  const [authState, setAuthState] = useState<SpotifyAuthState>({
    user: null,
    spotifyToken: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    checkAuth()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState(prev => ({
        ...prev,
        user: session?.user ?? null,
        spotifyToken: session?.provider_token ?? null,
        loading: false,
      }))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      setAuthState({
        user: session?.user ?? null,
        spotifyToken: session?.provider_token ?? null,
        loading: false,
        error: null,
      })
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error as Error,
        loading: false,
      }))
    }
  }

  const login = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
          scopes: CONFIG.SPOTIFY.SCOPES.join(' '),
          redirectTo: CONFIG.SPOTIFY.REDIRECT_URI,
        }
      })

      if (error) throw error
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error as Error
      }))
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setAuthState({
        user: null,
        spotifyToken: null,
        loading: false,
        error: null,
      })
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error as Error
      }))
    }
  }

  return {
    user: authState.user,
    spotifyToken: authState.spotifyToken,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    login,
    logout,
  }
} 