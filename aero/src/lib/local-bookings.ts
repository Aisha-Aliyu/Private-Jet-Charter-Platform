// Bookings are saved in this browser only. There are no accounts and no server.
export interface SavedBooking {
  id: string
  user_name: string
  user_email: string
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

const KEY = 'aero_bookings'

export function readBookings(): SavedBooking[] {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function saveBooking(booking: SavedBooking) {
  localStorage.setItem(KEY, JSON.stringify([booking, ...readBookings()]))
}

// For example AERO-7K3F9Q
export function makeBookingReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  return 'AERO-' + Array.from(bytes, (b) => chars[b % chars.length]).join('')
}
