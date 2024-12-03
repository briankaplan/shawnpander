'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline'
  isHoverable?: boolean
  isClickable?: boolean
  isActive?: boolean
  noPadding?: boolean
  children: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'default',
    isHoverable = false,
    isClickable = false,
    isActive = false,
    noPadding = false,
    className,
    children,
    ...props
  }, ref) => {
    // Base styles
    const baseStyles = cn(
      "rounded-xl overflow-hidden",
      "transition-all duration-200",
      !noPadding && "p-6",
      isClickable && "cursor-pointer",
      isHoverable && "hover:scale-102 active:scale-98"
    )

    // Variant styles
    const variantStyles = {
      default: cn(
        "bg-zinc-900/80 border border-zinc-800",
        isHoverable && "hover:bg-zinc-800/80",
        isActive && "bg-zinc-800/80"
      ),
      glass: cn(
        "backdrop-blur-sm bg-white/5 border border-white/10",
        isHoverable && "hover:bg-white/10",
        isActive && "bg-white/10"
      ),
      outline: cn(
        "border-2 border-zinc-800 bg-transparent",
        isHoverable && "hover:border-orange-500/50",
        isActive && "border-orange-500/50"
      )
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Compound Components
export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-1.5 mb-4", className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-white",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-white/60", className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center mt-4 pt-4 border-t border-zinc-800", className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

// Hover Card
interface HoverCardProps extends CardProps {
  hoverContent: React.ReactNode
  hoverDelay?: number
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  ({
    children,
    hoverContent,
    hoverDelay = 0.2,
    ...props
  }, ref) => {
    return (
      <div className="relative group">
        <Card ref={ref} {...props}>
          {children}
        </Card>
        <div
          style={{ transitionDelay: `${hoverDelay}s` }}
          className={cn(
            "absolute left-0 right-0 bottom-full mb-2",
            "opacity-0 translate-y-2",
            "group-hover:opacity-100 group-hover:translate-y-0",
            "transition-all duration-200",
            "pointer-events-none group-hover:pointer-events-auto"
          )}
        >
          <Card variant="glass" className="w-full">
            {hoverContent}
          </Card>
        </div>
      </div>
    )
  }
)

HoverCard.displayName = 'HoverCard'