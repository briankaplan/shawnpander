'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'

export function useLoadingState(errorMessage = 'An error occurred') {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const withLoading = useCallback(async <T>(promise: Promise<T>): Promise<T | null> => {
    try {
      setIsLoading(true)
      setError(null)
      return await promise
    } catch (e) {
      const error = e instanceof Error ? e : new Error(errorMessage)
      setError(error)
      toast.error(error.message)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [errorMessage])

  return { isLoading, error, withLoading }
} 