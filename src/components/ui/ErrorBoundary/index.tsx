'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'

export function MusicErrorHandler() {
  const { error } = useMusicPlatform()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return null
} 