'use client'

import { forwardRef, useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  name: string
  error?: string
  type?: string
  multiline?: boolean
  rows?: number
  touched?: boolean
  icon?: React.ReactNode
  helperText?: string
}

export const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  ({ 
    label,
    name,
    error,
    type = 'text',
    multiline = false,
    rows = 4,
    touched = false,
    icon,
    helperText,
    className,
    ...props
  }, ref) => {
    const [showError, setShowError] = useState(false)
    const [showErrorIcon, setShowErrorIcon] = useState(false)

    useEffect(() => {
      if (error && touched) {
        setShowError(true)
        setShowErrorIcon(true)
      } else {
        setShowError(false)
        const timer = setTimeout(() => setShowErrorIcon(false), 200) // Match animation duration
        return () => clearTimeout(timer)
      }
    }, [error, touched])

    const inputClasses = cn(
      "w-full px-4 py-3 rounded-lg",
      "bg-zinc-900/60 border",
      "text-white placeholder:text-white/40",
      "transition-colors duration-200",
      "focus:outline-none focus:ring-2",
      error && touched
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
        : "border-zinc-800 focus:border-orange-500/50 focus:ring-orange-500/20",
      icon && "pl-12",
      className
    )

    const Component = multiline ? 'textarea' : 'input'

    return (
      <div className="space-y-2">
        {/* Label */}
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-white/80"
        >
          {label}
        </label>

        {/* Input Container */}
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}

          {/* Input Element */}
          <Component
            ref={ref as any}
            id={name}
            name={name}
            type={type}
            rows={multiline ? rows : undefined}
            aria-invalid={error && touched ? 'true' : 'false'}
            aria-describedby={`${name}-error ${name}-helper`}
            className={inputClasses}
            {...props}
          />

          {/* Error Icon */}
          {showErrorIcon && (
            <div
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 text-red-500",
                "transition-all duration-200",
                error && touched 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-80"
              )}
            >
              <AlertCircle size={18} />
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && !error && (
          <p 
            id={`${name}-helper`}
            className="text-sm text-white/40"
          >
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {showError && (
          <p
            id={`${name}-error`}
            className={cn(
              "text-sm text-red-500",
              "transition-all duration-200",
              error && touched 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 -translate-y-2"
            )}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'