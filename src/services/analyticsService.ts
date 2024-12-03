import { supabase } from '@/lib/supabase'

export const analyticsService = {
  async trackPlay(trackId: string, source: string) {
    await supabase.from('plays').insert({
      track_id: trackId,
      source,
      played_at: new Date().toISOString()
    })
  },

  async trackShare(trackId: string, platform: string) {
    await supabase.from('shares').insert({
      track_id: trackId,
      platform,
      shared_at: new Date().toISOString()
    })
  },

  async getAnalytics(period: 'day' | 'week' | 'month' = 'week') {
    const { data } = await supabase
      .rpc('get_track_analytics', { period_param: period })
      .select('*')

    return data
  }
} 