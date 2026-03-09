import { currentUser } from '@clerk/nextjs/server'
import { UserProfile } from '@clerk/nextjs'
import { aeroClerkTheme } from '@/lib/clerk-theme'

export default async function SettingsPage() {
  const user = await currentUser()

  return (
    <div className="px-6 py-10 max-w-3xl">
      <div className="mb-10">
        <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-2">Account</p>
        <h1 className="font-display text-5xl text-ivory tracking-tight">Settings</h1>
        <p className="text-ivory/30 font-body mt-1">
          Manage your profile, security, and preferences.
        </p>
      </div>

      <UserProfile
        appearance={{
          baseTheme: undefined,
          ...aeroClerkTheme,
          elements: {
            ...aeroClerkTheme.elements,
            rootBox: { width: '100%' },
            card: {
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(245,240,232,0.08)',
              boxShadow: 'none',
              borderRadius: '0px',
              width: '100%',
            },
            navbar: {
              backgroundColor: '#0a0a0a',
              borderRight: '1px solid rgba(245,240,232,0.05)',
            },
            navbarButton: {
              color: 'rgba(245,240,232,0.4)',
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              letterSpacing: '0.1em',
              '&:hover': { color: '#c9a84c' },
            },
            navbarButtonActive: {
              color: '#c9a84c',
            },
            pageScrollBox: {
              backgroundColor: '#1a1a1a',
            },
          },
        }}
      />
    </div>
  )
}
