type CacheEntry<T> = {
  data: T
  timestamp: number
  error?: string
}

export class Cache {
  private static instance: Cache
  private store: Map<string, CacheEntry<any>>
  private readonly TTL: number = 1000 * 60 * 5 // 5 minutes
  private readonly STALE_TTL: number = 1000 * 60 * 30 // 30 minutes

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }
    return Cache.instance
  }

  set<T>(key: string, data: T, ttl?: number): void {
    this.store.set(key, {
      data,
      timestamp: Date.now() + (ttl || this.TTL)
    })
  }

  get<T>(key: string, options: { allowStale?: boolean } = {}): T | null {
    const entry = this.store.get(key)
    if (!entry) return null

    const now = Date.now()
    const isStale = now > entry.timestamp
    const isExpired = now > entry.timestamp + this.STALE_TTL

    if (isExpired || (!options.allowStale && isStale)) {
      this.store.delete(key)
      return null
    }

    return entry.data
  }

  setError(key: string, error: Error): void {
    const existing = this.store.get(key)
    this.store.set(key, {
      ...existing,
      error: error.message,
      timestamp: Date.now() + 1000 * 60 // Cache errors for 1 minute
    })
  }

  getError(key: string): string | undefined {
    return this.store.get(key)?.error
  }
}

export const cache = Cache.getInstance() 