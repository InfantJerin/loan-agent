import { Clock, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from './StatusBadge'
import { PriorityIndicator } from './PriorityIndicator'
import { DealLink } from './DealLink'
import { formatRelativeDate } from '@/lib/format'
import { getDealById } from '@/data'
import type { Task } from '@/types'

export function TaskCard({ task, onAction }: { task: Task; onAction?: (taskId: string, action: string) => void }) {
  const deal = task.dealId ? getDealById(task.dealId) : null

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <PriorityIndicator priority={task.priority} />
            <StatusBadge status={task.status} />
          </div>
          <h4 className="text-sm font-medium truncate">{task.title}</h4>
          {deal && (
            <div className="text-xs text-muted-foreground mt-1">
              <DealLink dealId={deal.id}>{deal.name}</DealLink>
            </div>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Due {formatRelativeDate(task.dueDate)}
            </span>
            <span className="capitalize">{task.category.replace(/_/g, ' ')}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {task.type === 'approval' && (
            <>
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => onAction?.(task.id, 'reject')}>Reject</Button>
              <Button size="sm" className="h-7 text-xs" onClick={() => onAction?.(task.id, 'approve')}>Approve</Button>
            </>
          )}
          {task.type === 'review' && (
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => onAction?.(task.id, 'review')}>
              Review <ArrowRight className="h-3 w-3" />
            </Button>
          )}
          {task.type === 'escalation' && (
            <Button size="sm" variant="destructive" className="h-7 text-xs gap-1" onClick={() => onAction?.(task.id, 'escalate')}>
              <AlertTriangle className="h-3 w-3" /> Escalate
            </Button>
          )}
          {task.type === 'action' && (
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => onAction?.(task.id, 'action')}>
              <CheckCircle className="h-3 w-3" /> Process
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
