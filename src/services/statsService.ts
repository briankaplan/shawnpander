import { supabase } from '@/lib/supabase'

interface PlayStats {
  totalPlays: number
  spotifyPlays: number
  applePlays: number
  lastUpdated: Date
}

export class StatsService {
  async trackPlay(trackId: string, platform: 'spotify' | 'apple') {
    const { error: playError } = await supabase
      .from('plays')
      .insert({
        track_id: trackId,
        platform,
        played_at: new Date().toISOString()
      })

    if (playError) {
      console.error('Error tracking play:', playError)
      return
    }

    // Update stats
    const { error: statsError } = await supabase.rpc('increment_play_count', {
      p_track_id: trackId,
      p_platform: platform
    })

    if (statsError) {
      console.error('Error updating stats:', statsError)
    }
  }

  async getTrackStats(trackId: string): Promise<PlayStats | null> {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .eq('track_id', trackId)
      .single()

    if (error) {
      console.error('Error fetching stats:', error)
      return null
    }

    return {
      totalPlays: data.total_plays,
      spotifyPlays: data.spotify_plays,
      applePlays: data.apple_plays,
      lastUpdated: new Date(data.last_updated)
    }
  }

  async getTopTracks(limit = 10): Promise<string[]> {
    const { data, error } = await supabase
      .from('stats')
      .select('track_id, total_plays')
      .order('total_plays', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching top tracks:', error)
      return []
    }

    return data.map(stat => stat.track_id)
  }
} 