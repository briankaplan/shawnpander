'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Context
interface TabsContextValue {
  selectedTab: string
  setSelectedTab: (id: string) => void
  variant: 'default' | 'pills' | 'underline'
  orientation: 'horizontal' | 'vertical'
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs component')
  }
  return context
}

// Root Component
interface TabsProps {
  defaultTab: string
  variant?: 'default' | 'pills' | 'underline'
  orientation?: 'horizontal' | 'vertical'
  className?: string
  children: React.ReactNode
}

export function Tabs({
  defaultTab,
  variant = 'default',
  orientation = 'horizontal',
  className,
  children
}: TabsProps) {
  const [selectedTab, setSelectedTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab, variant, orientation }}>
      <div
        className={cn(
          "w-full",
          orientation === 'vertical' && "flex gap-8",
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

// List Component
interface TabsListProps {
  'aria-label': string
  className?: string
  children: React.ReactNode
}

export function TabsList({
  'aria-label': ariaLabel,
  className,
  children
}: TabsListProps) {
  const { variant, orientation } = useTabsContext()

  const variantStyles = {
    default: "border-b border-zinc-800",
    pills: "p-1 bg-zinc-900/50 rounded-lg",
    underline: "border-b border-zinc-800"
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      className={cn(
        orientation === 'horizontal' && "flex",
        orientation === 'vertical' && "flex-col",
        variant === 'default' && variantStyles.default,
        variant === 'pills' && variantStyles.pills,
        variant === 'underline' && variantStyles.underline,
        className
      )}
    >
      {children}
    </div>
  )
}

// Tab Component
interface TabProps {
  id: string
  className?: string
  children: React.ReactNode
}

export function Tab({ id, className, children }: TabProps) {
  const { selectedTab, setSelectedTab, variant, orientation } = useTabsContext()
  const isSelected = selectedTab === id

  const variantStyles = {
    default: cn(
      "px-4 py-2 -mb-px",
      isSelected && "border-b-2 border-orange-500"
    ),
    pills: cn(
      "px-4 py-2 rounded-md",
      isSelected && "bg-orange-500"
    ),
    underline: cn(
      "px-4 py-2",
      isSelected && "border-b-2 border-orange-500"
    )
  }

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${id}`}
      id={`tab-${id}`}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => setSelectedTab(id)}
      className={cn(
        "relative",
        "text-sm font-medium",
        "transition-all duration-200",
        !isSelected && "text-white/60 hover:text-white",
        isSelected && "text-white",
        variant === 'default' && variantStyles.default,
        variant === 'pills' && variantStyles.pills,
        variant === 'underline' && variantStyles.underline,
        className
      )}
    >
      {children}
      {variant === 'pills' && isSelected && (
        <div
          className={cn(
            "absolute inset-0 bg-orange-500 rounded-md -z-10",
            "transition-all duration-200",
            "animate-scale-up"
          )}
        />
      )}
    </button>
  )
}

// Panel Component
interface TabPanelProps {
  id: string
  className?: string
  children: React.ReactNode
}

export function TabPanel({ id, className, children }: TabPanelProps) {
  const { selectedTab } = useTabsContext()
  const isSelected = selectedTab === id
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isSelected) {
      setMounted(true)
    } else {
      const timer = setTimeout(() => setMounted(false), 200) // Match animation duration
      return () => clearTimeout(timer)
    }
  }, [isSelected])

  if (!mounted) return null

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      hidden={!isSelected}
      className={cn(
        "focus:outline-none",
        "mt-4",
        className
      )}
      tabIndex={0}
    >
      <div
        className={cn(
          "transition-all duration-200",
          isSelected 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-4"
        )}
      >
        {children}
      </div>
    </div>
  )
}

// Keyboard Navigation Hook
interface UseTabNavigationProps {
  tabsRef: React.RefObject<HTMLDivElement>
  selectedTab: string
  setSelectedTab: (id: string) => void
  tabIds: string[]
}

function useTabNavigation({
  tabsRef,
  selectedTab,
  setSelectedTab,
  tabIds
}: UseTabNavigationProps) {
  useEffect(() => {
    const tabsElement = tabsRef.current
    if (!tabsElement) return

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = tabIds.indexOf(selectedTab)

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          const nextIndex = (currentIndex + 1) % tabIds.length
          setSelectedTab(tabIds[nextIndex])
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          const prevIndex = (currentIndex - 1 + tabIds.length) % tabIds.length
          setSelectedTab(tabIds[prevIndex])
          break
        case 'Home':
          event.preventDefault()
          setSelectedTab(tabIds[0])
          break
        case 'End':
          event.preventDefault()
          setSelectedTab(tabIds[tabIds.length - 1])
          break
      }
    }

    tabsElement.addEventListener('keydown', handleKeyDown)
    return () => tabsElement.removeEventListener('keydown', handleKeyDown)
  }, [selectedTab, setSelectedTab, tabIds])
}