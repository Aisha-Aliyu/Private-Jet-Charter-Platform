'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useBooking } from '@/lib/booking-context'
import { JETS } from '@/lib/fleet-data'
import { estimateFlightHours } from '@/lib/airports'
import { formatCurrency } from '@/lib/utils'
import { ArrowRight, ArrowLeft, Users, Check } from 'lucide-react'

export default function StepJet({
  onNext,
  onBack,
}: {
  onNext: () => void
  onBack: () => void
}) {
  const { form, updateForm } = useBooking()
  const [error, setError] = useState('')

  const hours = estimateFlightHours(form.departureAirport, form.arrivalAirport)

  const selectJet = (jet: (typeof JETS)[0]) => {
    const total = jet.price_per_hour * hours * (form.tripType === 'round-trip' ? 2 : 1)
    updateForm({
      jetId: jet.id,
      jetName: jet.name,
      jetCategory: jet.category,
      pricePerHour: jet.price_per_hour,
      estimatedHours: hours,
      totalPrice: total,
    })
  }

  const handleNext = () => {
    if (!form.jetId) {
      setError('Please select an aircraft.')
      return
    }
    setError('')
    onNext()
  }

  // Filter jets that fit passenger count
  const suitableJets = JETS.filter((j) => j.capacity >= form.passengers)

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="font-display text-4xl text-ivory mb-2">Choose your aircraft</h2>
      <p className="text-ivory/30 font-body mb-4">
        Estimated flight time: ~{hours}h · {form.passengers} passenger{form.passengers !== 1 ? 's' : ''}
      </p>

      {/* Passenger selector */}
      <div className="flex items-center gap-4 mb-8 p-4 border border-ivory/10 bg-smoke w-fit">
        <Users size={14} className="text-gold" />
        <span className="text-ivory/40 font-body text-sm tracking-wider">Passengers</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateForm({ passengers: Math.max(1, form.passengers - 1) })}
            className="w-7 h-7 border border-ivory/10 text-ivory/40 hover:border-gold hover:text-gold transition-all duration-200 flex items-center justify-center text-lg leading-none"
          >
            −
          </button>
          <span className="font-display text-2xl text-ivory w-6 text-center">{form.passengers}</span>
          <button
            onClick={() => updateForm({ passengers: Math.min(19, form.passengers + 1) })}
            className="w-7 h-7 border border-ivory/10 text-ivory/40 hover:border-gold hover:text-gold transition-all duration-200 flex items-center justify-center text-lg leading-none"
          >
            +
          </button>
        </div>
      </div>

      {/* Jet list */}
      <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
        {suitableJets.map((jet, i) => {
          const total = jet.price_per_hour * hours * (form.tripType === 'round-trip' ? 2 : 1)
          const isSelected = form.jetId === jet.id

          return (
            <motion.button
              key={jet.id}
              className={`w-full flex items-center gap-4 p-4 border text-left transition-all duration-300 ${
                isSelected
                  ? 'border-gold bg-gold/5'
                  : 'border-ivory/5 bg-smoke hover:border-ivory/20'
              }`}
              onClick={() => selectJet(jet)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              {/* Jet image thumbnail */}
              <div className="relative w-20 h-14 flex-shrink-0 bg-mist overflow-hidden">
                {jet.image_url ? (
                  <Image src={jet.image_url} alt={jet.name} fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 80 32" className="w-12 h-6 text-gold/20 fill-current">
                      <path d="M4,18 L24,17 L36,12 L52,11 L68,14 L76,16 L68,17 L52,15 L36,16 L24,19 L4,20 Z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-display text-lg text-ivory">{jet.name}</p>
                  <span className="text-xs text-ivory/30 font-body capitalize">{jet.category.replace('-', ' ')}</span>
                </div>
                <p className="text-ivory/30 text-xs font-body">
                  Up to {jet.capacity} pax · {jet.range_km.toLocaleString()} km range
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-display text-lg text-gold">{formatCurrency(total)}</p>
                <p className="text-ivory/25 text-xs font-body">est. total</p>
              </div>

              {isSelected && (
                <div className="w-5 h-5 bg-gold flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-obsidian" />
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {error && (
        <motion.p className="text-red-400/70 font-body text-sm mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
