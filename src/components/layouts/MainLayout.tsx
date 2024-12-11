'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/sections/Hero'
import { MusicPlatformProvider } from '@/contexts/MusicPlatformContext'
import { ShowsProvider } from '@/contexts/ShowsContext'
import { Toaster } from 'sonner'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <MusicPlatformProvider>
      <ShowsProvider>
        <div className="min-h-screen flex flex-col bg-zinc-950">
          <Navigation />
          <Hero />
          {children}
          <Footer />
        </div>
        <Toaster position="top-right" theme="dark" />
      </ShowsProvider>
    </MusicPlatformProvider>
  )
} 