import { NextRequest, NextResponse } from 'next/server'

/**
 * PLACEHOLDER: Replace with real payment gateway integration.
 *
 * Stripe example:
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
 *   const paymentIntent = await stripe.paymentIntents.create({
 *     amount: amountPaise,
 *     currency: 'inr',
 *     metadata: { orderId },
 *   })
 *   return NextResponse.json({ clientSecret: paymentIntent.client_secret })
 *
 * Razorpay example:
 *   const razorpay = new Razorpay({ key_id, key_secret })
 *   const order = await razorpay.orders.create({
 *     amount: amountPaise,
 *     currency: 'INR',
 *     receipt: orderId,
 *   })
 *   return NextResponse.json({ razorpayOrderId: order.id, orderId })
 *
 * Then on client: open Razorpay checkout with order.id, on success redirect to
 * /checkout/success?orderId=xxx
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, amountPaise, email } = body as {
      orderId?: string
      amountPaise?: number
      email?: string
    }

    if (!orderId || typeof amountPaise !== 'number' || amountPaise < 100) {
      return NextResponse.json(
        { error: 'Missing orderId or invalid amount' },
        { status: 400 }
      )
    }

    // TODO: Call your payment provider (Stripe, Razorpay, PayU) here.
    // Return clientSecret (Stripe) or razorpayOrderId (Razorpay) so the
    // frontend can complete the payment and redirect to success page.

    return NextResponse.json({
      message: 'Replace this route with real gateway integration',
      orderId,
      amountPaise,
    })
  } catch (err) {
    console.error('create-payment error', err)
    return NextResponse.json(
      { error: 'Payment creation failed' },
      { status: 500 }
    )
  }
}
