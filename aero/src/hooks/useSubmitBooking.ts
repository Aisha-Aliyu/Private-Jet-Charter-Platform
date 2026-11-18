'use client'

import { useState } from 'react'
import { BookingFormData } from '@/types'
import { format } from 'date-fns'
import { makeBookingReference, saveBooking } from '@/lib/local-bookings'

interface SubmitResult {
  success: boolean
  bookingReference?: string
  error?: string
}

// Saves the booking in this browser
export function useSubmitBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitBooking = async (form: BookingFormData): Promise<SubmitResult> => {
    setLoading(true)
    setError(null)

    try {
      const now = new Date().toISOString()
      const bookingReference = makeBookingReference()
      saveBooking({
        id: crypto.randomUUID(),
        user_name: `${form.firstName} ${form.lastName}`.trim(),
        user_email: form.email,
        departure_airport: form.departureAirport,
        departure_city: form.departureCity,
        arrival_airport: form.arrivalAirport,
        arrival_city: form.arrivalCity,
        trip_type: form.tripType,
        departure_date: form.departureDate ? format(form.departureDate, 'yyyy-MM-dd') : '',
        return_date: form.returnDate ? format(form.returnDate, 'yyyy-MM-dd') : null,
        jet_id: form.jetId,
        jet_name: form.jetName,
        jet_category: form.jetCategory,
        price_per_hour: form.pricePerHour,
        passengers: form.passengers,
        estimated_hours: form.estimatedHours,
        total_price: form.totalPrice,
        status: 'pending',
        special_requests: form.specialRequests || null,
        booking_reference: bookingReference,
        created_at: now,
        updated_at: now,
      })
      return { success: true, bookingReference }
    } catch {
      const message = "Couldn't save the booking in this browser."
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  return { submitBooking, loading, error }
}
