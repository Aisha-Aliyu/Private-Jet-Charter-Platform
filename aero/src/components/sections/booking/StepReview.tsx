'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBooking } from '@/lib/booking-context'
import { useSubmitBooking } from '@/hooks/useSubmitBooking'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { ArrowLeft, CheckCircle, Plane, User, Calendar, MapPin } from 'lucide-react'

interface ReviewRowProps {
  label: string
  value: string
}

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-ivory/5 last:border-0">
      <span className="text-ivory/30 font-body text-xs tracking-[0.2em] uppercase">{label}</span>
      <span className="text-ivory/80 font-body text-sm text-right max-w-48">{value}</span>
    </div>
  )
}

export default function StepReview({
  onBack,
  onConfirm,
}: {
  onBack: () => void
  onConfirm: (ref: string) => void
}) {
  const { form } = useBooking()
  const { submitBooking, loading } = useSubmitBooking()
  const [agreed, setAgreed] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleConfirm = async () => {
    if (!agreed) return
    setApiError('')

    const result = await submitBooking(form)

    if (result.success && result.bookingReference) {
      onConfirm(result.bookingReference)
    } else {
      setApiError(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="font-display text-4xl text-ivory mb-2">Review your charter</h2>
      <p className="text-ivory/30 font-body mb-10">
        Confirm the details before we process your booking.
      </p>

      {/* Route block */}
      <div className="mb-4 border border-ivory/10 bg-smoke">
        <div className="flex items-center gap-3 px-5 py-3 border-b border-ivory/5">
          <MapPin size={13} className="text-gold" />
          <span className="text-ivory/30 text-xs tracking-[0.25em] uppercase font-body">Route</span>
        </div>
        <div className="px-5 py-2">
          <ReviewRow label="From" value={`${form.departureCity} (${form.departureAirport})`} />
          <ReviewRow label="To" value={`${form.arrivalCity} (${form.arrivalAirport})`} />
          <ReviewRow
            label="Trip Type"
            value={form.tripType === 'round-trip' ? 'Round Trip' : 'One Way'}
          />
        </div>
      </div>

      {/* Dates block */}
      <div className="mb-4 border border-ivory/10 bg-smoke">
        <div className="flex items-center gap-3 px-5 py-3 border-b border-ivory/5">
          <Calendar size={13} className="text-gold" />
          <span className="text-ivory/30 text-xs tracking-[0.25em] uppercase font-body">Dates</span>
        </div>
        <div className="px-5 py-2">
          <ReviewRow
            label="Departure"
            value={form.departureDate ? format(form.departureDate, 'MMMM d, yyyy') : '—'}
          />
          {form.tripType === 'round-trip' && (
            <ReviewRow
              label="Return"
              value={form.returnDate ? format(form.returnDate, 'MMMM d, yyyy') : '—'}
            />
          )}
        </div>
      </div>

      {/* Aircraft block */}
      <div className="mb-4 border border-ivory/10 bg-smoke">
        <div className="flex items-center gap-3 px-5 py-3 border-b border-ivory/5">
          <Plane size={13} className="text-gold" />
          <span className="text-ivory/30 text-xs tracking-[0.25em] uppercase font-body">
            Aircraft
          </span>
        </div>
        <div className="px-5 py-2">
          <ReviewRow label="Aircraft" value={form.jetName} />
          <ReviewRow label="Passengers" value={`${form.passengers} pax`} />
          <ReviewRow label="Est. Flight Time" value={`~${form.estimatedHours} hours`} />
        </div>
      </div>

      {/* Contact block */}
      <div className="mb-6 border border-ivory/10 bg-smoke">
        <div className="flex items-center gap-3 px-5 py-3 border-b border-ivory/5">
          <User size={13} className="text-gold" />
          <span className="text-ivory/30 text-xs tracking-[0.25em] uppercase font-body">
            Contact
          </span>
        </div>
        <div className="px-5 py-2">
          <ReviewRow label="Name" value={`${form.firstName} ${form.lastName}`} />
          <ReviewRow label="Email" value={form.email} />
          <ReviewRow label="Phone" value={form.phone} />
          {form.specialRequests && (
            <ReviewRow label="Requests" value={form.specialRequests} />
          )}
        </div>
      </div>

      {/* Total price */}
      <div className="p-6 border border-gold/20 bg-gold/5 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-ivory/30 text-xs tracking-[0.3em] uppercase font-body mb-1">
              Estimated Total
            </p>
            <p className="font-display text-5xl gold-shimmer">{formatCurrency(form.totalPrice)}</p>
            <p className="text-ivory/20 text-xs font-body mt-1">
              Includes all fees, taxes & catering allowance
            </p>
          </div>
          <div className="text-right">
            <p className="text-ivory/20 text-xs font-body">
              {formatCurrency(form.pricePerHour)}/hr
            </p>
            <p className="text-ivory/20 text-xs font-body">× {form.estimatedHours}h</p>
            {form.tripType === 'round-trip' && (
              <p className="text-ivory/20 text-xs font-body">× 2 (round trip)</p>
            )}
          </div>
        </div>
      </div>

      {/* API error */}
      {apiError && (
        <motion.div
          className="mb-6 p-4 border border-red-500/20 bg-red-500/5"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-red-400/80 font-body text-sm">{apiError}</p>
        </motion.div>
      )}

      {/* Terms agreement */}
      <div className="flex items-start gap-3 mb-8">
        <button
          onClick={() => setAgreed(!agreed)}
          className={`w-5 h-5 border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-300 ${
            agreed ? 'bg-gold border-gold' : 'border-ivory/20'
          }`}
          aria-label="Agree to terms"
        >
          {agreed && (
            <motion.svg
              viewBox="0 0 12 10"
              className="w-3 h-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <path
                d="M1 5 L4 8 L11 1"
                fill="none"
                stroke="#0a0a0a"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.svg>
          )}
        </button>
        <p className="text-ivory/30 font-body text-sm leading-relaxed">
          I confirm the details above are correct and agree to AERO{' '}
          <a href="/terms" className="text-gold hover:text-gold-light transition-colors">
            Terms of Charter
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-gold hover:text-gold-light transition-colors">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-4 border border-ivory/10 text-ivory/40 font-body tracking-[0.2em] text-sm uppercase hover:border-ivory/30 hover:text-ivory/60 transition-all duration-300 disabled:opacity-30"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={!agreed || loading}
          className={`flex-1 flex items-center justify-center gap-3 py-4 font-body tracking-[0.25em] text-sm uppercase transition-all duration-300 ${
            agreed && !loading
              ? 'bg-gold text-obsidian hover:bg-gold-light'
              : 'bg-ivory/5 text-ivory/20 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <motion.div
              className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          ) : (
            <>
              Confirm Charter <CheckCircle size={14} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
