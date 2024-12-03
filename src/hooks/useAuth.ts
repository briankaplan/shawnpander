import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { LoadingScreen } from '@/components/ui/LoadingSpinner'
import type { ComponentType, FC, ReactElement } from 'react'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  phone: string | null
  error: string | null
}

interface LoginCredentials {
  phone: string
  code: string
}

export function useAuth() {
  return {
    isAuthenticated: false,
    isLoading: false,
    login: async () => {
      console.log('Auth service coming soon')
    },
    logout: async () => {
      console.log('Auth service coming soon')
    }
  }
}

// Protected route wrapper
export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P> {
  const WithAuthComponent: FC<P> = (props): ReactElement | null => {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/admin')
      }
    }, [isLoading, isAuthenticated, router])

    if (isLoading) {
      return <LoadingScreen text="Checking authentication..." />
    }

    if (!isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  WithAuthComponent.displayName = `withAuth(${
    getDisplayName(WrappedComponent)
  })`

  return WithAuthComponent
}

// Helper function to get component display name
function getDisplayName(WrappedComponent: ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// Authentication context types
export interface AuthContextValue {
  isAuthenticated: boolean
  isLoading: boolean
  phone: string | null
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

// Helper function to format phone number
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^\d]/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  if (cleaned.length === 11) {
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

// Helper function to validate phone number
export function validatePhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[^\d+]/g, '')
  return /^\+?\d{10,11}$/.test(cleaned)
}

// Helper function to validate auth code
export function validateAuthCode(code: string): boolean {
  return code.length >= 6
}

// Helper function to clean phone number
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}