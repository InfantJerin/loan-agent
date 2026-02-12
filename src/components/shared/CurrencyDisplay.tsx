import { formatCurrency, formatCurrencyExact, formatCompactNumber } from '@/lib/format'

export function CurrencyDisplay({ amount, currency = 'USD', exact = false, compact = false }: {
  amount: number; currency?: string; exact?: boolean; compact?: boolean
}) {
  const formatted = compact ? formatCompactNumber(amount) : exact ? formatCurrencyExact(amount, currency) : formatCurrency(amount, currency)
  return <span className="tabular-nums">{formatted}</span>
}
