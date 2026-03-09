import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { rateLimiter, getClientIP } from '@/lib/rate-limit'
import { sanitizeInput } from '@/lib/utils'
import { z } from 'zod'

// ============================================
// Input validation schema — prevents bad data
// ============================================
const BookingSchema = z.object({
  departureAirport: z.string().min(3).max(10).regex(/^[A-Z0-9]+$/),
  departureCity: z.string().min(1).max(100),
  arrivalAirport: z.string().min(3).max(10).regex(/^[A-Z0-9]+$/),
  arrivalCity: z.string().min(1).max(100),
  tripType: z.enum(['one-way', 'round-trip']),
  departureDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
  returnDate: z.string().nullable().optional(),
  jetId: z.string().min(1).max(100),
  jetName: z.string().min(1).max(200),
  jetCategory: z.string().min(1).max(50),
  pricePerHour: z.number().positive().max(100000),
  passengers: z.number().int().min(1).max(19),
  estimatedHours: z.number().positive().max(24),
  totalPrice: z.number().positive().max(10000000),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(5).max(30),
  specialRequests: z.string().max(2000).optional().default(''),
})

// Generate secure booking reference
function generateBookingRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = 'AERO-'
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

// ============================================
// POST /api/bookings — Create a booking
// ============================================
export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = getClientIP(request)
    const { success, limit, remaining, reset } = await rateLimiter.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    // 2. Auth check — must be signed in
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required.' },
        { status: 401 }
      )
    }

    // 3. Parse and validate request body
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
    }

    const parsed = BookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid booking data.', details: parsed.error.flatten() },
        { status: 422 }
      )
    }

    const data = parsed.data

    // 4. Sanitize free-text fields
    const sanitizedRequests = sanitizeInput(data.specialRequests ?? '')
    const sanitizedFirstName = sanitizeInput(data.firstName)
    const sanitizedLastName = sanitizeInput(data.lastName)

    // 5. Generate unique booking reference
    const bookingReference = generateBookingRef()

    // 6. Insert using parameterized query via Supabase SDK
    // Supabase SDK always uses parameterized queries — no SQL injection possible
    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .insert({
        user_id: userId,
        user_email: data.email,
        user_name: `${sanitizedFirstName} ${sanitizedLastName}`,
        departure_airport: data.departureAirport,
        departure_city: data.departureCity,
        arrival_airport: data.arrivalAirport,
        arrival_city: data.arrivalCity,
        trip_type: data.tripType,
        departure_date: data.departureDate,
        return_date: data.returnDate ?? null,
        jet_id: data.jetId,
        jet_name: data.jetName,
        jet_category: data.jetCategory,
        price_per_hour: data.pricePerHour,
        passengers: data.passengers,
        estimated_hours: data.estimatedHours,
        total_price: data.totalPrice,
        status: 'pending',
        special_requests: sanitizedRequests || null,
        booking_reference: bookingReference,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error.message)
      return NextResponse.json(
        { error: 'Failed to save booking. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        bookingReference: booking.booking_reference,
        bookingId: booking.id,
      },
      { status: 201 }
    )

  } catch (err) {
    console.error('Booking API error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}

// ============================================
// GET /api/bookings — Fetch user's bookings
// ============================================
export async function GET(request: NextRequest) {
  try {
    // Rate limit
    const ip = getClientIP(request)
    const { success } = await rateLimiter.limit(ip)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
    }

    // Auth check
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
    }

    // Fetch only this user's bookings — parameterized via Supabase SDK
    const { data: bookings, error } = await supabaseAdmin
      .from('bookings')
      .select(
        `id, booking_reference, departure_city, arrival_city,
         departure_airport, arrival_airport, departure_date,
         return_date, jet_name, jet_category, passengers,
         total_price, status, trip_type, created_at`
      )
      .eq('user_id', userId)           // parameterized — safe from SQL injection
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Supabase fetch error:', error.message)
      return NextResponse.json({ error: 'Failed to fetch bookings.' }, { status: 500 })
    }

    return NextResponse.json({ bookings: bookings ?? [] })

  } catch (err) {
    console.error('GET bookings error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
