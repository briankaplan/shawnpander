'use client'

import { Suspense } from 'react'
import { Navigation } from '@/components/Navigation'
import { MusicPlatformProvider } from '@/contexts/MusicPlatformContext'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MusicPlatformProvider>
        <div className="flex min-h-screen flex-col">
          <Navigation />
          {children}
        </div>
      </MusicPlatformProvider>
    </Suspense>
  )
} 