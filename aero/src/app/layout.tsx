import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://aero-jets.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'AERO | Private Jet Charter',
    template: '%s | AERO Private Jets',
  },
  description:
    "Experience the pinnacle of private aviation. Charter the world's finest jets with AERO — where luxury meets freedom. 47 aircraft, 130+ destinations.",
  keywords: [
    'private jet charter',
    'luxury aviation',
    'private jet hire',
    'charter flight',
    'private plane',
    'business jet',
    'Gulfstream charter',
    'jet charter service',
  ],
  authors: [{ name: 'AERO Private Jets' }],
  creator: 'AERO Private Jets',
  publisher: 'AERO Private Jets',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'AERO Private Jets',
    title: 'AERO | Private Jet Charter',
    description:
      "Charter the world's finest private jets. 47 aircraft, 130+ destinations, 24/7 concierge.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AERO Private Jet Charter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AERO | Private Jet Charter',
    description:
      "Charter the world's finest private jets. 47 aircraft, 130+ destinations.",
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="noise-overlay">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
