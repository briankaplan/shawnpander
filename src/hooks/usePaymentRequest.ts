import { useState, useEffect } from 'react'
import { Stripe, PaymentRequest } from '@stripe/stripe-js'
import type { PaymentMethodEvent, PaymentRequestOptions } from '@/types/payment'

interface UsePaymentRequestProps {
  stripe: Stripe | null
  options: PaymentRequestOptions
  onPaymentMethod: (event: PaymentMethodEvent) => Promise<void>
}

export function usePaymentRequest({ stripe, options, onPaymentMethod }: UsePaymentRequestProps) {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null)
  const [canMakePayment, setCanMakePayment] = useState(false)

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest(options)

      pr.canMakePayment().then(result => {
        if (result) {
          setCanMakePayment(true)
          setPaymentRequest(pr)
        } else {
          setCanMakePayment(false)
          setPaymentRequest(null)
        }
      })

      pr.on('paymentmethod', async (event) => {
        try {
          await onPaymentMethod(event)
        } catch (error) {
          console.error('Payment request error:', error)
          event.complete('fail')
        }
      })

      return () => {
        // Cleanup
        pr.off('paymentmethod', onPaymentMethod)
      }
    }
  }, [stripe, options, onPaymentMethod])

  const updatePaymentAmount = (amount: number) => {
    if (paymentRequest) {
      paymentRequest.update({
        total: {
          ...options.total,
          amount,
        },
      })
    }
  }

  return {
    paymentRequest,
    canMakePayment,
    updatePaymentAmount,
  }
}