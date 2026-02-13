import React, { useState } from 'react'
import type {
  ExtractionFieldDef,
  ExtractionFieldResult,
  FieldReviewStatus,
  CitationRef,
} from '@/types'
import { cn } from '@/lib/utils'
import { CitationPopover } from '@/components/documents/CitationPopover'
import { FieldApprovalControl } from '@/components/documents/ApprovalControls'

// ── Main Dispatcher ──

interface FieldRendererProps {
  fieldDef: ExtractionFieldDef
  fieldResult: ExtractionFieldResult
  onCorrectionChange?: (value: string) => void
  onStatusChange?: (status: FieldReviewStatus) => void
  onCitationClick?: (citation: CitationRef) => void
  isHighlighted?: boolean
}

export function FieldRenderer({
  fieldDef,
  fieldResult,
  onCorrectionChange,
  onStatusChange,
  onCitationClick,
  isHighlighted,
}: FieldRendererProps) {
  switch (fieldDef.type) {
    case 'table':
      return (
        <TableFieldRenderer
          fieldDef={fieldDef}
          fieldResult={fieldResult}
          onCitationClick={onCitationClick}
          onStatusChange={onStatusChange}
          isHighlighted={isHighlighted}
        />
      )
    case 'formula':
      return (
        <FormulaFieldRenderer
          fieldDef={fieldDef}
          fieldResult={fieldResult}
          onCitationClick={onCitationClick}
          onStatusChange={onStatusChange}
          isHighlighted={isHighlighted}
        />
      )
    case 'conditional':
      return (
        <ConditionalFieldRenderer
          fieldDef={fieldDef}
          fieldResult={fieldResult}
          onCitationClick={onCitationClick}
          onStatusChange={onStatusChange}
          isHighlighted={isHighlighted}
        />
      )
    default:
      return (
        <SimpleFieldRenderer
          fieldDef={fieldDef}
          fieldResult={fieldResult}
          onCorrectionChange={onCorrectionChange}
          onStatusChange={onStatusChange}
          onCitationClick={onCitationClick}
          isHighlighted={isHighlighted}
        />
      )
  }
}

// ── Confidence Dot ──

function ConfidenceDot({ confidence }: { confidence: 'high' | 'medium' | 'low' }) {
  const color =
    confidence === 'high'
      ? 'bg-green-500'
      : confidence === 'medium'
        ? 'bg-amber-500'
        : 'bg-red-500'

  return (
    <span
      className={cn('inline-block h-2 w-2 shrink-0 rounded-full', color)}
      title={`Confidence: ${confidence}`}
    />
  )
}

// ── Border Color by Review Status ──

function statusBorderColor(status: FieldReviewStatus): string {
  switch (status) {
    case 'confirmed':
      return 'border-l-green-500'
    case 'corrected':
      return 'border-l-amber-500'
    case 'flagged':
      return 'border-l-red-500'
    default:
      return 'border-l-gray-200'
  }
}

// ── Simple Field Renderer ──

function SimpleFieldRenderer({
  fieldDef,
  fieldResult,
  onCorrectionChange,
  onStatusChange,
  onCitationClick,
  isHighlighted,
}: FieldRendererProps) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(
    String(fieldResult.correctedValue ?? fieldResult.extractedValue ?? '')
  )

  const displayValue = fieldResult.correctedValue ?? fieldResult.extractedValue
  const hasCorrected = fieldResult.correctedValue != null && fieldResult.correctedValue !== fieldResult.extractedValue

  const handleBlur = () => {
    setEditing(false)
    if (editValue !== String(fieldResult.extractedValue) && onCorrectionChange) {
      onCorrectionChange(editValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur()
    }
    if (e.key === 'Escape') {
      setEditValue(String(fieldResult.correctedValue ?? fieldResult.extractedValue ?? ''))
      setEditing(false)
    }
  }

  return (
    <div
      className={cn(
        'flex items-start justify-between gap-2 rounded-lg border-l-2 px-3 py-2 transition-all',
        statusBorderColor(fieldResult.status),
        isHighlighted && 'ring-2 ring-primary bg-primary/5'
      )}
    >
      {/* Left: label + value */}
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 text-xs text-muted-foreground">{fieldDef.label}</p>

        {fieldDef.type === 'boolean' ? (
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'inline-flex h-4 w-4 items-center justify-center rounded border text-[10px]',
                displayValue === true || displayValue === 'true'
                  ? 'border-green-400 bg-green-50 text-green-700'
                  : 'border-gray-300 bg-gray-50 text-gray-400'
              )}
            >
              {displayValue === true || displayValue === 'true' ? '\u2713' : ''}
            </span>
            <span className="text-sm">
              {displayValue === true || displayValue === 'true' ? 'Yes' : 'No'}
            </span>
          </div>
        ) : fieldDef.editable && editing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full rounded border border-gray-300 bg-white px-1.5 py-0.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        ) : (
          <div
            className={cn(
              'text-sm',
              fieldDef.editable && 'cursor-text rounded px-1.5 py-0.5 hover:bg-gray-50'
            )}
            onClick={() => fieldDef.editable && setEditing(true)}
          >
            {hasCorrected ? (
              <span className="flex items-center gap-2">
                <span className="text-gray-400 line-through">
                  {String(fieldResult.extractedValue)}
                </span>
                <span className="font-medium text-amber-700">
                  {String(fieldResult.correctedValue)}
                </span>
              </span>
            ) : (
              <span>{displayValue != null ? String(displayValue) : '\u2014'}</span>
            )}
          </div>
        )}
      </div>

      {/* Right: confidence, citation, approval */}
      <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
        <ConfidenceDot confidence={fieldResult.confidence} />
        <CitationPopover
          citations={fieldResult.citations}
          onViewInDocument={onCitationClick}
        />
        {onStatusChange && (
          <FieldApprovalControl
            status={fieldResult.status}
            onStatusChange={onStatusChange}
          />
        )}
      </div>
    </div>
  )
}

