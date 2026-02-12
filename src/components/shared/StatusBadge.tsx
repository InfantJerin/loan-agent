import { Badge } from '@/components/ui/badge'
import { STATUS_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorClass = STATUS_COLORS[status] || STATUS_COLORS[status.replace(/\s+/g, '_')] || 'bg-gray-100 text-gray-800'
  return (
    <Badge variant="secondary" className={cn(colorClass, 'capitalize border-0', className)}>
      {status.replace(/_/g, ' ')}
    </Badge>
  )
}
