'use client'

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { usePaymentForm } from '@/hooks/usePaymentForm'
import { usePaymentRequest } from '@/hooks/usePaymentRequest'
import { cn } from '@/lib/utils'
import type { PaymentIntentRequest } from '@/types/payment'
import type { StripePaymentElementOptions } from '@stripe/stripe-js'

interface PaymentFormProps {
  onSubmit: (data: PaymentIntentRequest) => Promise<void>
}

export function PaymentForm({ onSubmit }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()

  const { formState, handlers } = usePaymentForm({
    onSubmit,
  })

  const { paymentRequest, canMakePayment, updatePaymentAmount } = usePaymentRequest({
    stripe,
    options: {
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Tip the Band',
        amount: 500, // Default $5.00
      },
      requestPayerName: true,
      requestPayerEmail: true,
    },
    onPaymentMethod: async (event) => {
      try {
        await onSubmit({
          amount: Number(formState.amount) * 100,
          email: event.payerEmail,
          currency: 'usd',
        })
        event.complete('success')
      } catch (error) {
        console.error('Payment failed:', error)
        event.complete('fail')
      }
    },
  })

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: true
    },
    fields: {
      billingDetails: {
        email: 'auto',
        phone: 'auto',
        address: 'never'
      }
    },
    wallets: {
      applePay: 'auto',
      googlePay: 'auto'
    },
    business: {
      name: 'Band Tips'
    }
  }

  return (
    <form onSubmit={handlers.handleSubmit} className="w-full max-w-2xl mx-auto space-y-8">
      {canMakePayment && paymentRequest && (
        <div className="mb-8">
          <PaymentElement options={paymentElementOptions} />
        </div>
      )}

      <div className="space-y-6">
        <div
          className={cn(
            "opacity-0 translate-y-4 animate-fade-in",
            "animation-delay-100"
          )}
        >
          <label htmlFor="email" className="block text-xl font-medium text-white mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e) => handlers.setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="Enter your email"
          />
        </div>

        <div
          className={cn(
            "opacity-0 translate-y-4 animate-fade-in",
            "animation-delay-200"
          )}
        >
          <label htmlFor="amount" className="block text-xl font-medium text-white mb-2">
            Tip Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={formState.amount}
            onChange={(e) => {
              handlers.setAmount(e.target.value)
              updatePaymentAmount(Number(e.target.value) * 100)
            }}
            min="1"
            step="0.01"
            required
            className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="Enter amount"
          />
        </div>

        <div
          className={cn(
            "mt-8",
            "opacity-0 translate-y-4 animate-fade-in",
            "animation-delay-300"
          )}
        >
          <label className="block text-xl font-medium text-white mb-4">
            Card Details
          </label>
          <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
            <PaymentElement options={paymentElementOptions} />
          </div>
        </div>

        <div
          className={cn(
            "space-y-4 pt-4",
            "opacity-0 translate-y-4 animate-fade-in",
            "animation-delay-400"
          )}
        >
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formState.joinEmailList}
              onChange={(e) => handlers.setJoinEmailList(e.target.checked)}
              className="w-5 h-5 rounded border-zinc-700 text-orange-500 focus:ring-orange-500 bg-zinc-800/50"
            />
            <span className="text-lg text-white">Join our email list for updates!</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formState.joinSmsList}
              onChange={(e) => handlers.handlePhoneToggle(e.target.checked)}
              className="w-5 h-5 rounded border-zinc-700 text-orange-500 focus:ring-orange-500 bg-zinc-800/50"
            />
            <span className="text-lg text-white">Join our SMS list for exclusive news!</span>
          </label>

          {formState.showPhoneInput && (
            <div
              className={cn(
                "opacity-0 -translate-y-2 animate-fade-in",
                "animation-delay-100"
              )}
            >
              <input
                type="tel"
                value={formState.phoneNumber}
                onChange={(e) => handlers.setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter phone number"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!stripe || formState.processing}
          className={cn(
            "w-full py-4 px-6 text-xl font-semibold text-white",
            "bg-orange-600 hover:bg-orange-700 rounded-lg shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all duration-200",
            "hover:scale-[1.02] active:scale-[0.98]",
            "opacity-0 translate-y-4 animate-fade-in",
            "animation-delay-500"
          )}
        >
          {formState.processing ? 'Processing...' : 'Send Tip'}
        </button>

        {formState.message && (
          <div
            className={cn(
              "text-center text-lg font-medium p-4 rounded-lg",
              "opacity-0 translate-y-4 animate-fade-in",
              formState.message.includes('failed') 
                ? 'bg-red-500/10 text-red-500' 
                : 'bg-green-500/10 text-green-500'
            )}
          >
            {formState.message}
          </div>
        )}
      </div>
    </form>
  )
}