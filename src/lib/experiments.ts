import { supabase } from '@/lib/supabase'
import { FeatureFlag, FeatureVariant, ExperimentResult } from '@/types/features'

export class ExperimentService {
  private static instance: ExperimentService
  private userVariants: Map<string, Map<string, FeatureVariant>> = new Map()

  private constructor() {}

  static getInstance(): ExperimentService {
    if (!ExperimentService.instance) {
      ExperimentService.instance = new ExperimentService()
    }
    return ExperimentService.instance
  }

  async assignVariant(
    featureId: string,
    userId: string,
    distribution: FeatureFlag['variantDistribution']
  ): Promise<FeatureVariant> {
    // Check if user already has a variant assigned
    const userFeatures = this.userVariants.get(userId)
    if (userFeatures?.has(featureId)) {
      return userFeatures.get(featureId)!
    }

    // Assign variant based on distribution
    const random = Math.random()
    let variant: FeatureVariant
    
    if (random < distribution!.A) {
      variant = 'A'
    } else if (random < distribution!.A + distribution!.B) {
      variant = 'B'
    } else {
      variant = 'control'
    }

    // Store assignment
    if (!this.userVariants.has(userId)) {
      this.userVariants.set(userId, new Map())
    }
    this.userVariants.get(userId)!.set(featureId, variant)

    // Record assignment in database
    await supabase.from('experiment_results').insert({
      feature_id: featureId,
      user_id: userId,
      variant,
    })

    return variant
  }

  async trackConversion(featureId: string, userId: string): Promise<void> {
    await supabase
      .from('experiment_results')
      .update({ converted: true })
      .match({ feature_id: featureId, user_id: userId })
  }

  async getResults(featureId: string): Promise<ExperimentResult[]> {
    const { data: results, error } = await supabase
      .from('experiment_results')
      .select('variant, converted')
      .eq('feature_id', featureId)

    if (error) throw error

    const variants: FeatureVariant[] = ['A', 'B', 'control']
    return variants.map(variant => {
      const variantResults = results.filter(r => r.variant === variant)
      const conversions = variantResults.filter(r => r.converted).length
      const sampleSize = variantResults.length

      return {
        variant,
        conversionRate: sampleSize > 0 ? conversions / sampleSize : 0,
        sampleSize,
        confidence: this.calculateConfidence(conversions, sampleSize),
      }
    })
  }

  private calculateConfidence(conversions: number, sampleSize: number): number {
    // Simple z-score calculation for confidence
    if (sampleSize < 30) return 0
    const p = conversions / sampleSize
    const standardError = Math.sqrt((p * (1 - p)) / sampleSize)
    return 1 - (2 * (1 - this.normalCDF(Math.abs((p - 0.5) / standardError))))
  }

  private normalCDF(x: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(x))
    const d = 0.3989423 * Math.exp(-x * x / 2)
    const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
    return x > 0 ? 1 - probability : probability
  }
}

export const experimentService = ExperimentService.getInstance() 