'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { BookingFormData } from '@/types'

const INITIAL_FORM: BookingFormData = {
  departureAirport: '',
  departureCity: '',
  arrivalAirport: '',
  arrivalCity: '',
  tripType: 'one-way',
  departureDate: null,
  returnDate: null,
  passengers: 2,
  jetId: '',
  jetName: '',
  jetCategory: '',
  pricePerHour: 0,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialRequests: '',
  estimatedHours: 3.5,
  totalPrice: 0,
}

interface BookingContextType {
  form: BookingFormData
  updateForm: (updates: Partial<BookingFormData>) => void
  resetForm: () => void
}

const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<BookingFormData>(INITIAL_FORM)

  const updateForm = (updates: Partial<BookingFormData>) => {
    setForm((prev) => ({ ...prev, ...updates }))
  }

  const resetForm = () => setForm(INITIAL_FORM)

  return (
    <BookingContext.Provider value={{ form, updateForm, resetForm }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}
