'use client'

import { useEffect, useState, useRef } from 'react'
import { useNfcAndPwa } from '@/hooks/useNfcAndPwa'

interface PwaProviderProps {
  children: React.ReactNode
}

type AppleIconSize = '152' | '167' | '180'
const ICON_SIZES: AppleIconSize[] = ['152', '167', '180']

export function PwaProvider({ children }: PwaProviderProps) {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [isStandalone, setIsStandalone] = useState(false)
  const linksRef = useRef<HTMLLinkElement[]>([])

  const {
    pushSupported,
    pushSubscription,
    subscribeToPush,
    unsubscribeFromPush,
  } = useNfcAndPwa({
    onPushSubscriptionChange: async (subscription) => {
      if (subscription) {
        // Send subscription to backend
        await fetch('/api/push', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscription,
            type: 'welcome',
          }),
        })
      }
    },
  })

  useEffect(() => {
    // Handle PWA installation
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    })

    // Check if running as standalone PWA
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

    // Handle online/offline status
    const handleOnlineStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', handleOnlineStatus)
    window.addEventListener('offline', handleOnlineStatus)

    // Add manifest and theme color meta tags
    const manifestLink = document.createElement('link')
    manifestLink.rel = 'manifest'
    manifestLink.href = '/manifest.json'
    document.head.appendChild(manifestLink)

    const themeColor = document.createElement('meta')
    themeColor.name = 'theme-color'
    themeColor.content = '#ea580c'
    document.head.appendChild(themeColor)

    const viewport = document.createElement('meta')
    viewport.name = 'viewport'
    viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    document.head.appendChild(viewport)

    const appleMobileWebAppCapable = document.createElement('meta')
    appleMobileWebAppCapable.name = 'apple-mobile-web-app-capable'
    appleMobileWebAppCapable.content = 'yes'
    document.head.appendChild(appleMobileWebAppCapable)

    const appleMobileWebAppStatusBar = document.createElement('meta')
    appleMobileWebAppStatusBar.name = 'apple-mobile-web-app-status-bar-style'
    appleMobileWebAppStatusBar.content = 'black-translucent'
    document.head.appendChild(appleMobileWebAppStatusBar)

    // Add Apple touch icons
    const links = ICON_SIZES.map(size => {
      const link = document.createElement('link')
      link.rel = 'apple-touch-icon'
      link.setAttribute('sizes', `${size}x${size}`)
      link.href = `/icons/apple-icon-${size}x${size}.png`
      document.head.appendChild(link)
      return link
    })

    linksRef.current = links

    return () => {
      window.removeEventListener('online', handleOnlineStatus)
      window.removeEventListener('offline', handleOnlineStatus)
      document.head.removeChild(manifestLink)
      document.head.removeChild(themeColor)
      document.head.removeChild(viewport)
      document.head.removeChild(appleMobileWebAppCapable)
      document.head.removeChild(appleMobileWebAppStatusBar)
      linksRef.current.forEach(link => {
        if (link.parentNode) {
          document.head.removeChild(link)
        }
      })
    }
  }, [])

  // Handle offline UI
  if (!isOnline) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="bg-zinc-900 p-6 rounded-lg max-w-md w-full mx-4 text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">You're Offline</h2>
          <p className="text-zinc-400">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {children}
      
      {installPrompt && !isStandalone && (
        <button
          onClick={async () => {
            if (installPrompt) {
              await installPrompt.prompt()
              setInstallPrompt(null)
            }
          }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m0 0l-4-4m4 4l4-4"
            />
          </svg>
          <span>Install App</span>
        </button>
      )}
    </>
  )
}