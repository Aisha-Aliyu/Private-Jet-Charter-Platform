'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 text-center">
        <motion.p
          className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Error 404
        </motion.p>

        <motion.h1
          className="font-display text-[10rem] leading-none text-ivory/5 mb-4 select-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="-mt-16"
        >
          <h2 className="font-display text-4xl text-ivory mb-4">
            Off the flight plan.
          </h2>
          {/* FIX: use &apos; for apostrophes in JSX */}
          <p className="text-ivory/30 font-body mb-10 max-w-sm mx-auto">
            This page doesn&apos;t exist in our airspace. Let&apos;s get you back on course.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gold text-obsidian font-body tracking-[0.2em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
            >
              Back to Home
            </Link>
            <Link
              href="/fleet"
              className="px-8 py-3 border border-ivory/10 text-ivory/40 font-body tracking-[0.2em] text-sm uppercase hover:border-ivory/30 hover:text-ivory/60 transition-all duration-300"
            >
              Browse Fleet
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
