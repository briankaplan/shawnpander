'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class DevErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-500/10 rounded-lg">
          <h2 className="text-red-500 font-bold">Something went wrong</h2>
          <pre className="mt-2 text-sm text-red-400 overflow-auto">
            {this.state.error?.toString()}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
} 