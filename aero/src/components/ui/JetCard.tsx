'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Jet } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { ArrowRight, Users, Gauge, MapPin } from 'lucide-react'

interface JetCardProps {
  jet: Jet
  index: number
  onSelect: (jet: Jet) => void
}

export default function JetCard({ jet, index, onSelect }: JetCardProps) {
  return (
    <motion.article
      className="group relative bg-smoke border border-ivory/5 overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => onSelect(jet)}
      whileHover={{ y: -6 }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-mist">

        {/* Availability badge */}
        <div
          className={`absolute top-4 right-4 z-20 px-3 py-1 text-xs tracking-[0.2em] uppercase font-body ${
            jet.available
              ? 'bg-gold text-obsidian'
              : 'bg-ivory/10 text-ivory/50 border border-ivory/10'
          }`}
        >
          {jet.available ? 'Available' : 'On Request'}
        </div>

        {/* Category tag */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 text-xs tracking-[0.2em] uppercase font-body bg-obsidian/70 backdrop-blur-sm text-ivory/60 border border-ivory/10">
          {jet.category.replace('-', ' ')}
        </div>

        {/* Fallback background — always visible behind image */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-mist via-smoke to-obsidian flex items-center justify-center">
          <div className="text-center">
            <svg
              viewBox="0 0 200 80"
              className="w-40 h-16 text-gold/20 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10,45 L60,42 L90,30 L130,28 L170,35 L190,40 L170,42 L130,38 L90,40 L60,48 L10,50 Z" />
              <path d="M80,28 L100,10 L110,28 Z" />
              <path d="M120,35 L140,25 L148,35 Z" />
              <path d="M60,48 L50,60 L70,48 Z" />
            </svg>
            <p className="text-ivory/20 text-xs tracking-widest mt-2 font-body uppercase">
              {jet.model}
            </p>
          </div>
        </div>

        {/* Real image — only renders if url exists */}
        {jet.image_url ? (
          <Image
            src={jet.image_url}
            alt={jet.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 z-10"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : null}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-smoke to-transparent z-20" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display text-2xl text-ivory tracking-wide">{jet.name}</h3>
            <p className="text-ivory/40 text-sm font-body mt-0.5">{jet.model}</p>
          </div>
          <div className="text-right">
            <p className="text-gold font-display text-xl">{formatCurrency(jet.price_per_hour)}</p>
            <p className="text-ivory/30 text-xs font-body tracking-wider">per hour</p>
          </div>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-5 mb-5 py-4 border-t border-b border-ivory/5">
          <div className="flex items-center gap-2 text-ivory/50">
            <Users size={13} />
            <span className="text-xs font-body tracking-wider">{jet.capacity} pax</span>
          </div>
          <div className="flex items-center gap-2 text-ivory/50">
            <MapPin size={13} />
            <span className="text-xs font-body tracking-wider">
              {(jet.range_km / 1.852).toFixed(0)} nm
            </span>
          </div>
          <div className="flex items-center gap-2 text-ivory/50">
            <Gauge size={13} />
            <span className="text-xs font-body tracking-wider">{jet.speed_kmh} km/h</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-ivory/40 text-sm font-body leading-relaxed line-clamp-2 mb-5">
          {jet.description}
        </p>

        {/* CTA */}
        <motion.button
          className="w-full flex items-center justify-between px-5 py-3 border border-ivory/10 text-ivory/60 text-sm font-body tracking-[0.15em] uppercase group-hover:border-gold group-hover:text-gold transition-all duration-300"
          whileTap={{ scale: 0.98 }}
        >
          <span>View Details</span>
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </motion.button>
      </div>
    </motion.article>
  )
}
