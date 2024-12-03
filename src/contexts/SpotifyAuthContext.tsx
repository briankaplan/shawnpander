'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { tokenService, type TokenInfo } from '@/services/tokenService'

interface SpotifyAuthContextType {
  token: TokenInfo | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  error: string | null
  clearError: () => void
  getValidToken: () => Promise<string | null>
}

const SpotifyAuthContext = createContext<SpotifyAuthContextType | undefined>(undefined)

export function SpotifyAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<TokenInfo | null>(tokenService.getTokenInfo())
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check URL for errors or tokens
    const urlParams = new URLSearchParams(window.location.search)
    const errorParam = urlParams.get('error')
    if (errorParam) {
      setError(errorParam)
      window.history.replaceState({}, '', window.location.pathname)
    }

    // Check for token in URL hash
    const hash = window.location.hash
    if (hash) {
      tokenService.setTokenFromHash(hash).then(newToken => {
        if (newToken) {
          setToken(newToken)
        }
        window.history.replaceState({}, '', window.location.pathname)
      })
    }
  }, [])

  const login = () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
      if (!clientId) throw new Error('Spotify client ID is not configured')

      const redirectUri = `${window.location.origin}/api/auth/callback/spotify`
      const scope = 'streaming user-read-email user-read-private user-library-read'
      
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope,
        redirect_uri: redirectUri,
        show_dialog: 'true'
      })

      window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize Spotify login')
    }
  }

  const logout = () => {
    tokenService.clearToken()
    setToken(null)
  }

  const clearError = () => setError(null)

  const getValidToken = async () => {
    try {
      const validToken = await tokenService.getValidToken()
      if (!validToken) {
        logout()
      }
      return validToken
    } catch (error) {
      console.error('Failed to get valid token:', error)
      logout()
      return null
    }
  }

  return (
    <SpotifyAuthContext.Provider value={{
      token,
      isAuthenticated: tokenService.isAuthenticated(),
      login,
      logout,
      error,
      clearError,
      getValidToken
    }}>
      {children}
    </SpotifyAuthContext.Provider>
  )
}

export function useSpotifyAuth() {
  const context = useContext(SpotifyAuthContext)
  if (context === undefined) {
    throw new Error('useSpotifyAuth must be used within a SpotifyAuthProvider')
  }
  return context
} 