import { cn } from '@/lib/utils'
import { CONFIDENCE_COLORS, getConfidenceLevel } from '@/lib/constants'

export function ConfidenceBadge({ score }: { score: number }) {
  const level = getConfidenceLevel(score)
  return (
    <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', CONFIDENCE_COLORS[level])}>
      {(score * 100).toFixed(0)}%
    </span>
  )
}
