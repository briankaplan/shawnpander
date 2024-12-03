import { supabase } from '@/lib/supabase'

export interface UserProfile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  spotify_id: string | null
  preferences: {
    theme: 'light' | 'dark'
    autoplay: boolean
    showLyrics: boolean
    volume: number
  }
  created_at: string
  updated_at: string
}

export const userService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data as UserProfile
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data as UserProfile
  },

  async getRecentlyPlayed(userId: string) {
    const { data, error } = await supabase
      .from('play_history')
      .select('*')
      .eq('user_id', userId)
      .order('played_at', { ascending: false })
      .limit(20)

    if (error) throw error
    return data
  },

  async addToPlayHistory(userId: string, trackId: string) {
    const { error } = await supabase
      .from('play_history')
      .insert({
        user_id: userId,
        track_id: trackId,
        played_at: new Date().toISOString()
      })

    if (error) throw error
  },

  async getFavorites(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error
    return data
  },

  async toggleFavorite(userId: string, trackId: string) {
    const { data: existing } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('track_id', trackId)
      .single()

    if (existing) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('track_id', trackId)

      if (error) throw error
      return false // Not favorited
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: userId,
          track_id: trackId
        })

      if (error) throw error
      return true // Favorited
    }
  }
} 