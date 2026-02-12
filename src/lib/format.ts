import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday, addDays } from 'date-fns'

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)
}

export function formatCurrencyExact(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)
}

export function formatPercent(value: number, decimals = 3): string {
  return `${value.toFixed(decimals)}%`
}

export function formatBps(value: number): string {
  return `${value.toFixed(0)} bps`
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM dd, yyyy')
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MM/dd/yyyy')
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM dd, yyyy h:mm a')
}

export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isToday(d)) return 'Today'
  if (isTomorrow(d)) return 'Tomorrow'
  if (isYesterday(d)) return 'Yesterday'
  return formatDistanceToNow(d, { addSuffix: true })
}

export function formatCompactNumber(num: number): string {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`
  return `$${num}`
}

export { addDays, format, isToday, isTomorrow }
