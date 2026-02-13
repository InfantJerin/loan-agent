import { FileText, User, Building2, Calendar, Shield, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { ExtractionResult, Document } from '@/types'

const APPROVAL_CONFIG: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  approved: { label: 'Approved', color: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle2 },
  pending: { label: 'Not Started', color: 'bg-gray-100 text-gray-800 border-gray-300', icon: Clock },
  partial: { label: 'In Progress', color: 'bg-amber-100 text-amber-800 border-amber-300', icon: AlertTriangle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-300', icon: AlertTriangle },
  flagged: { label: 'Flagged', color: 'bg-orange-100 text-orange-800 border-orange-300', icon: AlertTriangle },
}

interface AgreementSummaryCardProps {
  extraction: ExtractionResult
  document: Document
  dealName?: string
  borrowerName?: string
  schemaName?: string
}

export function AgreementSummaryCard({ extraction, document, dealName, borrowerName, schemaName }: AgreementSummaryCardProps) {
  const approvalInfo = APPROVAL_CONFIG[extraction.overallApproval] || APPROVAL_CONFIG.pending
  const ApprovalIcon = approvalInfo.icon
  const completionPct = extraction.totalSections > 0 ? (extraction.completedSections / extraction.totalSections) * 100 : 0
  const confidencePct = Math.round(extraction.overallConfidence * 100)

  // Count field stats from sections
  let totalFields = 0
  let confirmedFields = 0
  let flaggedFields = 0
  const countFields = (sections: typeof extraction.sections) => {
    sections.forEach(s => {
      s.fields.forEach(f => {
        totalFields++
        if (f.status === 'confirmed' || f.status === 'corrected') confirmedFields++
        if (f.status === 'flagged') flaggedFields++
      })
      if (s.subsections) countFields(s.subsections)
    })
  }
  countFields(extraction.sections)

  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left: Document info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{schemaName || document.type.replace(/_/g, ' ')}</span>
            </div>
            <h2 className="text-lg font-semibold truncate">{document.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              {borrowerName && (
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {borrowerName}
                </span>
              )}
              {dealName && (
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {dealName}
                </span>
              )}
              {document.pages && (
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {document.pages} pages
                </span>
              )}
              {extraction.assignedTo && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Assigned to {extraction.assignedTo}
                </span>
              )}
            </div>
          </div>

          {/* Right: Approval status */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge className={cn('gap-1.5 px-3 py-1', approvalInfo.color)}>
              <ApprovalIcon className="h-3.5 w-3.5" />
              {approvalInfo.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {extraction.completedSections}/{extraction.totalSections} sections reviewed
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Review Progress</div>
            <div className="flex items-center gap-2">
              <Progress value={completionPct} className="h-2 flex-1" />
              <span className="text-sm font-medium">{Math.round(completionPct)}%</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Overall Confidence</div>
            <div className="flex items-center gap-1.5">
              <Shield className={cn('h-4 w-4', confidencePct >= 95 ? 'text-green-600' : confidencePct >= 80 ? 'text-amber-600' : 'text-red-600')} />
              <span className="text-sm font-semibold">{confidencePct}%</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Fields Reviewed</div>
            <span className="text-sm font-semibold">{confirmedFields}/{totalFields}</span>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Flagged Items</div>
            <span className={cn('text-sm font-semibold', flaggedFields > 0 ? 'text-red-600' : 'text-green-600')}>
              {flaggedFields > 0 ? `${flaggedFields} issues` : 'None'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
