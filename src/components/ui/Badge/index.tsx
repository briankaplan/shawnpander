'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'solid'
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  isAnimated?: boolean
  withDot?: boolean
  asChild?: boolean
  children: React.ReactNode
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    variant = 'default',
    size = 'md',
    color = 'default',
    isAnimated = false,
    withDot = false,
    className,
    children,
    ...props
  }, ref) => {
    // Base styles
    const baseStyles = cn(
      "inline-flex items-center justify-center",
      "font-medium transition-all duration-200",
      "rounded-full"
    )

    // Size styles
    const sizeStyles = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-sm",
      lg: "px-3 py-1 text-base"
    }

    // Color styles
    const colorStyles = {
      default: {
        default: "bg-zinc-900 text-white border border-zinc-800",
        outline: "border border-zinc-800 text-white",
        solid: "bg-zinc-200 text-zinc-900"
      },
      primary: {
        default: "bg-orange-500/20 text-orange-500 border border-orange-500/20",
        outline: "border border-orange-500 text-orange-500",
        solid: "bg-orange-500 text-white"
      },
      success: {
        default: "bg-green-500/20 text-green-500 border border-green-500/20",
        outline: "border border-green-500 text-green-500",
        solid: "bg-green-500 text-white"
      },
      warning: {
        default: "bg-yellow-500/20 text-yellow-500 border border-yellow-500/20",
        outline: "border border-yellow-500 text-yellow-500",
        solid: "bg-yellow-500 text-white"
      },
      danger: {
        default: "bg-red-500/20 text-red-500 border border-red-500/20",
        outline: "border border-red-500 text-red-500",
        solid: "bg-red-500 text-white"
      },
      info: {
        default: "bg-blue-500/20 text-blue-500 border border-blue-500/20",
        outline: "border border-blue-500 text-blue-500",
        solid: "bg-blue-500 text-white"
      }
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          colorStyles[color][variant],
          isAnimated && "animate-pulse-slow",
          className
        )}
        {...props}
      >
        {withDot && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full mr-1.5",
              {
                'bg-zinc-400': color === 'default',
                'bg-orange-500': color === 'primary',
                'bg-green-500': color === 'success',
                'bg-yellow-500': color === 'warning',
                'bg-red-500': color === 'danger',
                'bg-blue-500': color === 'info'
              }
            )}
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// Link Badge
interface LinkBadgeProps extends BadgeProps {
  href: string
  external?: boolean
}

export const LinkBadge = forwardRef<HTMLAnchorElement, LinkBadgeProps>(
  ({ href, external = false, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        {...(external && {
          target: "_blank",
          rel: "noopener noreferrer"
        })}
        className={cn(
          "inline-block",
          "transition-transform duration-200",
          "hover:scale-105 active:scale-95"
        )}
      >
        <Badge {...props} />
      </a>
    )
  }
)

LinkBadge.displayName = 'LinkBadge'

// Group Badge
interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'sm' | 'md' | 'lg'
}

export const BadgeGroup = forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ spacing = 'md', className, ...props }, ref) => {
    const spacingStyles = {
      sm: 'space-x-1',
      md: 'space-x-2',
      lg: 'space-x-3'
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center flex-wrap", spacingStyles[spacing], className)}
        {...props}
      />
    )
  }
)

BadgeGroup.displayName = 'BadgeGroup'