import { useState, useEffect } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'
import { userService, type UserProfile } from '@/services/userService'

export function useUserProfile() {
  const { user } = useSupabase()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    async function loadProfile() {
      try {
        const data = await userService.getProfile(user.id)
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return

    try {
      const updated = await userService.updateProfile(user.id, updates)
      setProfile(updated)
      return updated
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
      throw err
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile
  }
} 