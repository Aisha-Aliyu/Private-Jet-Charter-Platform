'use client'

import { useState, useEffect, useCallback } from 'react'
import { DbBooking } from '@/lib/supabase'

interface UseBookingsReturn {
  bookings: DbBooking[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useBookings(): UseBookingsReturn {
  const [bookings, setBookings] = useState<DbBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch('/api/bookings', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // Revalidate frequently to show latest bookings
        cache: 'no-store',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to load bookings')
      }

      const data = await res.json()
      setBookings(data.bookings ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  return { bookings, loading, error, refetch: fetchBookings }
}
