'use client'

import { motion } from 'framer-motion'
import { useBooking } from '@/lib/booking-context'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { format } from 'date-fns'

interface Props {
  bookingRef: string
}

export default function StepConfirmation({ bookingRef }: Props) {
  const { form } = useBooking()

  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated check */}
      <div className="flex justify-center mb-8">
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 border-2 border-gold"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
          />
          <motion.svg
            viewBox="0 0 50 50"
            className="absolute inset-0 w-full h-full p-6"
          >
            <motion.path
              d="M10 25 L20 35 L40 15"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </motion.svg>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3">
          Booking Confirmed
        </p>
        <h2 className="font-display text-5xl text-ivory mb-4">You're all set.</h2>
        <p className="text-ivory/40 font-body mb-8 max-w-sm mx-auto leading-relaxed">
Your charter request has been saved. Our aviation concierge will contact you at{' '}
<span className="text-ivory/70">{form.email}</span> within 2 hours to confirm.
        </p>

        {/* Real booking reference from Supabase */}
        <div className="inline-block border border-gold/20 bg-gold/5 px-8 py-4 mb-8">
          <p className="text-ivory/30 text-xs tracking-[0.3em] uppercase font-body mb-1">
            Booking Reference
          </p>
          <p className="font-display text-3xl gold-shimmer">{bookingRef}</p>
        </div>

        {/* Summary */}
        <div className="text-left border border-ivory/10 bg-smoke p-6 mb-8 max-w-sm mx-auto">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-ivory/30 font-body text-xs uppercase tracking-wider">Route</span>
              <span className="text-ivory/70 font-body text-sm">
                {form.departureCity} → {form.arrivalCity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ivory/30 font-body text-xs uppercase tracking-wider">Date</span>
              <span className="text-ivory/70 font-body text-sm">
                {form.departureDate ? format(form.departureDate, 'MMM d, yyyy') : '—'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ivory/30 font-body text-xs uppercase tracking-wider">
                Aircraft
              </span>
              <span className="text-ivory/70 font-body text-sm">{form.jetName}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-ivory/5 mt-2">
              <span className="text-ivory/30 font-body text-xs uppercase tracking-wider">
                Est. Total
              </span>
              <span className="text-gold font-display text-lg">
                {formatCurrency(form.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard/bookings"
            className="px-8 py-3 border border-ivory/10 text-ivory/40 font-body tracking-[0.2em] text-sm uppercase hover:border-ivory/30 hover:text-ivory/60 transition-all duration-300"
          >
            View My Bookings
          </Link>
          <Link
            href="/fleet"
            className="px-8 py-3 bg-gold text-obsidian font-body tracking-[0.2em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
          >
            Explore Fleet
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
