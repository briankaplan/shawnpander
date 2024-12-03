import { useEffect, useState } from 'react'
import { useConfig, type FeatureFlag } from '@/config'
import { featureCache } from '@/lib/cache/features'
import { trackFeatureUsage } from '@/lib/analytics/features'
import { experimentService } from '@/lib/experiments'
import { useSupabase } from '@/lib/supabase'
import { FeatureVariant } from '@/types/features'

export function useFeatureFlag(featureName: string): {
  enabled: boolean;
  variant?: FeatureVariant;
  loading: boolean;
} {
  const config = useConfig()
  const supabase = useSupabase()
  const [loading, setLoading] = useState(true)
  const [variant, setVariant] = useState<FeatureVariant>()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const userId = session?.user?.id

        // Check cache first
        const cached = featureCache.get(featureName)
        if (cached) {
          if (cached.isExperiment && userId) {
            const variant = await experimentService.assignVariant(
              cached.id,
              userId,
              cached.variantDistribution
            )
            setVariant(variant)
            setEnabled(cached.enabled && variant !== 'control')
          } else {
            setEnabled(cached.enabled)
          }
          trackFeatureUsage(cached)
          setLoading(false)
          return
        }

        // Fetch from Supabase if not cached
        const { data, error } = await supabase
          .from('features')
          .select('*')
          .eq('name', featureName)
          .single()

        if (error) throw error

        if (data) {
          featureCache.set(featureName, data)
          if (data.isExperiment && userId) {
            const variant = await experimentService.assignVariant(
              data.id,
              userId,
              data.variantDistribution
            )
            setVariant(variant)
            setEnabled(data.enabled && variant !== 'control')
          } else {
            setEnabled(data.enabled)
          }
          trackFeatureUsage(data)
        } else {
          setEnabled(config.FEATURES[featureName as keyof typeof config.FEATURES] ?? false)
        }
      } catch (error) {
        console.error(`Error fetching feature ${featureName}:`, error)
        setEnabled(config.FEATURES[featureName as keyof typeof config.FEATURES] ?? false)
      } finally {
        setLoading(false)
      }
    }

    fetchFeature()
  }, [featureName, supabase, config.FEATURES])

  return { enabled, variant, loading }
} 