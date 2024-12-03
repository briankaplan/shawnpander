'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { streamingPlatforms, type ServiceType } from '@/services/streamingService'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { haptics } from '@/utils/haptics'
import { useGesture } from '@/hooks/useGesture'

interface StreamingLinksProps {
  links: Record<ServiceType, string>
  className?: string
  showLabels?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'pill' | 'glass' | 'solid' | 'floating'
  layout?: 'row' | 'grid' | 'compact' | 'stack' | 'float'
  loading?: boolean
  error?: string
  theme?: 'dark' | 'light'
  showTooltips?: boolean
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down' | null) => void
  enableHaptics?: boolean
}

const sizes = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg'
}

const variants = {
  default: "bg-black/30 backdrop-blur-sm border border-white/10 hover:border-white/20",
  minimal: "bg-transparent hover:bg-white/5",
  pill: "bg-white/5 hover:bg-white/10 shadow-lg",
  glass: "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20",
  solid: "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800"
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

const layouts = {
  row: "flex flex-wrap gap-4",
  grid: "grid grid-cols-2 sm:grid-cols-3 gap-4",
  compact: "flex flex-col sm:flex-row gap-2 sm:gap-4",
  stack: "flex flex-col gap-2",
  float: "fixed bottom-4 left-4 right-4 flex flex-col gap-2 sm:static sm:flex-row sm:gap-4"
}

const themes = {
  dark: {
    error: "text-red-400",
    loader: "text-orange-500",
    background: "bg-black/30",
    hover: "hover:bg-white/10",
    text: "text-white",
    border: "border-white/10"
  },
  light: {
    error: "text-red-600",
    loader: "text-orange-600",
    background: "bg-white/30",
    hover: "hover:bg-black/10",
    text: "text-black",
    border: "border-black/10"
  }
}

const clickAnimation = {
  scale: [1, 0.95, 1],
  rotate: [0, -3, 3, 0],
  transition: { duration: 0.4 }
}

const mobileStyles = {
  button: "flex items-center justify-between w-full px-4 py-3 rounded-lg sm:rounded-full",
  icon: "flex-shrink-0 order-1 sm:order-none",
  label: "flex-1 text-left sm:text-center",
  external: "flex-shrink-0 ml-2",
  tooltip: "absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black/90 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
}

const touchAnimations = {
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  press: {
    scale: 0.98,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transition: { duration: 0.2 }
  }
}

const floatingAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 100, opacity: 0 },
  transition: { type: "spring", stiffness: 200, damping: 20 }
}

export function StreamingLinks({ 
  links, 
  className = '', 
  showLabels = true,
  size = 'md',
  variant = 'default',
  layout = 'row',
  loading = false,
  error,
  theme = 'dark',
  showTooltips = false,
  onSwipe,
  enableHaptics = true
}: StreamingLinksProps) {
  const isCompact = layout === 'compact' || layout === 'stack'
  const isFloating = layout === 'float'
  const isMobile = useMediaQuery('(max-width: 640px)')
  
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useGesture({
    onSwipe: (direction) => {
      if (enableHaptics) haptics.medium()
      onSwipe?.(direction)
    },
    onLongPress: () => {
      if (enableHaptics) haptics.heavy()
    },
    onDoubleTap: () => {
      if (enableHaptics) haptics.light()
    }
  })

  if (error) {
    return (
      <div className={cn("text-sm", themes[theme].error)}>{error}</div>
    )
  }

  return (
    <div 
      className={cn(layouts[layout], className, isFloating && "z-50")}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-full flex items-center justify-center py-4"
          >
            <Loader2 className={cn("w-6 h-6 animate-spin", themes[theme].loader)} />
          </motion.div>
        ) : (
          (Object.entries(links) as [ServiceType, string][]).map(([service, url], index) => {
            const platform = streamingPlatforms[service]
            return (
              <motion.a
                key={service}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  isCompact ? mobileStyles.button : "flex items-center gap-2 px-4 rounded-full",
                  "transition-all duration-300",
                  variants[variant],
                  !isCompact && sizes[size],
                  "group relative",
                  !isCompact && "w-full justify-center sm:justify-start",
                  themes[theme].text,
                  isFloating && "shadow-lg"
                )}
                style={{
                  color: platform.color
                }}
                initial={isFloating ? floatingAnimation.initial : { opacity: 0, y: 20 }}
                animate={isFloating ? floatingAnimation.animate : { opacity: 1, y: 0 }}
                exit={isFloating ? floatingAnimation.exit : { opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: isCompact ? 1.02 : 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={isMobile ? touchAnimations.tap : clickAnimation}
                whileInView={!isMobile && {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 }
                }}
                viewport={{ once: true }}
              >
                {showTooltips && !showLabels && (
                  <div className={mobileStyles.tooltip}>
                    {platform.name}
                  </div>
                )}
                
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "relative",
                    isCompact && mobileStyles.icon
                  )}
                >
                  <Image
                    src={`/images/platforms/${service}.svg`}
                    alt={platform.name}
                    width={24}
                    height={24}
                    className={cn(
                      iconSizes[size],
                      "transition-transform group-hover:scale-110"
                    )}
                  />
                  <motion.div
                    className="absolute inset-0 bg-current opacity-0 mix-blend-overlay"
                    whileHover={{ opacity: 0.2 }}
                  />
                </motion.div>
                {showLabels && (
                  <>
                    <span className={cn(
                      "font-medium truncate",
                      isCompact && mobileStyles.label
                    )}>
                      {platform.name}
                    </span>
                    {platform.isExternal && (
                      <ExternalLink 
                        className={cn(
                          "opacity-60 group-hover:opacity-100 flex-shrink-0",
                          iconSizes[size],
                          isCompact && mobileStyles.external
                        )}
                      />
                    )}
                  </>
                )}
              </motion.a>
            )
          })
        )}
      </AnimatePresence>
    </div>
  )
} 