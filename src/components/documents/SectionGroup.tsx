import React, { useState } from 'react'
import { ChevronDown, Building2 } from 'lucide-react'
import type {
  ExtractionSectionDef,
  ExtractionSectionResult,
  CitationRef,
  FieldReviewStatus,
} from '@/types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { FieldRenderer } from '@/components/documents/FieldRenderer'
import { SectionApprovalControl } from '@/components/documents/ApprovalControls'

// ── Approval Status Border Color ──

function approvalBorderColor(status: string): string {
  switch (status) {
    case 'approved':
      return 'border-l-green-500'
    case 'rejected':
      return 'border-l-red-500'
    case 'flagged':
    case 'partial':
      return 'border-l-amber-500'
    default:
      return 'border-l-gray-200'
  }
}

// ── Approval Status Badge ──

function ApprovalBadge({ status }: { status: string }) {
  const variants: Record<string, { className: string; label: string }> = {
    approved: { className: 'border-green-200 bg-green-100 text-green-800', label: 'Approved' },
    rejected: { className: 'border-red-200 bg-red-100 text-red-800', label: 'Rejected' },
    flagged: { className: 'border-amber-200 bg-amber-100 text-amber-800', label: 'Flagged' },
    partial: { className: 'border-amber-200 bg-amber-100 text-amber-800', label: 'Partial' },
    pending: { className: 'border-gray-200 bg-gray-100 text-gray-600', label: 'Pending' },
  }

  const v = variants[status] ?? variants.pending
  return (
    <Badge className={cn('text-[10px]', v!.className)}>{v!.label}</Badge>
  )
}

// ── Width Class Helper ──

function widthClass(width?: 'full' | 'half' | 'third'): string {
  switch (width) {
    case 'half':
      return 'col-span-6'
    case 'third':
      return 'col-span-4'
    default:
      return 'col-span-12'
  }
}

// ── SectionGroup ──

interface SectionGroupProps {
  sectionDef: ExtractionSectionDef
  sectionResult: ExtractionSectionResult
  onFieldCitationClick?: (citation: CitationRef) => void
  onFieldStatusChange?: (fieldDefId: string, status: FieldReviewStatus) => void
  onSectionApprove?: () => void
  onSectionReject?: () => void
  onSectionFlag?: () => void
  highlightedFieldId?: string | null
}

