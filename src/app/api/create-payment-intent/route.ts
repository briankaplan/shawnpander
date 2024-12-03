import { NextResponse } from 'next/server'
import stripe from '@/lib/stripe'
import type { PaymentIntentRequest, PaymentIntentResponse, StripeErrorType } from '@/types/payment'

// Validate request body
function validateRequest(body: any): body is PaymentIntentRequest {
  return (
    typeof body === 'object' &&
    typeof body.amount === 'number' &&
    body.amount >= 100 && // Minimum $1.00
    (body.email === undefined || typeof body.email === 'string') &&
    (body.joinEmailList === undefined || typeof body.joinEmailList === 'boolean') &&
    (body.joinSmsList === undefined || typeof body.joinSmsList === 'boolean') &&
    (body.phoneNumber === undefined || typeof body.phoneNumber === 'string')
  )
}

// Type guard for Stripe errors
function isStripeError(error: unknown): error is StripeErrorType {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    typeof (error as any).type === 'string' &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

export async function POST() {
  return new Response(JSON.stringify({ message: 'Payment system coming soon' }), {
    status: 503,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}