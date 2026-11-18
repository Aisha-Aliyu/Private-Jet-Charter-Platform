'use client'

import { useState, useEffect, useCallback } from 'react'
import { readBookings, type SavedBooking } from '@/lib/local-bookings'

interface UseBookingsReturn {
  bookings: SavedBooking[]
  loading: boolean
  error: string | null
  refetch: () => void
}

// Reads the bookings saved in this browser
export function useBookings(): UseBookingsReturn {
  const [bookings, setBookings] = useState<SavedBooking[]>([])
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(() => {
    setBookings(readBookings())
    setLoading(false)
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { bookings, loading, error: null, refetch }
}
