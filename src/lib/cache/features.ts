import { FeatureFlag } from '@/types/features'

class FeatureCache {
  private cache: Map<string, { value: FeatureFlag; timestamp: number }> = new Map()
  private readonly TTL = 5 * 60 * 1000 // 5 minutes

  set(key: string, value: FeatureFlag): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    })
  }

  get(key: string): FeatureFlag | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key)
      return null
    }

    return cached.value
  }

  clear(): void {
    this.cache.clear()
  }
}

export const featureCache = new FeatureCache() 