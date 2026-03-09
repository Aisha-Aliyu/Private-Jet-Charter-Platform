'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBooking } from '@/lib/booking-context'
import AirportInput from '@/components/ui/AirportInput'
import { Airport } from '@/types'
import { ArrowRight, ArrowLeftRight } from 'lucide-react'

export default function StepRoute({ onNext }: { onNext: () => void }) {
  const { form, updateForm } = useBooking()
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!form.departureAirport || !form.arrivalAirport) {
      setError('Please select both departure and arrival airports.')
      return
    }
    if (form.departureAirport === form.arrivalAirport) {
      setError('Departure and arrival cannot be the same airport.')
      return
    }
    setError('')
    onNext()
  }

  const swapAirports = () => {
    updateForm({
      departureAirport: form.arrivalAirport,
      departureCity: form.arrivalCity,
      arrivalAirport: form.departureAirport,
      arrivalCity: form.departureCity,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="font-display text-4xl text-ivory mb-2">Where are you flying?</h2>
      <p className="text-ivory/30 font-body mb-10">Select your departure and arrival airports.</p>

      {/* Trip type toggle */}
      <div className="flex gap-2 mb-8">
        {(['one-way', 'round-trip'] as const).map((type) => (
          <button
            key={type}
            onClick={() => updateForm({ tripType: type })}
            className={`px-6 py-2.5 text-xs font-body tracking-[0.2em] uppercase transition-all duration-300 ${
              form.tripType === type
                ? 'bg-gold text-obsidian'
                : 'border border-ivory/10 text-ivory/40 hover:border-ivory/30 hover:text-ivory/60'
            }`}
          >
            {type.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Airport selectors */}
      <div className="relative flex flex-col gap-4">
        <AirportInput
          label="From"
          value={form.departureAirport}
          cityValue={form.departureCity}
          onChange={(a: Airport) =>
            updateForm({ departureAirport: a.code, departureCity: a.city })
          }
          placeholder="Departure city or airport..."
        />

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            onClick={swapAirports}
            className="w-10 h-10 border border-ivory/10 flex items-center justify-center text-ivory/30 hover:border-gold hover:text-gold transition-all duration-300 bg-obsidian"
            aria-label="Swap airports"
          >
            <ArrowLeftRight size={14} />
          </button>
        </div>

        <AirportInput
          label="To"
          value={form.arrivalAirport}
          cityValue={form.arrivalCity}
          onChange={(a: Airport) =>
            updateForm({ arrivalAirport: a.code, arrivalCity: a.city })
          }
          placeholder="Arrival city or airport..."
        />
      </div>

      {error && (
        <motion.p
          className="text-red-400/70 font-body text-sm mt-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}

      <button
        onClick={handleNext}
        className="mt-10 w-full flex items-center justify-center gap-3 py-4 bg-gold text-obsidian font-body tracking-[0.25em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
      >
        Continue <ArrowRight size={14} />
      </button>
    </motion.div>
  )
}
