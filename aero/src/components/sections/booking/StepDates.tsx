'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBooking } from '@/lib/booking-context'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react'
import 'react-day-picker/dist/style.css'

export default function StepDates({
  onNext,
  onBack,
}: {
  onNext: () => void
  onBack: () => void
}) {
  const { form, updateForm } = useBooking()
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!form.departureDate) {
      setError('Please select a departure date.')
      return
    }
    if (form.tripType === 'round-trip' && !form.returnDate) {
      setError('Please select a return date.')
      return
    }
    setError('')
    onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="font-display text-4xl text-ivory mb-2">When do you fly?</h2>
      <p className="text-ivory/30 font-body mb-8">
        {form.departureCity} → {form.arrivalCity}
      </p>

      {/* Route summary pill */}
      <div className="flex items-center gap-3 mb-8 px-5 py-3 border border-ivory/10 bg-smoke w-fit">
        <Calendar size={14} className="text-gold" />
        <span className="text-ivory/50 font-body text-sm">
          {form.tripType === 'round-trip' ? 'Round Trip' : 'One Way'} ·{' '}
          {form.departureAirport} → {form.arrivalAirport}
        </span>
      </div>

      {/* Departure date */}
      <div className="mb-6">
        <label className="block text-ivory/30 text-xs tracking-[0.3em] uppercase font-body mb-3">
          Departure Date
        </label>
        <div className="border border-ivory/10 bg-smoke p-2 booking-calendar">
          <DayPicker
            mode="single"
            selected={form.departureDate ?? undefined}
            onSelect={(d) => updateForm({ departureDate: d ?? null })}
            disabled={{ before: new Date() }}
            showOutsideDays={false}
          />
        </div>
        {form.departureDate && (
          <p className="text-gold text-sm font-body mt-2 tracking-wider">
            ✓ {format(form.departureDate, 'MMMM d, yyyy')}
          </p>
        )}
      </div>

      {/* Return date */}
      {form.tripType === 'round-trip' && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-ivory/30 text-xs tracking-[0.3em] uppercase font-body mb-3">
            Return Date
          </label>
          <div className="border border-ivory/10 bg-smoke p-2 booking-calendar">
            <DayPicker
              mode="single"
              selected={form.returnDate ?? undefined}
              onSelect={(d) => updateForm({ returnDate: d ?? null })}
              disabled={{ before: form.departureDate ?? new Date() }}
              showOutsideDays={false}
            />
          </div>
          {form.returnDate && (
            <p className="text-gold text-sm font-body mt-2 tracking-wider">
              ✓ {format(form.returnDate, 'MMMM d, yyyy')}
            </p>
          )}
        </motion.div>
      )}

      {error && (
        <motion.p
          className="text-red-400/70 font-body text-sm mt-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-4 border border-ivory/10 text-ivory/40 font-body tracking-[0.2em] text-sm uppercase hover:border-ivory/30 hover:text-ivory/60 transition-all duration-300"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-3 py-4 bg-gold text-obsidian font-body tracking-[0.25em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
        >
          Continue <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  )
}
