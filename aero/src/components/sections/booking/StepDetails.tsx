'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBooking } from '@/lib/booking-context'
import { sanitizeInput } from '@/lib/utils'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
}

function Field({ label, value, onChange, type = 'text', placeholder, required }: FieldProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div>
      <label className="block text-ivory/30 text-xs tracking-[0.3em] uppercase font-body mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(sanitizeInput(e.target.value))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={`w-full bg-smoke border text-ivory font-body text-base px-4 py-4 focus:outline-none placeholder:text-ivory/15 transition-colors duration-300 ${
          focused ? 'border-gold/60' : 'border-ivory/10'
        }`}
      />
    </div>
  )
}

export default function StepDetails({
  onNext,
  onBack,
}: {
  onNext: () => void
  onBack: () => void
}) {
  const { form, updateForm } = useBooking()
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError('Please fill in all required fields.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.')
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
      <h2 className="font-display text-4xl text-ivory mb-2">Your details</h2>
      <p className="text-ivory/30 font-body mb-10">
        We will use these to confirm your charter and stay in touch.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field
          label="First Name"
          value={form.firstName}
          onChange={(v) => updateForm({ firstName: v })}
          placeholder="John"
          required
        />
        <Field
          label="Last Name"
          value={form.lastName}
          onChange={(v) => updateForm({ lastName: v })}
          placeholder="Smith"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field
          label="Email Address"
          value={form.email}
          onChange={(v) => updateForm({ email: v })}
          type="email"
          placeholder="john@example.com"
          required
        />
        <Field
          label="Phone Number"
          value={form.phone}
          onChange={(v) => updateForm({ phone: v })}
          type="tel"
          placeholder="+1 (555) 000-0000"
          required
        />
      </div>

      <div>
        <label className="block text-ivory/30 text-xs tracking-[0.3em] uppercase font-body mb-2">
          Special Requests
        </label>
        <textarea
          value={form.specialRequests}
          onChange={(e) => updateForm({ specialRequests: sanitizeInput(e.target.value) })}
          placeholder="Catering preferences, ground transport, any special requirements..."
          rows={4}
          className="w-full bg-smoke border border-ivory/10 text-ivory font-body text-base px-4 py-4 focus:outline-none focus:border-gold/60 placeholder:text-ivory/15 transition-colors duration-300 resize-none"
        />
      </div>

      {error && (
        <motion.p
          className="text-red-400/70 font-body text-sm mt-4"
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
          Review Booking <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  )
}
