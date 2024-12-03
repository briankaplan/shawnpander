'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface AuthProviderProps {
  children: React.ReactNode
  requireSpotify?: boolean
  requireAdmin?: boolean
}

export function AuthProvider({ children, requireSpotify = false, requireAdmin = false }: AuthProviderProps) {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useAuth()

  useEffect(() => {
    if (requireAdmin && !isAdmin) {
      router.push('/error?message=Unauthorized')
      return
    }

    if (requireSpotify && !isAuthenticated) {
      router.push('/api/spotify/auth')
      return
    }
  }, [requireSpotify, requireAdmin, isAuthenticated, isAdmin, router])

  // If authentication is required but user is not authenticated, show nothing
  if ((requireSpotify && !isAuthenticated) || (requireAdmin && !isAdmin)) {
    return null
  }

  return <>{children}</>
}

// HOC to wrap protected pages
export function withAuth(Component: React.ComponentType<any>, options: { requireSpotify?: boolean; requireAdmin?: boolean } = {}) {
  return function ProtectedPage(props: any) {
    return (
      <AuthProvider requireSpotify={options.requireSpotify} requireAdmin={options.requireAdmin}>
        <Component {...props} />
      </AuthProvider>
    )
  }
}