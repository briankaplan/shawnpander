'use client'

import { useCallback, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max: number
  onChange?: (value: number) => void
  className?: string
  barClassName?: string
}

export function Progress({ 
  value, 
  max, 
  onChange, 
  className = '', 
  barClassName = '' 
}: ProgressProps) {
  const [mounted, setMounted] = useState(false)
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setMounted(true)
    setInternalValue(value)
  }, [value])

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!onChange || !mounted) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const percent = (x / rect.width) * max
    const newValue = Math.max(0, Math.min(max, percent))
    setInternalValue(newValue)
    onChange(newValue)
  }, [max, onChange, mounted])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div 
        className={cn(
          "relative w-full h-2 rounded-full",
          className
        )}
      >
        <div className={cn("absolute left-0 top-0 h-full rounded-full", barClassName)} />
      </div>
    )
  }

  const percentage = (internalValue / max) * 100

  return (
    <div 
      className={cn(
        "relative w-full h-2 rounded-full cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div 
        className={cn(
          "absolute left-0 top-0 h-full rounded-full",
          "transition-[width] duration-100 ease-in-out",
          barClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}