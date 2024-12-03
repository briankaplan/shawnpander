'use client'

import { useState, useEffect, useCallback } from 'react'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'
import { usePlayback } from './usePlayback'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export function useMusicAuth() {
  const { platform } = useMusicPlatform()
  const { initialize } = usePlayback()
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null
  })

  // Check auth status on mount and platform change
  useEffect(() => {
    checkAuth()
  }, [platform])

  const checkAuth = async () => {
    if (!platform) {
      setState({
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
      return
    }

    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const response = await fetch(`/api/${platform}/check-auth`)
      const data = await response.json()

      if (data.isAuthenticated) {
        await initialize(data.accessToken)
      }

      setState({
        isAuthenticated: data.isAuthenticated,
        isLoading: false,
        error: null
      })
    } catch (error) {
      setState({
        isAuthenticated: false,
        isLoading: false,
        error: 'Failed to check authentication status'
      })
    }
  }

  const connect = useCallback(async () => {
    if (!platform) return

    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const response = await fetch(`/api/${platform}/auth-url`)
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to start authentication'
      }))
    }
  }, [platform])

  const disconnect = useCallback(async () => {
    if (!platform) return

    setState(prev => ({ ...prev, isLoading: true }))

    try {
      await fetch(`/api/${platform}/logout`, { method: 'POST' })
      setState({
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to logout'
      }))
    }
  }, [platform])

  return {
    ...state,
    connect,
    disconnect
  }
} 