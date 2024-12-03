'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: React.ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
  offset?: number
  children: React.ReactNode
  className?: string
  maxWidth?: number
  showArrow?: boolean
}

export function Tooltip({
  content,
  position = 'top',
  delay = 0.2,
  offset = 8,
  children,
  className,
  maxWidth = 200,
  showArrow = true
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Mount/Unmount logic
  useEffect(() => {
    if (isVisible) {
      setMounted(true)
    } else {
      const timer = setTimeout(() => setMounted(false), 200) // Match animation duration
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  // Arrow position styles
  const arrowStyles = {
    top: "bottom-[-4px] left-1/2 transform -translate-x-1/2 rotate-45",
    right: "left-[-4px] top-1/2 transform -translate-y-1/2 rotate-45",
    bottom: "top-[-4px] left-1/2 transform -translate-x-1/2 rotate-45",
    left: "right-[-4px] top-1/2 transform -translate-y-1/2 rotate-45"
  }

  // Container position styles
  const containerStyles = {
    top: `-${offset}px top-0 left-1/2 transform -translate-x-1/2 -translate-y-full`,
    right: `${offset}px top-1/2 right-0 transform translate-x-full -translate-y-1/2`,
    bottom: `${offset}px bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full`,
    left: `-${offset}px top-1/2 left-0 transform -translate-x-full -translate-y-1/2`
  }

  // Animation classes based on position
  const animationClasses = {
    top: "animate-tooltip-top",
    right: "animate-tooltip-right",
    bottom: "animate-tooltip-bottom",
    left: "animate-tooltip-left"
  }

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  // Update position when content changes
  useEffect(() => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      setCoords({
        x: triggerRect.left + window.scrollX,
        y: triggerRect.top + window.scrollY
      })
    }
  }, [content, position])

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
      role="tooltip"
      aria-describedby="tooltip"
    >
      {children}
      {mounted && (
        <div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          className={cn(
            "fixed z-50",
            "pointer-events-none",
            containerStyles[position],
            "transition-all duration-200",
            isVisible ? "opacity-100" : "opacity-0",
            isVisible && animationClasses[position]
          )}
          style={{ maxWidth }}
        >
          <div
            className={cn(
              "relative",
              "bg-zinc-900 text-white",
              "px-3 py-2 rounded-lg",
              "border border-zinc-800",
              "shadow-lg shadow-black/20",
              "text-sm",
              className
            )}
          >
            {content}
            {showArrow && (
              <div
                className={cn(
                  "absolute w-2 h-2",
                  "bg-zinc-900",
                  "border-zinc-800",
                  arrowStyles[position],
                  position === 'top' && "border-r border-b",
                  position === 'right' && "border-l border-b",
                  position === 'bottom' && "border-l border-t",
                  position === 'left' && "border-t border-r"
                )}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Rich Tooltip
type RichTooltipProps = Omit<TooltipProps, 'content'> & {
  title?: string
  description?: string
  icon?: React.ReactNode
}

export function RichTooltip({
  title,
  description,
  icon,
  ...props
}: RichTooltipProps) {
  const richContent = (
    <div className="space-y-1">
      {icon && <div className="text-orange-500 mb-2">{icon}</div>}
      {title && <div className="font-medium">{title}</div>}
      {description && <div className="text-white/70 text-xs">{description}</div>}
    </div>
  )

  return <Tooltip {...props} content={richContent} />
}