import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { rateLimiter, getClientIP } from '@/lib/rate-limit'
import { sanitizeInput, isValidEmail } from '@/lib/utils'
import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional().default(''),
  message: z.string().min(10).max(2000),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limit — stricter for contact (20/hour)
    const ip = getClientIP(request)
    const rateLimit = new (await import('@upstash/ratelimit')).Ratelimit({
      redis: new (await import('@upstash/redis')).Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      }),
      limiter: (await import('@upstash/ratelimit')).Ratelimit.slidingWindow(20, '1 h'),
      prefix: 'aero:contact',
    })

    const { success } = await rateLimit.limit(ip)
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse + validate
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data.', details: parsed.error.flatten() },
        { status: 422 }
      )
    }

    const { name, email, phone, message } = parsed.data

    // Extra email validation
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 })
    }

    // Sanitize all fields
    const sanitized = {
      name: sanitizeInput(name),
      email: email.toLowerCase().trim(),
      phone: sanitizeInput(phone),
      message: sanitizeInput(message),
    }

    // Insert to Supabase (parameterized)
    const { error } = await supabaseAdmin
      .from('inquiries')
      .insert(sanitized)

    if (error) {
      console.error('Contact insert error:', error.message)
      return NextResponse.json(
        { error: 'Failed to submit inquiry. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
