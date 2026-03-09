import { SignIn } from '@clerk/nextjs'
import { aeroClerkTheme } from '@/lib/clerk-theme'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center relative overflow-hidden px-4">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-5xl gold-shimmer tracking-widest">AERO</h1>
          <p className="text-ivory/30 font-body text-sm tracking-[0.3em] uppercase mt-2">
            Member Access
          </p>
        </div>

        <SignIn
          appearance={{ baseTheme: undefined, ...aeroClerkTheme }}
          forceRedirectUrl="/dashboard"
        />

        <div className="flex items-center gap-4 justify-center mt-8">
          <div className="w-8 h-px bg-gold/20" />
          <span className="text-ivory/15 text-xs font-body tracking-widest">PRIVATE AVIATION</span>
          <div className="w-8 h-px bg-gold/20" />
        </div>
      </div>
    </div>
  )
}
