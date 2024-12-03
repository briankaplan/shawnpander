'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'text' | 'image'
  width?: string | number
  height?: string | number
  animate?: boolean
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({
    variant = 'default',
    width,
    height,
    animate = true,
    className,
    ...props
  }, ref) => {
    // Base styles
    const baseStyles = cn(
      "relative overflow-hidden",
      "bg-zinc-800/50",
      animate && "after:absolute after:inset-0",
      animate && "after:translate-x-[-100%]",
      animate && "after:animate-shimmer",
      animate && "after:bg-gradient-to-r",
      animate && "after:from-transparent after:via-zinc-700/10 after:to-transparent"
    )

    // Variant styles
    const variantStyles = {
      default: "rounded-lg",
      circular: "rounded-full",
      text: "rounded h-4 w-full",
      image: "rounded-lg aspect-video"
    }

    // Size styles
    const sizeStyles = {
      width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
      height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto'
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        style={sizeStyles}
        {...props}
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
            variant="image"
            height={imageHeight}
            className="w-full"
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