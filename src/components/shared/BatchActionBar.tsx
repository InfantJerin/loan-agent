import { CheckCircle, X, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BatchActionBar({ count, onApprove, onReject, onClear }: {
  count: number; onApprove?: () => void; onReject?: () => void; onClear: () => void
}) {
  if (count === 0) return null
  return (
    <div className="sticky bottom-8 z-20 mx-auto w-fit rounded-xl border bg-white shadow-lg px-4 py-2 flex items-center gap-3">
      <span className="text-sm font-medium">{count} selected</span>
      {onApprove && (
        <Button size="sm" className="gap-1" onClick={onApprove}>
          <CheckCircle className="h-4 w-4" /> Batch Approve
        </Button>
      )}
      {onReject && (
        <Button size="sm" variant="destructive" className="gap-1" onClick={onReject}>
          <AlertTriangle className="h-4 w-4" /> Batch Reject
        </Button>
      )}
      <Button size="sm" variant="ghost" onClick={onClear}><X className="h-4 w-4" /></Button>
    </div>
  )
}
