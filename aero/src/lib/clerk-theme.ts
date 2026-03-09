import type { Theme } from '@clerk/types'

export const aeroClerkTheme: Theme = {
  baseTheme: undefined,
  variables: {
    colorPrimary: '#c9a84c',
    colorBackground: '#1a1a1a',
    colorInputBackground: '#0a0a0a',
    colorInputText: '#f5f0e8',
    colorText: '#f5f0e8',
    colorTextSecondary: 'rgba(245,240,232,0.4)',
    colorNeutral: '#f5f0e8',
    colorDanger: '#ef4444',
    colorSuccess: '#c9a84c',
    borderRadius: '0px',
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: '16px',
  },
  elements: {
    card: {
      backgroundColor: '#1a1a1a',
      border: '1px solid rgba(245,240,232,0.08)',
      boxShadow: 'none',
      borderRadius: '0px',
    },
    headerTitle: {
      fontFamily: '"DitMagi", "Cormorant Garamond", serif',
      fontSize: '2rem',
      color: '#f5f0e8',
      letterSpacing: '0.05em',
    },
    headerSubtitle: {
      color: 'rgba(245,240,232,0.4)',
      fontFamily: '"Cormorant Garamond", Georgia, serif',
    },
    formButtonPrimary: {
      backgroundColor: '#c9a84c',
      color: '#0a0a0a',
      borderRadius: '0px',
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      '&:hover': {
        backgroundColor: '#e8c97a',
      },
    },
    formFieldInput: {
      backgroundColor: '#0a0a0a',
      border: '1px solid rgba(245,240,232,0.1)',
      borderRadius: '0px',
      color: '#f5f0e8',
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      '&:focus': {
        border: '1px solid rgba(201,168,76,0.6)',
        boxShadow: 'none',
      },
    },
    formFieldLabel: {
      color: 'rgba(245,240,232,0.3)',
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      fontSize: '0.65rem',
    },
    footerActionLink: {
      color: '#c9a84c',
      '&:hover': { color: '#e8c97a' },
    },
    identityPreviewText: {
      color: 'rgba(245,240,232,0.6)',
    },
    dividerLine: {
      backgroundColor: 'rgba(245,240,232,0.08)',
    },
    dividerText: {
      color: 'rgba(245,240,232,0.2)',
    },
    socialButtonsBlockButton: {
      backgroundColor: '#0a0a0a',
      border: '1px solid rgba(245,240,232,0.1)',
      borderRadius: '0px',
      color: '#f5f0e8',
      '&:hover': {
        backgroundColor: '#2a2a2a',
        border: '1px solid rgba(201,168,76,0.3)',
      },
    },
    socialButtonsBlockButtonText: {
      color: 'rgba(245,240,232,0.7)',
      fontFamily: '"Cormorant Garamond", Georgia, serif',
    },
  },
}
