'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error?.message || 'Unknown error')
  }, [error])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl font-bold text-white">Something went wrong</h1>
        <p className="text-orange-400">{error?.message || "We're working on fixing the issue."}</p>
        <div className="flex gap-4">
          <button
            onClick={reset}
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