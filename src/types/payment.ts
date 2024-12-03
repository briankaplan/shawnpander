import type { StripeElements, PaymentRequest, StripePaymentElementOptions as StripeOptions } from '@stripe/stripe-js'

export interface PaymentIntentRequest {
  amount: number
  email?: string
  joinEmailList?: boolean
  joinSmsList?: boolean
  phoneNumber?: string
  currency?: string
}

export interface PaymentIntentResponse {
  clientSecret: string | null
  error?: string
}

export interface StripeErrorType {
  type: 'StripeCardError' | 'StripeInvalidRequestError' | 'StripeRateLimitError' | 'StripeConnectionError' | 'StripeAuthenticationError' | string
  message: string
  code?: string
  param?: string
  detail?: string
}

export interface PaymentRequestOptions {
  country: string
  currency: string
  total: {
    label: string
    amount: number
  }
  requestPayerName: boolean
  requestPayerEmail: boolean
}

export interface PaymentMethodEvent {
  payerEmail?: string
  payerName?: string
  payerPhone?: string
  paymentMethod: {
    id: string
    card?: {
      brand: string
      last4: string
    }
  }
  complete: (status: 'success' | 'fail' | 'invalid_payer_name' | 'invalid_payer_phone' | 'invalid_payer_email') => void
}

export interface PaymentRequestButtonOptions {
  paymentRequest: PaymentRequest
  style?: {
    type?: 'default' | 'donate'
    theme?: 'dark' | 'light' | 'light-outline'
    height?: string
  }
}

// Re-export Stripe's payment element options type
export type { StripeOptions as StripePaymentElementOptions }