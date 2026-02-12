import { cn } from '@/lib/utils'
import { EVENT_TYPE_COLORS } from '@/lib/constants'
import { formatDate, formatCurrency } from '@/lib/format'
import { DealLink } from './DealLink'
import { getDealById } from '@/data'
import type { LoanEvent } from '@/types'

export function TimelineEvent({ event }: { event: LoanEvent }) {
  const deal = getDealById(event.dealId)
  return (
    <div className="flex items-start gap-3 py-2">
      <div className={cn('h-3 w-3 rounded-full mt-1 shrink-0', EVENT_TYPE_COLORS[event.type] || 'bg-gray-400')} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{event.title}</div>
        <div className="text-xs text-muted-foreground">{event.description}</div>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          {deal && <DealLink dealId={deal.id}>{deal.name}</DealLink>}
          <span>{formatDate(event.date)}</span>
          {event.amount && <span>{formatCurrency(event.amount)}</span>}
        </div>
      </div>
      <span className={cn('text-xs px-2 py-0.5 rounded-full', event.status === 'overdue' ? 'bg-red-100 text-red-700' : event.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700')}>
        {event.status}
      </span>
    </div>
  )
}
