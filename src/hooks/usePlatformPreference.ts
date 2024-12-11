'use client'

import { useState, useEffect } from 'react'
import type { Platform } from '@/types/music'

export function usePlatformPreference() {
  const [platform, setPlatform] = useState<Platform>('spotify')

  useEffect(() => {
    const savedPlatform = localStorage.getItem('preferred_platform')
    if (savedPlatform === 'apple' || savedPlatform === 'spotify') {
      setPlatform(savedPlatform)
    }
  }, [])

  const savePlatform = (newPlatform: Platform) => {
    localStorage.setItem('preferred_platform', newPlatform)
    setPlatform(newPlatform)
  }

  return { platform, savePlatform }
} 