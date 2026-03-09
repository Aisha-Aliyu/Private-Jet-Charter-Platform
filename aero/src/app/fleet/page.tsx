'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { JETS, CATEGORIES, type CategoryId } from '@/lib/fleet-data'
import { Jet } from '@/types'
import JetCard from '@/components/ui/JetCard'
import JetModal from '@/components/ui/JetModal'
import StatsSection from '@/components/sections/StatsSection'
import WhyAeroSection from '@/components/sections/WhyAeroSection'
import { Search } from 'lucide-react'

export default function FleetPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [selectedJet, setSelectedJet] = useState<Jet | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return JETS.filter((jet) => {
      const matchCategory = activeCategory === 'all' || jet.category === activeCategory
      const matchSearch =
        searchQuery === '' ||
        jet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jet.model.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <>
      <div className="min-h-screen bg-obsidian">
        {/* Page Hero */}
        <div className="relative pt-40 pb-24 px-6 overflow-hidden">
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Radial glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold tracking-[0.4em] text-xs uppercase font-body">
                Our Aircraft
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-7xl lg:text-9xl text-ivory tracking-tight leading-none mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              The{' '}
              <span className="gold-shimmer">Fleet</span>
            </motion.h1>

            <motion.p
              className="text-ivory/40 font-body text-xl max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              From nimble light jets to intercontinental flagships — every aircraft
              meticulously maintained, every journey extraordinary.
            </motion.p>
          </div>
        </div>

        {/* Filters + Search */}
        <div className="sticky top-[73px] z-30 bg-obsidian/95 backdrop-blur-md border-y border-ivory/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category filters */}
            <div className="flex items-center gap-1 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-5 py-2 text-xs font-body tracking-[0.2em] uppercase transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'text-obsidian bg-gold'
                      : 'text-ivory/40 hover:text-ivory/70 border border-transparent hover:border-ivory/10'
                  }`}
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <motion.div
                      className="absolute inset-0 bg-gold"
                      layoutId="active-category"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/30" />
              <input
                type="text"
                placeholder="Search aircraft..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-smoke border border-ivory/10 text-ivory/70 font-body text-sm pl-9 pr-4 py-2 w-52 focus:outline-none focus:border-gold/40 placeholder:text-ivory/20 transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        {/* Jets Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Result count */}
          <motion.p
            className="text-ivory/20 text-xs font-body tracking-[0.2em] uppercase mb-10"
            key={filtered.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filtered.length} aircraft{filtered.length !== 1 ? '' : ''} available
          </motion.p>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((jet, i) => (
                  <JetCard
                    key={jet.id}
                    jet={jet}
                    index={i}
                    onSelect={setSelectedJet}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="font-display text-3xl text-ivory/20 mb-3">No aircraft found</p>
                <p className="text-ivory/20 font-body text-sm">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all') }}
                  className="mt-6 text-gold text-xs font-body tracking-[0.2em] uppercase hover:text-gold-light transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Additional sections */}
        <StatsSection />
        <WhyAeroSection />

        {/* Bottom CTA */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-smoke/30 to-obsidian" />

          <div className="relative max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold tracking-[0.4em] text-xs uppercase font-body mb-6">
                Ready to Fly?
              </p>
              <h2 className="font-display text-6xl text-ivory mb-8 tracking-tight">
                Your jet awaits
              </h2>
              <p className="text-ivory/40 font-body text-lg mb-10">
                Speak with our aviation concierge and have your charter confirmed within hours.
              </p>
              <a
                href="/booking"
                className="inline-block px-12 py-5 bg-gold text-obsidian font-body tracking-[0.25em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
              >
                Begin Your Charter
              </a>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Jet Detail Modal */}
      <JetModal jet={selectedJet} onClose={() => setSelectedJet(null)} />
    </>
  )
}
