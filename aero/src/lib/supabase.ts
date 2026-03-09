import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client-side Supabase client (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface DbBooking {
  id: string
  user_id: string
  user_email: string
  user_name: string
  departure_airport: string
  departure_city: string
  arrival_airport: string
  arrival_city: string
  trip_type: 'one-way' | 'round-trip'
  departure_date: string
  return_date: string | null
  jet_id: string
  jet_name: string
  jet_category: string
  price_per_hour: number
  passengers: number
  estimated_hours: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  special_requests: string | null
  booking_reference: string
  created_at: string
  updated_at: string
}