// ── Table Field Renderer ──

function TableFieldRenderer({
  fieldDef,
  fieldResult,
  onCitationClick,
  onStatusChange,
  isHighlighted,
}: Omit<FieldRendererProps, 'onCorrectionChange'>) {
  const columns = fieldDef.columns ?? []
  const rows = fieldResult.tableData ?? []

  return (
    <div
      className={cn(
        'rounded-lg border-l-2 px-3 py-2',
        statusBorderColor(fieldResult.status),
        isHighlighted && 'ring-2 ring-primary bg-primary/5'
      )}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{fieldDef.label}</p>
        <div className="flex items-center gap-1.5">
          <ConfidenceDot confidence={fieldResult.confidence} />
          <CitationPopover
            citations={fieldResult.citations}
            onViewInDocument={onCitationClick}
          />
          {onStatusChange && (
            <FieldApprovalControl
              status={fieldResult.status}
              onStatusChange={onStatusChange}
            />
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="border border-gray-200 bg-gray-50 px-2 py-1 text-left font-medium text-gray-600"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={rowIdx % 2 === 1 ? 'bg-gray-50/50' : ''}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="border border-gray-200 px-2 py-1 text-gray-700"
                  >
                    {row[col.key] != null ? String(row[col.key]) : '\u2014'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Formula Field Renderer ──

function FormulaFieldRenderer({
  fieldDef,
  fieldResult,
  onCitationClick,
  onStatusChange,
  isHighlighted,
}: Omit<FieldRendererProps, 'onCorrectionChange'>) {
  return (
    <div
      className={cn(
        'rounded-lg border-l-2 bg-indigo-50/50 px-3 py-2',
        statusBorderColor(fieldResult.status),
        isHighlighted && 'ring-2 ring-primary bg-primary/5'
      )}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{fieldDef.label}</p>
        <div className="flex items-center gap-1.5">
          <ConfidenceDot confidence={fieldResult.confidence} />
          <CitationPopover
            citations={fieldResult.citations}
            onViewInDocument={onCitationClick}
          />
          {onStatusChange && (
            <FieldApprovalControl
              status={fieldResult.status}
              onStatusChange={onStatusChange}
            />
          )}
        </div>
      </div>

      {fieldResult.formulaDisplay && (
        <div className="mb-1 rounded bg-indigo-100/60 px-2 py-1 font-mono text-xs text-indigo-800">
          {fieldResult.formulaDisplay}
        </div>
      )}

      <div className="text-sm font-medium text-gray-900">
        = {fieldResult.extractedValue != null ? String(fieldResult.extractedValue) : '\u2014'}
      </div>
    </div>
  )
}

// ── Conditional Field Renderer ──

function ConditionalFieldRenderer({
  fieldDef,
  fieldResult,
  onCitationClick,
  onStatusChange,
  isHighlighted,
}: Omit<FieldRendererProps, 'onCorrectionChange'>) {
  const conditions = fieldResult.conditions ?? []

  return (
    <div
      className={cn(
        'rounded-lg border-l-2 px-3 py-2',
        statusBorderColor(fieldResult.status),
        isHighlighted && 'ring-2 ring-primary bg-primary/5'
      )}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{fieldDef.label}</p>
        <div className="flex items-center gap-1.5">
          <ConfidenceDot confidence={fieldResult.confidence} />
          {onStatusChange && (
            <FieldApprovalControl
              status={fieldResult.status}
              onStatusChange={onStatusChange}
            />
          )}
        </div>
      </div>

      <div className="space-y-1 pl-2">
        {conditions.map((cond, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 border-l border-gray-200 pl-3 py-0.5"
          >
            <div className="min-w-0 flex-1 text-xs">
              <span className="text-gray-500">If </span>
              <span className="font-medium text-gray-700">{cond.condition}</span>
              <span className="mx-1 text-gray-400">&rarr;</span>
              <span className="font-medium text-gray-900">{cond.value}</span>
            </div>
            {cond.citations.length > 0 && (
              <CitationPopover
                citations={cond.citations}
                onViewInDocument={onCitationClick}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
