import { PRIORITY_COLORS, PRIORITY_TEXT_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { TaskPriority } from '@/types'

export function PriorityIndicator({ priority, showLabel = true }: { priority: TaskPriority; showLabel?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn('h-2 w-2 rounded-full', PRIORITY_COLORS[priority])} />
      {showLabel && <span className={cn('text-xs font-medium capitalize', PRIORITY_TEXT_COLORS[priority])}>{priority}</span>}
    </div>
  )
}
