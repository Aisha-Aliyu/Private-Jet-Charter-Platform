'use client'

import { useState } from 'react'
import { BookingFormData } from '@/types'
import { format } from 'date-fns'

interface SubmitResult {
  success: boolean
  bookingReference?: string
  error?: string
}

export function useSubmitBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitBooking = async (form: BookingFormData): Promise<SubmitResult> => {
    setLoading(true)
    setError(null)

    try {
      const payload = {
        departureAirport: form.departureAirport,
        departureCity: form.departureCity,
        arrivalAirport: form.arrivalAirport,
        arrivalCity: form.arrivalCity,
        tripType: form.tripType,
        departureDate: form.departureDate
          ? format(form.departureDate, 'yyyy-MM-dd')
          : null,
        returnDate: form.returnDate
          ? format(form.returnDate, 'yyyy-MM-dd')
          : null,
        jetId: form.jetId,
        jetName: form.jetName,
        jetCategory: form.jetCategory,
        pricePerHour: form.pricePerHour,
        passengers: form.passengers,
        estimatedHours: form.estimatedHours,
        totalPrice: form.totalPrice,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        specialRequests: form.specialRequests,
      }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Booking failed')
      }

      return { success: true, bookingReference: data.bookingReference }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  return { submitBooking, loading, error }
}
