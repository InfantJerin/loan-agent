import React from 'react'
import { Check, X, Flag, Pencil, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { FieldReviewStatus, ApprovalStatus } from '@/types'

// ── Field-Level Approval ──

interface FieldApprovalControlProps {
  status: FieldReviewStatus
  onStatusChange: (status: FieldReviewStatus) => void
}

export function FieldApprovalControl({ status, onStatusChange }: FieldApprovalControlProps) {
  return (
    <div className="inline-flex items-center gap-0.5">
      <button
        type="button"
        onClick={() => onStatusChange(status === 'confirmed' ? 'unreviewed' : 'confirmed')}
        className={cn(
          'inline-flex h-6 w-6 items-center justify-center rounded transition-colors',
          status === 'confirmed'
            ? 'bg-green-100 text-green-700'
            : 'text-gray-300 hover:bg-green-50 hover:text-green-500'
        )}
        aria-label="Confirm field"
      >
        <Check className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        className={cn(
          'inline-flex h-6 w-6 items-center justify-center rounded transition-colors',
          status === 'corrected'
            ? 'bg-amber-100 text-amber-700'
            : 'text-gray-300 hover:bg-amber-50 hover:text-amber-500'
        )}
        aria-label="Corrected field"
      >
        <Pencil className="h-3 w-3" />
      </button>

      <button
        type="button"
        onClick={() => onStatusChange(status === 'flagged' ? 'unreviewed' : 'flagged')}
        className={cn(
          'inline-flex h-6 w-6 items-center justify-center rounded transition-colors',
          status === 'flagged'
            ? 'bg-red-100 text-red-700'
            : 'text-gray-300 hover:bg-red-50 hover:text-red-500'
        )}
        aria-label="Flag field"
      >
        <Flag className="h-3 w-3" />
      </button>
    </div>
  )
}

// ── Section-Level Approval ──

interface SectionApprovalControlProps {
  status: ApprovalStatus
  label?: string
  onApprove: () => void
  onReject: () => void
  onFlag: () => void
}

export function SectionApprovalControl({
  status,
  label,
  onApprove,
  onReject,
  onFlag,
}: SectionApprovalControlProps) {
  if (status === 'approved') {
    return (
      <div className="inline-flex items-center gap-2">
        <Badge className="border-green-200 bg-green-100 text-green-800">
          <Check className="mr-1 h-3 w-3" />
          Approved
        </Badge>
        <button
          type="button"
          onClick={onReject}
          className="inline-flex items-center gap-0.5 text-[11px] text-gray-400 hover:text-gray-600"
        >
          <Undo2 className="h-3 w-3" />
          Undo
        </button>
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className="inline-flex items-center gap-2">
        <Badge className="border-red-200 bg-red-100 text-red-800">
          <X className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
        <button
          type="button"
          onClick={onApprove}
          className="inline-flex items-center gap-0.5 text-[11px] text-gray-400 hover:text-gray-600"
        >
          <Undo2 className="h-3 w-3" />
          Undo
        </button>
      </div>
    )
  }

  if (status === 'flagged') {
    return (
      <div className="inline-flex items-center gap-2">
        <Badge className="border-amber-200 bg-amber-100 text-amber-800">
          <Flag className="mr-1 h-3 w-3" />
          Flagged
        </Badge>
        <button
          type="button"
          onClick={onApprove}
          className="inline-flex items-center gap-0.5 text-[11px] text-gray-400 hover:text-gray-600"
        >
          <Undo2 className="h-3 w-3" />
          Undo
        </button>
      </div>
    )
  }

  if (status === 'partial') {
    return (
      <div className="inline-flex items-center gap-2">
        <Badge className="border-amber-200 bg-amber-100 text-amber-800">
          Partially Approved
        </Badge>
      </div>
    )
  }

  // status === 'pending'
  return (
    <div className="inline-flex items-center gap-1.5">
      <Button
        variant="outline"
        size="sm"
        onClick={onApprove}
        className="h-7 border-green-200 text-green-700 hover:bg-green-50"
      >
        <Check className="mr-1 h-3 w-3" />
        Approve{label ? ` ${label}` : ' Section'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onFlag}
        className="h-7 border-amber-200 text-amber-700 hover:bg-amber-50"
      >
        <Flag className="mr-1 h-3 w-3" />
        Flag for Review
      </Button>
    </div>
  )
}
