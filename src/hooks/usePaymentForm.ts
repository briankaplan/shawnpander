import { useState, useCallback } from 'react'
import type { PaymentIntentRequest } from '@/types/payment'

interface UsePaymentFormProps {
  onSubmit: (data: PaymentIntentRequest) => Promise<void>
}

export function usePaymentForm({ onSubmit }: UsePaymentFormProps) {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [joinEmailList, setJoinEmailList] = useState(false)
  const [joinSmsList, setJoinSmsList] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState('')

  const resetForm = useCallback(() => {
    setEmail('')
    setAmount('')
    setPhoneNumber('')
    setShowPhoneInput(false)
    setJoinEmailList(false)
    setJoinSmsList(false)
    setMessage('')
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (processing) return

    const amountNumber = parseFloat(amount)
    if (isNaN(amountNumber) || amountNumber < 1) {
      setMessage('Please enter a valid amount (minimum $1)')
      return
    }

    try {
      setProcessing(true)
      setMessage('')

      await onSubmit({
        amount: Math.round(amountNumber * 100), // Convert to cents
        email,
        joinEmailList,
        joinSmsList,
        phoneNumber: showPhoneInput ? phoneNumber : undefined,
        currency: 'usd'
      })

      resetForm()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setProcessing(false)
    }
  }, [amount, email, joinEmailList, joinSmsList, phoneNumber, showPhoneInput, processing, onSubmit, resetForm])

  const handlePhoneToggle = useCallback((checked: boolean) => {
    setShowPhoneInput(checked)
    if (!checked) {
      setPhoneNumber('')
    }
  }, [])

  return {
    formState: {
      email,
      amount,
      phoneNumber,
      showPhoneInput,
      joinEmailList,
      joinSmsList,
      processing,
      message
    },
    handlers: {
      setEmail,
      setAmount,
      setPhoneNumber,
      setJoinEmailList,
      setJoinSmsList,
      handlePhoneToggle,
      handleSubmit,
      resetForm
    }
  }
}

export type PaymentFormState = ReturnType<typeof usePaymentForm>['formState']
export type PaymentFormHandlers = ReturnType<typeof usePaymentForm>['handlers']