'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'default' | 'text' | 'circular' | 'rectangular'
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = '', variant = 'default' }, ref) => {
    const baseStyles = 'animate-pulse bg-gradient-to-r from-zinc-800 to-zinc-700'
    
    const variantStyles = {
      default: 'rounded',
      text: 'h-4 rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-none'
    }

    return (
      <div 
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)} 
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

// Text Skeleton
interface TextSkeletonProps extends Omit<SkeletonProps, 'variant'> {
  lines?: number
  lastLineWidth?: string | number
  spacing?: 'sm' | 'md' | 'lg'
}

export const TextSkeleton = forwardRef<HTMLDivElement, TextSkeletonProps>(
  ({
    lines = 3,
    lastLineWidth = '75%',
    spacing = 'md',
    className,
    ...props
  }, ref) => {
    const spacingStyles = {
      sm: 'space-y-1',
      md: 'space-y-2',
      lg: 'space-y-3'
    }

    return (
      <div ref={ref} className={cn(spacingStyles[spacing], className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            style={{
              width: index === lines - 1 ? lastLineWidth : '100%'
            }}
            {...props}
          />
        ))}
      </div>
    )
  }
)

TextSkeleton.displayName = 'TextSkeleton'

// Card Skeleton
interface CardSkeletonProps extends Omit<SkeletonProps, 'variant'> {
  hasImage?: boolean
  hasTitle?: boolean
  hasDescription?: boolean
  imageHeight?: string | number
}

export const CardSkeleton = forwardRef<HTMLDivElement, CardSkeletonProps>(
  ({
    hasImage = true,
    hasTitle = true,
    hasDescription = true,
    imageHeight = 200,
    className,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-4 rounded-xl border border-zinc-800 bg-zinc-900/50",
          "space-y-4",
          className
        )}
        {...props}
      >
        {hasImage && (
          <Skeleton
            variant="rectangular"
            style={{ height: imageHeight }}
            className="w-full rounded-lg"
          />
        )}
        {hasTitle && (
          <Skeleton
            variant="text"
            className="w-3/4 h-6"
          />
        )}
        {hasDescription && (
          <TextSkeleton
            lines={2}
            lastLineWidth="60%"
            spacing="sm"
          />
        )}
      </div>
    )
  }
)

CardSkeleton.displayName = 'CardSkeleton'

// List Skeleton
interface ListSkeletonProps extends Omit<SkeletonProps, 'variant'> {
  count?: number
  spacing?: 'sm' | 'md' | 'lg'
  itemHeight?: string | number
}

export const ListSkeleton = forwardRef<HTMLDivElement, ListSkeletonProps>(
  ({
    count = 5,
    spacing = 'md',
    itemHeight = 60,
    className,
    ...props
  }, ref) => {
    const spacingStyles = {
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6'
    }

    return (
      <div
        ref={ref}
        className={cn(spacingStyles[spacing], className)}
        {...props}
      >
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton
            key={index}
            variant="default"
            height={itemHeight}
          />
        ))}
      </div>
    )
  }
)

ListSkeleton.displayName = 'ListSkeleton'