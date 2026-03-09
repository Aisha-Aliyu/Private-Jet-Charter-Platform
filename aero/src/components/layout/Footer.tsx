import Link from 'next/link'

const LINKS = {
  Services: [
    { label: 'Charter Flights', href: '/booking' },
    { label: 'Our Fleet', href: '/fleet' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Cargo Charter', href: '/services#cargo' },
  ],
  Company: [
    { label: 'About AERO', href: '/about' },
    { label: 'Safety', href: '/about#safety' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  Legal: [
    { label: 'Terms of Charter', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-smoke border-t border-ivory/5 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-3xl gold-shimmer tracking-widest">
              AERO
            </Link>
            <p className="text-ivory/30 font-body text-sm leading-relaxed mt-4 max-w-xs">
              Redefining private aviation since 2009. Every journey crafted with
              precision, discretion, and an unwavering commitment to excellence.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-8 h-px bg-gold/30" />
              <span className="text-ivory/15 text-xs font-body tracking-[0.3em]">
                ICAO CERTIFIED
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-ivory/20 text-xs tracking-[0.3em] uppercase font-body mb-5">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-ivory/40 hover:text-gold font-body text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-t border-b border-ivory/5 mb-8">
          {[
            { label: 'Reservations', value: '+1 (888) AERO-JET' },
            { label: 'Email', value: 'charter@aero-jets.com' },
            { label: 'Available', value: '24 hours · 7 days' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-ivory/20 text-xs tracking-[0.2em] uppercase font-body mb-1">
                {label}
              </p>
              <p className="text-ivory/60 font-body text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory/15 font-body text-xs">
            © {new Date().getFullYear()} AERO Private Jets. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-ivory/15 hover:text-ivory/40 font-body text-xs transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-ivory/15 hover:text-ivory/40 font-body text-xs transition-colors"
            >
              Privacy
            </Link>
            <span className="text-ivory/10 font-body text-xs">
              Built with precision.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
