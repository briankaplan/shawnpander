'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { logError } from '@/lib/errorHandler'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl font-bold text-white">Something went wrong</h1>
            <p className="text-orange-400">
              {this.state.error?.message || "We're working on fixing the issue."}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                Try again
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors"
              >
                Go home
              </a>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
} 