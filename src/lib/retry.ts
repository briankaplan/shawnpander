interface RetryOptions {
  maxAttempts?: number
  delay?: number
  backoff?: number
  onError?: (error: Error, attempt: number) => void
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoff = 2,
    onError = (error: Error, attempt: number) => {
      console.error(`Attempt ${attempt} failed:`, error)
    }
  } = options

  let lastError: Error | null = null
  let currentDelay = delay

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      onError(lastError, attempt)
      if (attempt === maxAttempts) break
      
      await new Promise(resolve => setTimeout(resolve, currentDelay))
      currentDelay *= backoff
    }
  }

  throw lastError
} 