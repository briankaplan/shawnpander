'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect back to tips page after 5 seconds
    const timeout = setTimeout(() => {
      router.push('/tips')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-orange-900/10 to-black flex items-center justify-center px-4">
      <div
        className={cn(
          "max-w-lg w-full text-center space-y-6 p-8 rounded-2xl",
          "bg-zinc-900/50 backdrop-blur-lg border border-zinc-800",
          "opacity-0 scale-95 animate-fade-in"
        )}
      >
        <div
          className={cn(
            "w-20 h-20 mx-auto bg-green-500 rounded-full",
            "flex items-center justify-center",
            "scale-0 animate-scale-in",
            "animation-delay-200"
          )}
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1
          className={cn(
            "text-4xl font-bold text-white",
            "opacity-0 translate-y-4 animate-fade-in",
            "animation-delay-400"
          )}
        >
          Thank You!
        </h1>

        <p
          className={cn(
            "text-xl text-zinc-400",
            "opacity-0 translate-y-4 animate-fade-in",
            "animation-delay-600"
          )}
        >
          Your tip has been received and is greatly appreciated.
        </p>

        <div
          className={cn(
            "text-zinc-500",
            "opacity-0 animate-fade-in",
            "animation-delay-800"
          )}
        >
          Redirecting you back in a few seconds...
        </div>

        <button
          onClick={() => router.push('/tips')}
          className={cn(
            "inline-flex items-center px-6 py-3 text-lg font-medium",
            "text-white bg-orange-600 hover:bg-orange-700 rounded-lg",
            "transition-all duration-200",
            "hover:scale-105 active:scale-95",
            "opacity-0 translate-y-4 animate-fade-in",
            "animation-delay-1000"
          )}
        >
          Return to Tips Page
        </button>
      </div>
    </div>
  )
}