'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  size?: 'default' | 'sm' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  className?: string
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, href, size = 'default', variant = 'default', children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50"
    
    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-12 px-8 text-lg"
    }
    
    const variantStyles = {
      default: "bg-orange-500 text-white hover:bg-orange-600",
      outline: "border border-orange-500 text-orange-500 hover:bg-orange-500/10",
      ghost: "text-orange-500 hover:bg-orange-500/10"
    }

    const styles = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    )

    if (href) {
      return (
        <Link href={href} className={styles}>
          {children}
        </Link>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={styles}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }