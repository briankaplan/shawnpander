type ErrorInfo = {
  error: Error
  errorInfo?: React.ErrorInfo
  context?: string
}

export function logError({ error, errorInfo, context }: ErrorInfo) {
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    context
  })

  // In development, show more details
  if (process.env.NODE_ENV === 'development') {
    console.error('Full error:', error)
    console.error('Component stack:', errorInfo?.componentStack)
  }
} 