export function SectionGroup({
  sectionDef,
  sectionResult,
  onFieldCitationClick,
  onFieldStatusChange,
  onSectionApprove,
  onSectionReject,
  onSectionFlag,
  highlightedFieldId,
}: SectionGroupProps) {
  const [collapsed, setCollapsed] = useState(false)
  const isCollapsible = sectionDef.collapsible ?? false

  return (
    <div
      className={cn(
        'rounded-lg border-l-2',
        approvalBorderColor(sectionResult.approvalStatus)
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <div className="flex items-center gap-2">
          {isCollapsible && (
            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              className="inline-flex items-center justify-center rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label={collapsed ? 'Expand section' : 'Collapse section'}
            >
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  collapsed && '-rotate-90'
                )}
              />
            </button>
          )}
          <h3 className="text-sm font-medium text-gray-800">{sectionDef.label}</h3>
          <ApprovalBadge status={sectionResult.approvalStatus} />
        </div>

        {onSectionApprove && onSectionReject && onSectionFlag && (
          <SectionApprovalControl
            status={sectionResult.approvalStatus}
            onApprove={onSectionApprove}
            onReject={onSectionReject}
            onFlag={onSectionFlag}
          />
        )}
      </div>

      {/* Body */}
      {!collapsed && (
        <div className="px-3 pb-3">
          {/* Fields in grid layout */}
          <div className="grid grid-cols-12 gap-2">
            {sectionDef.fields.map((fieldDef) => {
              const fieldResult = sectionResult.fields.find(
                (f) => f.fieldDefId === fieldDef.id
              )
              if (!fieldResult) return null

              return (
                <div key={fieldDef.id} className={widthClass(fieldDef.width)}>
                  <FieldRenderer
                    fieldDef={fieldDef}
                    fieldResult={fieldResult}
                    onCitationClick={onFieldCitationClick}
                    onStatusChange={
                      onFieldStatusChange
                        ? (status) => onFieldStatusChange(fieldDef.id, status)
                        : undefined
                    }
                    isHighlighted={highlightedFieldId === fieldDef.id}
                  />
                </div>
              )
            })}
          </div>

          {/* Subsections */}
          {sectionDef.subsections && sectionResult.subsections && (
            <div className="mt-3 space-y-2 pl-3">
              {sectionDef.subsections.map((subDef) => {
                const subResult = sectionResult.subsections?.find(
                  (s) => s.sectionDefId === subDef.id
                )
                if (!subResult) return null

                return (
                  <SectionGroup
                    key={subDef.id}
                    sectionDef={subDef}
                    sectionResult={subResult}
                    onFieldCitationClick={onFieldCitationClick}
                    onFieldStatusChange={onFieldStatusChange}
                    highlightedFieldId={highlightedFieldId}
                  />
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── FacilityAccordion ──

interface FacilityAccordionProps {
  sectionDef: ExtractionSectionDef
  sectionResult: ExtractionSectionResult
  defaultOpen?: boolean
  onFieldCitationClick?: (citation: CitationRef) => void
  onFieldStatusChange?: (fieldDefId: string, status: FieldReviewStatus) => void
  onSectionApprove?: () => void
  onSectionReject?: () => void
  onSectionFlag?: () => void
  highlightedFieldId?: string | null
}

export function FacilityAccordion({
  sectionDef,
  sectionResult,
  defaultOpen = false,
  onFieldCitationClick,
  onFieldStatusChange,
  onSectionApprove,
  onSectionReject,
  onSectionFlag,
  highlightedFieldId,
}: FacilityAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  // Extract key stats from fields
  const findFieldValue = (keyword: string): string | null => {
    for (const field of sectionResult.fields) {
      const def = sectionDef.fields.find((d) => d.id === field.fieldDefId)
      if (
        def &&
        (def.id.toLowerCase().includes(keyword) ||
          def.label.toLowerCase().includes(keyword))
      ) {
        return String(field.correctedValue ?? field.extractedValue ?? '')
      }
    }
    return null
  }

  const commitment = findFieldValue('commitment')
  const currency = findFieldValue('currency')
  const maturity = findFieldValue('maturity')

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border bg-white transition-shadow',
        open && 'shadow-md'
      )}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {sectionResult.instanceLabel ?? sectionDef.label}
            </p>
            {(commitment || currency || maturity) && (
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                {commitment && <span>{commitment}</span>}
                {currency && (
                  <>
                    <span className="text-gray-300">&middot;</span>
                    <span>{currency}</span>
                  </>
                )}
                {maturity && (
                  <>
                    <span className="text-gray-300">&middot;</span>
                    <span>Mat. {maturity}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ApprovalBadge status={sectionResult.approvalStatus} />
          <ChevronDown
            className={cn(
              'h-4 w-4 text-gray-400 transition-transform',
              open && 'rotate-180'
            )}
          />
        </div>
      </button>

      {/* Expandable body */}
      {open && (
        <div className="border-t px-4 py-3">
          {/* Section-level approval controls */}
          {onSectionApprove && onSectionReject && onSectionFlag && (
            <div className="mb-3 flex justify-end">
              <SectionApprovalControl
                status={sectionResult.approvalStatus}
                onApprove={onSectionApprove}
                onReject={onSectionReject}
                onFlag={onSectionFlag}
              />
            </div>
          )}

          {/* Fields in grid */}
          <div className="grid grid-cols-12 gap-2">
            {sectionDef.fields.map((fieldDef) => {
              const fieldResult = sectionResult.fields.find(
                (f) => f.fieldDefId === fieldDef.id
              )
              if (!fieldResult) return null

              return (
                <div key={fieldDef.id} className={widthClass(fieldDef.width)}>
                  <FieldRenderer
                    fieldDef={fieldDef}
                    fieldResult={fieldResult}
                    onCitationClick={onFieldCitationClick}
                    onStatusChange={
                      onFieldStatusChange
                        ? (status) => onFieldStatusChange(fieldDef.id, status)
                        : undefined
                    }
                    isHighlighted={highlightedFieldId === fieldDef.id}
                  />
                </div>
              )
            })}
          </div>

          {/* Subsections */}
          {sectionDef.subsections && sectionResult.subsections && (
            <div className="mt-3 space-y-2">
              {sectionDef.subsections.map((subDef) => {
                const subResult = sectionResult.subsections?.find(
                  (s) => s.sectionDefId === subDef.id
                )
                if (!subResult) return null

                return (
                  <SectionGroup
                    key={subDef.id}
                    sectionDef={subDef}
                    sectionResult={subResult}
                    onFieldCitationClick={onFieldCitationClick}
                    onFieldStatusChange={onFieldStatusChange}
                    highlightedFieldId={highlightedFieldId}
                  />
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
