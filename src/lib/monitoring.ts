type Metric = {
  name: string
  value: number
  tags?: Record<string, string>
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Metric[] = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  track(metric: Metric): void {
    this.metrics.push(metric)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Metric] ${metric.name}: ${metric.value}ms`, metric.tags)
    }
  }

  getMetrics(): Metric[] {
    return this.metrics
  }

  clearMetrics(): void {
    this.metrics = []
  }
}

export const monitor = PerformanceMonitor.getInstance()

export function withPerformance<T extends (...args: any[]) => any>(
  fn: T,
  name: string,
  tags?: Record<string, string>
): T {
  return (async (...args: Parameters<T>) => {
    const start = performance.now()
    try {
      return await fn(...args)
    } finally {
      const duration = performance.now() - start
      monitor.track({ name, value: duration, tags })
    }
  }) as T
} 