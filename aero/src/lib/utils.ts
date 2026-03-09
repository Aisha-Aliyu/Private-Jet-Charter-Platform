import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Sanitize user input to prevent XSS
 * Strips HTML tags and encodes dangerous characters
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')           // Remove angle brackets (HTML tags)
    .replace(/javascript:/gi, '')   // Remove JS protocol
    .replace(/on\w+\s*=/gi, '')    // Remove event handlers
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim()
    .slice(0, 5000)                 // Hard cap on length
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255
}

/**
 * Validate phone — allows international formats
 */
export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-().]{5,30}$/.test(phone)
}

/**
 * Strip all HTML from a string — for displaying user content safely
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}
