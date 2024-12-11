'use client'

import { useState } from 'react'
import { monitor } from '@/lib/monitoring'

export function DevTools() {
  const [isOpen, setIsOpen] = useState(false)
  const metrics = monitor.getMetrics()

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
      >
        DevTools
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-96 bg-black/90 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Performance Metrics</h3>
          <div className="space-y-2">
            {metrics.map((metric, i) => (
              <div key={i} className="text-sm">
                <span className="text-orange-500">{metric.name}:</span>
                <span className="ml-2">{metric.value.toFixed(2)}ms</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 