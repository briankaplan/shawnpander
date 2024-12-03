'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Mount/Unmount logic
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    } else {
      const timer = setTimeout(() => setMounted(false), 200) // Match animation duration
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle ESC key
  useEffect(() => {
    if (!closeOnEsc) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, closeOnEsc])

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Focus trap
  useEffect(() => {
    if (!isOpen) return

    const dialog = dialogRef.current
    if (!dialog) return

    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0] as HTMLElement
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus()
          event.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus()
          event.preventDefault()
        }
      }
    }

    dialog.addEventListener('keydown', handleTabKey)
    firstFocusable?.focus()

    return () => dialog.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[95vw] min-h-[95vh]'
  }

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-black/80 backdrop-blur-sm",
          "transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className={cn(
          "relative w-full m-4",
          sizeClasses[size],
          "bg-zinc-900 rounded-xl",
          "border border-zinc-800",
          "shadow-2xl shadow-black/20",
          "transition-all duration-200",
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-4",
          className
        )}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4",
              "w-8 h-8 rounded-full",
              "flex items-center justify-center",
              "text-white/60 hover:text-white",
              "transition-colors duration-200",
              "hover:bg-white/10"
            )}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          {(title || description) && (
            <div className="mb-6">
              {title && (
                <h2
                  id="dialog-title"
                  className="text-2xl font-bold text-white mb-2"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-white/60">{description}</p>
              )}
            </div>
          )}

          {/* Body */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

// Compound Components
export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mb-6 space-y-2", className)}
    {...props}
  />
)

export const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn("text-2xl font-bold text-white", className)}
    {...props}
  />
)

export const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-white/60", className)}
    {...props}
  />
)

export const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-6 pt-6 border-t border-zinc-800",
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4",
      className
    )}
    {...props}
  />
)