import { useState, useEffect } from 'react'
import type { DynamicContent, UseDynamicContentOptions } from '@/types'

export function useDynamicContent({ type, initialData }: UseDynamicContentOptions) {
  const [content, setContent] = useState<DynamicContent | null>(initialData || null)
  const [isLoading, setIsLoading] = useState(!initialData)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/content?type=${type}`)
        if (!response.ok) {
          throw new Error('Failed to fetch content')
        }
        const data = await response.json()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setIsLoading(false)
      }
    }

    if (!initialData) {
      fetchContent()
    }
  }, [type, initialData])

  return {
    content,
    isLoading,
    error,
  }
}