'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/lib/supabase'
import { CONFIG } from '@/config'
import type { FeatureFlag, FeatureUpdate } from '@/types/features'

export default function FeatureManagement() {
  const supabase = useSupabase()
  const [features, setFeatures] = useState<FeatureFlag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .order('name')

      if (error) throw error
      setFeatures(data || [])
    } catch (error) {
      console.error('Error fetching features:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFeature = async (id: string, update: FeatureUpdate) => {
    try {
      const { error } = await supabase
        .from('features')
        .update({
          enabled: update.enabled,
          environment: update.environment,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', id)

      if (error) throw error
      await fetchFeatures()
    } catch (error) {
      console.error('Error updating feature:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Feature Management</h1>
      
      <div className="grid gap-6">
        {features.map((feature) => (
          <div key={feature.id} className="bg-neutral-800 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white">{feature.name}</h3>
                <p className="text-gray-400 mt-1">{feature.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={feature.environment}
                  onChange={(e) => updateFeature(feature.id, {
                    enabled: feature.enabled,
                    environment: e.target.value as FeatureFlag['environment'],
                  })}
                  className="bg-neutral-700 text-white rounded px-3 py-1"
                >
                  <option value="all">All Environments</option>
                  <option value="development">Development Only</option>
                  <option value="production">Production Only</option>
                </select>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={feature.enabled}
                    onChange={(e) => updateFeature(feature.id, {
                      enabled: e.target.checked,
                      environment: feature.environment,
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer 
                    peer-checked:after:translate-x-full peer-checked:bg-blue-600 
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all">
                  </div>
                </label>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Last updated: {new Date(feature.updatedAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 