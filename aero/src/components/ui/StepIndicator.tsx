'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {steps.map((step, i) => {
        const stepNum = i + 1
        const isComplete = stepNum < currentStep
        const isActive = stepNum === currentStep

        return (
          <div key={step} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-8 h-8 flex items-center justify-center border text-xs font-body tracking-wider transition-all duration-500 ${
                  isComplete
                    ? 'bg-gold border-gold text-obsidian'
                    : isActive
                    ? 'border-gold text-gold'
                    : 'border-ivory/15 text-ivory/20'
                }`}
                animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
              >
                {isComplete ? <Check size={12} /> : stepNum}
              </motion.div>
              <span
                className={`text-xs mt-2 font-body tracking-[0.15em] uppercase hidden sm:block transition-colors duration-300 ${
                  isActive ? 'text-gold' : isComplete ? 'text-ivory/40' : 'text-ivory/15'
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="w-12 sm:w-20 h-px mx-1 sm:mx-2 relative overflow-hidden mb-5">
                <div className="absolute inset-0 bg-ivory/10" />
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: isComplete ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
