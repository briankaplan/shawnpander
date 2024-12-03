import { supabase } from '@/lib/supabase'
import { FeatureFlag } from '@/types/features'

interface FeatureEvent {
  featureId: string;
  featureName: string;
  enabled: boolean;
  environment: string;
  userId?: string;
  sessionId: string;
  timestamp: string;
}

export async function trackFeatureUsage(feature: FeatureFlag, used: boolean = true) {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const sessionId = session?.access_token || 'anonymous'

    const event: FeatureEvent = {
      featureId: feature.id,
      featureName: feature.name,
      enabled: feature.enabled,
      environment: feature.environment,
      userId: session?.user?.id,
      sessionId,
      timestamp: new Date().toISOString(),
    }

    await supabase.from('feature_events').insert(event)
  } catch (error) {
    console.error('Error tracking feature usage:', error)
  }
} 