'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookingProvider } from '@/lib/booking-context'
import StepIndicator from '@/components/ui/StepIndicator'
import StepRoute from '@/components/sections/booking/StepRoute'
import StepDates from '@/components/sections/booking/StepDates'
import StepJet from '@/components/sections/booking/StepJet'
import StepDetails from '@/components/sections/booking/StepDetails'
import StepReview from '@/components/sections/booking/StepReview'
import StepConfirmation from '@/components/sections/booking/StepConfirmation'

const STEPS = ['Route', 'Dates', 'Aircraft', 'Details', 'Review']

function BookingFlow() {
  const [step, setStep] = useState(1)
  const [bookingRef, setBookingRef] = useState('')

  const next = () => setStep((s) => Math.min(s + 1, 6))
  const back = () => setStep((s) => Math.max(s - 1, 1))

  const handleConfirm = (ref: string) => {
    setBookingRef(ref)
    setStep(6)
  }

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Page header */}
      <div className="relative pt-32 pb-12 px-6">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-gold/5 blur-[100px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-8 h-px bg-gold/40" />
            <span className="text-gold/60 tracking-[0.4em] text-xs uppercase font-body">
              Charter a Private Jet
            </span>
            <div className="w-8 h-px bg-gold/40" />
          </motion.div>

          <motion.h1
            className="font-display text-5xl sm:text-6xl text-ivory tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {step < 6 ? 'Your Journey Awaits' : 'Journey Confirmed'}
          </motion.h1>
        </div>
      </div>

      {step < 6 && (
        <div className="px-6 max-w-2xl mx-auto">
          <StepIndicator steps={STEPS} currentStep={step} />
        </div>
      )}

      <div className="px-6 pb-24 max-w-2xl mx-auto">
        <div className="bg-smoke border border-ivory/5 p-8 sm:p-10">
          <AnimatePresence mode="wait">
            <div key={step}>
              {step === 1 && <StepRoute onNext={next} />}
              {step === 2 && <StepDates onNext={next} onBack={back} />}
              {step === 3 && <StepJet onNext={next} onBack={back} />}
              {step === 4 && <StepDetails onNext={next} onBack={back} />}
              {step === 5 && <StepReview onBack={back} onConfirm={handleConfirm} />}
              {step === 6 && <StepConfirmation bookingRef={bookingRef} />}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <BookingFlow />
    </BookingProvider>
  )
}
