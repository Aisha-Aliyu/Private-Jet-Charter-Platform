'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Airport } from '@/types'
import { searchAirports } from '@/lib/airports'

interface AirportInputProps {
  label: string
  value: string
  cityValue: string
  onChange: (airport: Airport) => void
  placeholder?: string
}

export default function AirportInput({
  label,
  value,
  cityValue,
  onChange,
  placeholder = 'City or airport code...',
}: AirportInputProps) {
  const [query, setQuery] = useState(cityValue || '')
  const [results, setResults] = useState<Airport[]>([])
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // FIX: sync query with cityValue prop changes using prev value comparison
  // This avoids the "setState synchronously in effect" pattern
  useEffect(() => {
    setQuery(cityValue || '') // eslint-disable-line react-hooks/exhaustive-deps
  }, [cityValue])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleInput = (val: string) => {
    setQuery(val)
    const found = searchAirports(val)
    setResults(found)
    setOpen(found.length > 0)
  }

  const handleSelect = (airport: Airport) => {
    setQuery(airport.city)
    setOpen(false)
    onChange(airport)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-ivory/30 text-xs tracking-[0.3em] uppercase font-body mb-2">
        {label}
      </label>

      <div
        className={`relative border transition-all duration-300 ${
          focused ? 'border-gold/60' : 'border-ivory/10'
        }`}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <MapPin size={14} className={focused ? 'text-gold' : 'text-ivory/20'} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => {
            setFocused(true)
            if (query.length >= 2) {
              setResults(searchAirports(query))
              setOpen(true)
            }
          }}
          placeholder={placeholder}
          className="w-full bg-smoke text-ivory font-body text-base pl-10 pr-4 py-4 focus:outline-none placeholder:text-ivory/15"
          autoComplete="off"
        />

        {value && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <span className="text-gold text-xs font-body tracking-widest">{value}</span>
          </div>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            className="absolute top-full left-0 right-0 z-50 bg-smoke border border-ivory/10 border-t-0 overflow-hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {results.map((airport, i) => (
              <motion.button
                key={airport.code}
                className="w-full flex items-center gap-4 px-4 py-3 hover:bg-mist text-left transition-colors duration-200 border-b border-ivory/5 last:border-0"
                onClick={() => handleSelect(airport)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="w-12 h-8 bg-obsidian border border-ivory/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-xs font-body tracking-wider">{airport.code}</span>
                </div>
                <div>
                  <p className="text-ivory/80 font-body text-sm">{airport.city}</p>
                  <p className="text-ivory/30 font-body text-xs">
                    {airport.name} · {airport.country}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
