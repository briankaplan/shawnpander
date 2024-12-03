import '@/styles/globals.css'
import { Navigation } from '@/components/Navigation'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { MusicPlatformProvider } from '@/contexts/MusicPlatformContext'
import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-black text-white antialiased">
        <ErrorBoundary>
          <MusicPlatformProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation className="fixed top-0 left-0 right-0 z-50" />
              {children}
            </div>
          </MusicPlatformProvider>
        </ErrorBoundary>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}