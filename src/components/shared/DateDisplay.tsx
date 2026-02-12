import { formatDate, formatDateShort, formatRelativeDate } from '@/lib/format'

export function DateDisplay({ date, format = 'default', showRelative = false }: {
  date: string; format?: 'default' | 'short'; showRelative?: boolean
}) {
  const formatted = format === 'short' ? formatDateShort(date) : formatDate(date)
  return (
    <span className="whitespace-nowrap">
      {formatted}
      {showRelative && <span className="text-muted-foreground text-xs ml-1">({formatRelativeDate(date)})</span>}
    </span>
  )
}
