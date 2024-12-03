import { useState, useCallback } from 'react'

interface ValidationRules {
  [key: string]: {
    required?: boolean
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    custom?: (value: any) => boolean | string
  }
}

interface ValidationErrors {
  [key: string]: string
}

interface UseFormProps<T> {
  initialValues: T
  validationRules?: ValidationRules
  onSubmit: (values: T) => Promise<void> | void
}

export function useForm<T extends { [key: string]: any }>({
  initialValues,
  validationRules = {},
  onSubmit
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  const validateField = useCallback((name: string, value: any): string => {
    const rules = validationRules[name]
    if (!rules) return ''

    if (rules.required && !value) {
      return 'This field is required'
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format'
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`
    }

    if (rules.custom) {
      const customResult = rules.custom(value)
      if (typeof customResult === 'string') {
        return customResult
      }
      if (!customResult) {
        return 'Invalid value'
      }
    }

    return ''
  }, [validationRules])

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values, validateField])

  const handleChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [touched, validateField])

  const handleBlur = useCallback((
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = event.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, values[name])
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [values, validateField])

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    )
    setTouched(allTouched)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await onSubmit(values)
      setSubmitStatus('success')
      setValues(initialValues)
      setTouched({})
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validateForm, onSubmit, initialValues])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setSubmitStatus('idle')
  }, [initialValues])

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [touched, validateField])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitStatus,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setValues
  }
}