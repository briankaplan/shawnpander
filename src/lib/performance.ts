export function measurePerformance(name: string) {
  if (process.env.NODE_ENV === 'development') {
    performance.mark(`${name}-start`)
    
    return () => {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      const measure = performance.getEntriesByName(name)[0]
      console.log(`${name} took ${measure.duration.toFixed(2)}ms`)
    }
  }
  
  return () => {}
} 