import React, { useState, useRef, useEffect } from 'react'
import { FileText, ExternalLink, ChevronRight, Link2 } from 'lucide-react'
import type { CitationRef } from '@/types'
import { cn } from '@/lib/utils'

interface CitationPopoverProps {
  citations: CitationRef[]
  onViewInDocument?: (citation: CitationRef) => void
}

export function CitationPopover({ citations, onViewInDocument }: CitationPopoverProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  if (citations.length === 0) return null

  const level = citations.length === 1 ? citations[0].level : 'cross_reference'
  const isInferred = level === 'inferred'
  const isCrossRef = level === 'cross_reference' || (citations.length > 1 && !isInferred)

  const iconColor = isInferred
    ? 'text-gray-400'
    : isCrossRef
      ? 'text-purple-500'
      : 'text-blue-500'

  const Icon = isCrossRef ? Link2 : FileText

  return (
    <div className="relative inline-flex" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'inline-flex items-center justify-center rounded p-1 transition-colors hover:bg-gray-100',
          iconColor
        )}
        aria-label="View citations"
      >
        <Icon className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 max-w-sm rounded-xl bg-white p-3 shadow-lg ring-1 ring-black/5">
          {isInferred ? (
            <InferredContent citation={citations[0]} onViewInDocument={onViewInDocument} />
          ) : isCrossRef ? (
            <CrossReferenceContent citations={citations} onViewInDocument={onViewInDocument} />
          ) : (
            <SingleCitationContent citation={citations[0]} onViewInDocument={onViewInDocument} />
          )}
        </div>
      )}
    </div>
  )
}

function SingleCitationContent({
  citation,
  onViewInDocument,
}: {
  citation: CitationRef
  onViewInDocument?: (citation: CitationRef) => void
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-700">Citation</p>
      <blockquote className="border-l-2 border-blue-300 pl-2 text-xs text-gray-600 italic">
        {citation.snippetText}
      </blockquote>
      <div className="flex items-center gap-2 text-[11px] text-gray-500">
        <span>{citation.sectionRef}</span>
        <span className="text-gray-300">|</span>
        <span>Page {citation.pageNumber}</span>
      </div>
      {onViewInDocument && (
        <button
          type="button"
          onClick={() => onViewInDocument(citation)}
          className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
        >
          <ExternalLink className="h-3 w-3" />
          View in Document
        </button>
      )}
    </div>
  )
}

function CrossReferenceContent({
  citations,
  onViewInDocument,
}: {
  citations: CitationRef[]
  onViewInDocument?: (citation: CitationRef) => void
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-purple-700">Cross-Reference Chain</p>
      <div className="space-y-1.5">
        {citations.map((citation, idx) => (
          <div
            key={citation.id}
            className="rounded-lg border border-gray-100 bg-gray-50/50 p-2"
          >
            <div className="mb-1 flex items-center gap-1.5">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] font-semibold text-purple-700">
                {idx + 1}
              </span>
              <span className="text-[11px] font-medium text-gray-700">
                {citation.label}
              </span>
            </div>
            <blockquote className="mb-1 border-l-2 border-purple-200 pl-2 text-[11px] text-gray-600 italic">
              {citation.snippetText}
            </blockquote>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400">
                {citation.sectionRef} &middot; Page {citation.pageNumber}
              </span>
              {onViewInDocument && (
                <button
                  type="button"
                  onClick={() => onViewInDocument(citation)}
                  className="inline-flex items-center gap-0.5 text-[10px] font-medium text-purple-600 hover:text-purple-800"
                >
                  Jump to
                  <ChevronRight className="h-2.5 w-2.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InferredContent({
  citation,
  onViewInDocument,
}: {
  citation?: CitationRef
  onViewInDocument?: (citation: CitationRef) => void
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-500">Inferred Value</p>
      <p className="text-xs text-gray-500">
        Value inferred from context &mdash; no direct citation
      </p>
      {citation?.snippetText && (
        <blockquote className="border-l-2 border-gray-200 pl-2 text-xs text-gray-500 italic">
          {citation.snippetText}
        </blockquote>
      )}
      {citation && onViewInDocument && (
        <button
          type="button"
          onClick={() => onViewInDocument(citation)}
          className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
          <ExternalLink className="h-3 w-3" />
          View in Document
        </button>
      )}
    </div>
  )
}
