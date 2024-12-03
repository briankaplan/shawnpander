'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/lib/supabase'
import { FeatureFlag } from '@/types/features'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function FeatureAnalytics() {
  const supabase = useSupabase()
  const [analytics, setAnalytics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('feature_events')
        .select(`
          feature_name,
          enabled,
          environment,
          count
        `)
        .select('*')

      if (error) throw error
      setAnalytics(data || [])
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Feature Analytics</h1>
      
      <div className="bg-neutral-800 rounded-lg p-6">
        <BarChart width={800} height={400} data={analytics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="feature_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  )
} 