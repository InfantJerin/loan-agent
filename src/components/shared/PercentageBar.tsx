import { cn } from '@/lib/utils'

export function PercentageBar({ value, max = 100, color = 'bg-primary', className }: {
  value: number; max?: number; color?: string; className?: string
}) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className={cn('h-2 w-full rounded-full bg-gray-100', className)}>
      <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${pct}%` }} />
    </div>
  )
}
