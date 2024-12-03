import { useState, useEffect, useCallback } from 'react'
import { tokenService } from '@/services/tokenService'
import type { TokenInfo } from '@/services/tokenService'

export function useSpotifyToken() {
  const [token, setToken] = useState<TokenInfo | null>(tokenService.getTokenInfo())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkToken = async () => {
      const isHealthy = await tokenService.checkTokenHealth()
      if (!isHealthy) {
        tokenService.clearToken()
        setToken(null)
      }
    }

    checkToken()
  }, [])

  const getToken = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const validToken = await tokenService.getValidToken()
      if (!validToken) {
        throw new Error('No valid token available')
      }
      return validToken
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get token')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const revokeToken = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      await tokenService.revokeToken()
      setToken(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke token')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getMetrics = useCallback(() => {
    return tokenService.getTokenMetrics()
  }, [])

  return {
    token,
    isLoading,
    error,
    getToken,
    revokeToken,
    getMetrics,
    isAuthenticated: tokenService.isAuthenticated(),
    hasScope: tokenService.hasScope.bind(tokenService),
  }
} 