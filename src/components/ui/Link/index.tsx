'use client'

import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { cn } from '@/lib/utils'

interface LinkComponentProps {
  href: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function LinkComponent({ 
  href, 
  className, 
  children,
  onClick 
}: LinkComponentProps) {
  return (
    <NextLink 
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors",
        className
      )}
      onClick={onClick}
    >
      <motion.div
        className="inline-flex items-center gap-2"
        whileHover={{ x: -5 }}
      >
        {children}
      </motion.div>
    </NextLink>
  )
} 