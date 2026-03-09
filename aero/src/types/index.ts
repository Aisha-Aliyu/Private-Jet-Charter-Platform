export interface Jet {
  id: string
  name: string
  model: string
  category: 'light' | 'midsize' | 'heavy' | 'ultra-long-range'
  capacity: number
  range_km: number
  speed_kmh: number
  price_per_hour: number
  image_url: string
  features: string[]
  description: string
  available: boolean
}

export interface Booking {
  id: string
  user_id: string
  jet_id: string
  departure_city: string
  arrival_city: string
  departure_date: string
  return_date?: string
  passengers: number
  trip_type: 'one-way' | 'round-trip'
  status: 'pending' | 'confirmed' | 'cancelled'
  total_price: number
  created_at: string
}

export interface NavLink {
  label: string
  href: string
}

export interface Testimonial {
  id: string
  name: string
  title: string
  content: string
  avatar_url?: string
  rating: number
}

export interface BookingFormData {
  // Step 1 - Route
  departureAirport: string
  departureCity: string
  arrivalAirport: string
  arrivalCity: string
  tripType: 'one-way' | 'round-trip'

  // Step 2 - Dates
  departureDate: Date | null
  returnDate: Date | null

  // Step 3 - Passengers & Jet
  passengers: number
  jetId: string
  jetName: string
  jetCategory: string
  pricePerHour: number

  // Step 4 - Personal
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests: string

  // Calculated
  estimatedHours: number
  totalPrice: number
}

export interface Airport {
  code: string
  name: string
  city: string
  country: string
}
