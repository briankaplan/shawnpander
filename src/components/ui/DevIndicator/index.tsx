'use client'

export function DevIndicator() {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-4 right-4 px-2 py-1 bg-orange-500 text-white text-xs rounded-full opacity-50">
      DEV
    </div>
  )
} 