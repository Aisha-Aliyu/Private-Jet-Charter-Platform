'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { useUser, useAuth, UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { LayoutDashboard } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Fleet', href: '/fleet' },
  { label: 'Services', href: '/services' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-700',
          scrolled
            ? 'bg-obsidian/90 backdrop-blur-md border-b border-ivory/5 py-4'
            : 'bg-transparent'
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Logo */}
        <Link href="/" className="font-display text-2xl tracking-widest gold-shimmer">
          AERO
        </Link>

        {/* Desktop Links */}
        <ul className="hidden sm:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-ivory/60 hover:text-gold font-body tracking-[0.15em] text-sm uppercase transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth area — desktop */}
        <div className="hidden sm:flex items-center gap-4">
          {!isSignedIn ? (
            <>
              <Link
                href="/sign-in"
                className="text-ivory/60 hover:text-gold font-body tracking-[0.15em] text-sm uppercase transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/booking"
                className="px-6 py-2.5 bg-gold text-obsidian font-body tracking-[0.15em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
              >
                Book Now
              </Link>
            </>
          ) : (
            <>
              <span className="text-ivory/30 font-body text-sm">
                {user?.firstName ?? 'Welcome back'}
              </span>

              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-ivory/50 hover:text-gold font-body tracking-[0.15em] text-xs uppercase transition-colors duration-300"
              >
                <LayoutDashboard size={13} />
                Dashboard
              </Link>

              <Link
                href="/booking"
                className="px-6 py-2.5 bg-gold text-obsidian font-body tracking-[0.15em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
              >
                Book Now
              </Link>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      width: '32px',
                      height: '32px',
                      borderRadius: '0px',
                      border: '1px solid rgba(201,168,76,0.3)',
                    },
                    userButtonPopoverCard: {
                      backgroundColor: '#1a1a1a',
                      border: '1px solid rgba(245,240,232,0.08)',
                      borderRadius: '0px',
                      boxShadow: 'none',
                    },
                    userButtonPopoverActionButton: {
                      color: 'rgba(245,240,232,0.6)',
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                    },
                    userButtonPopoverActionButtonText: {
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                    },
                    userPreviewMainIdentifier: {
                      color: '#f5f0e8',
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                    },
                    userPreviewSecondaryIdentifier: {
                      color: 'rgba(245,240,232,0.4)',
                    },
                  },
                }}
              />
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="w-6 h-px bg-ivory"
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-6 h-px bg-ivory"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-6 h-px bg-ivory"
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-obsidian flex flex-col items-center justify-center md:hidden"
        initial={{ clipPath: 'circle(0% at 95% 5%)' }}
        animate={
          menuOpen
            ? { clipPath: 'circle(150% at 95% 5%)' }
            : { clipPath: 'circle(0% at 95% 5%)' }
        }
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <Link
                href={link.href}
                className="font-display text-4xl text-ivory hover:text-gold transition-colors duration-300 tracking-wider"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}

          <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  className="text-ivory/50 font-body tracking-[0.2em] text-sm uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/booking"
                  className="px-8 py-3 bg-gold text-obsidian font-body tracking-[0.2em] text-sm uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  Book Now
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-ivory/50 font-body tracking-[0.2em] text-sm uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/booking"
                  className="px-8 py-3 bg-gold text-obsidian font-body tracking-[0.2em] text-sm uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  Book Now
                </Link>
                <div className="mt-2">
                  <UserButton />
                </div>
              </>
            )}
          </motion.li>
        </ul>
      </motion.div>
    </>
  )
}
