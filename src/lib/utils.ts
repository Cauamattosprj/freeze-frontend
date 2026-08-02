import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(error: unknown, fallback = 'Algo deu errado'): string {
  if (error instanceof Error && error.message) {
    const message = error.message.trim()

    if (message.startsWith('{')) {
      try {
        const parsed = JSON.parse(message)
        if (typeof parsed.message === 'string' && parsed.message) return parsed.message
        if (typeof parsed.error === 'string' && parsed.error) return parsed.error
      } catch {
        // not JSON
      }
    }

    return message
  }

  return fallback
}
