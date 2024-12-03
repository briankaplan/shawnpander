'use client'

import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  children?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"

    // Variant styles
    const variantStyles = {
      primary: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500/50",
      secondary: "bg-zinc-800 hover:bg-zinc-700 text-white focus:ring-zinc-500/50",
      ghost: "bg-transparent hover:bg-zinc-800 text-white focus:ring-zinc-500/50",
      danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500/50"
    }

    // Size styles
    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    }

    // Width styles
    const widthStyles = fullWidth ? "w-full" : "w-auto"

    // Loading styles
    const loadingStyles = isLoading ? "cursor-wait" : ""

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          loadingStyles,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Compound Components
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'sm' | 'md' | 'lg'
}

export const ButtonGroup = ({
  orientation = 'horizontal',
  spacing = 'md',
  className,
  children,
  ...props
}: ButtonGroupProps) => {
  const spacingStyles = {
    sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    md: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
    lg: orientation === 'horizontal' ? 'space-x-6' : 'space-y-6'
  }

  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' && 'flex-col',
        spacingStyles[spacing],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

ButtonGroup.displayName = 'ButtonGroup'