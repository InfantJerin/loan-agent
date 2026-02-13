import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { CitationRef, Document } from '@/types'

interface DocumentViewerProps {
  document: Document
  activeCitations?: CitationRef[]
  highlightedCitationId?: string | null
  onCitationNavigate?: (citation: CitationRef) => void
}

export function DocumentViewer({ document, activeCitations = [], highlightedCitationId, onCitationNavigate }: DocumentViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const totalPages = document.pages || 1

  // Find the citation that's currently highlighted to auto-navigate
  const highlightedCitation = activeCitations.find(c => c.id === highlightedCitationId)
  const currentCitationIndex = highlightedCitation ? activeCitations.indexOf(highlightedCitation) : -1

  // Simulated page content — in a real app this would be a PDF/image renderer
  const simulatedSections = [
    { y: 60, text: 'AMENDED AND RESTATED CREDIT AGREEMENT', style: 'font-bold text-base' },
    { y: 95, text: 'dated as of March 15, 2024', style: 'text-sm italic' },
    { y: 130, text: 'among', style: 'text-xs text-center' },
    { y: 155, text: 'MERIDIAN HOLDINGS CORP.,', style: 'font-semibold text-sm' },
    { y: 175, text: 'as Borrower,', style: 'text-xs italic' },
    { y: 210, text: 'THE LENDERS PARTY HERETO,', style: 'font-semibold text-sm' },
    { y: 245, text: 'JPMORGAN CHASE BANK, N.A.,', style: 'font-semibold text-sm' },
    { y: 265, text: 'as Administrative Agent', style: 'text-xs italic' },
    { y: 320, text: 'ARTICLE I — DEFINITIONS', style: 'font-bold text-sm mt-4' },
    { y: 350, text: 'Section 1.01. Defined Terms. As used in this Agreement, the following terms have the meanings specified below:', style: 'text-xs leading-relaxed' },
    { y: 400, text: '"Applicable Rate" means, for any day, the rate per annum set forth below in the applicable row:', style: 'text-xs leading-relaxed' },
    { y: 440, text: 'Pricing Level | Total Leverage Ratio | Term SOFR Spread | Base Rate Spread', style: 'text-[10px] font-mono' },
    { y: 460, text: 'Level I      | < 2.50x             | 1.75%            | 0.75%', style: 'text-[10px] font-mono' },
    { y: 475, text: 'Level II     | ≥ 2.50x and < 3.50x | 2.00%            | 1.00%', style: 'text-[10px] font-mono' },
    { y: 490, text: 'Level III    | ≥ 3.50x and < 4.50x | 2.25%            | 1.25%', style: 'text-[10px] font-mono' },
    { y: 505, text: 'Level IV     | ≥ 4.50x             | 2.50%            | 1.50%', style: 'text-[10px] font-mono' },
    { y: 545, text: '"Term SOFR Rate" means, with respect to any Term SOFR Borrowing and for any Interest Period...', style: 'text-xs leading-relaxed' },
    { y: 590, text: 'ARTICLE II — THE COMMITMENTS', style: 'font-bold text-sm mt-4' },
    { y: 620, text: 'Section 2.01. Commitments. (a) Revolving Credit Commitment. Subject to the terms and conditions...', style: 'text-xs leading-relaxed' },
    { y: 660, text: 'each Revolving Credit Lender agrees to make Revolving Credit Loans in an aggregate principal amount', style: 'text-xs leading-relaxed' },
    { y: 680, text: 'not to exceed $750,000,000 (the "Revolving Credit Commitment").', style: 'text-xs leading-relaxed' },
    { y: 720, text: 'Section 2.05. Fees. (a) Commitment Fee. The Borrower agrees to pay to the Administrative Agent...', style: 'text-xs leading-relaxed' },
    { y: 750, text: 'a commitment fee at a rate equal to 0.30% per annum on the average daily unused amount...', style: 'text-xs leading-relaxed' },
  ]

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border-b shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium truncate max-w-[200px]">{document.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setZoom(z => Math.max(50, z - 10))}>
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs text-muted-foreground w-10 text-center">{zoom}%</span>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setZoom(z => Math.min(200, z + 10))}>
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Citation navigator */}
      {activeCitations.length > 0 && (
        <div className="flex items-center justify-between px-3 py-1.5 bg-indigo-50 border-b shrink-0">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 text-[10px]">
              {activeCitations.length} citation{activeCitations.length !== 1 ? 's' : ''}
            </Badge>
            {highlightedCitation && (
              <span className="text-xs text-indigo-700 font-medium">
                {currentCitationIndex + 1} of {activeCitations.length} — {highlightedCitation.label}
              </span>
            )}
          </div>
          {activeCitations.length > 1 && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost" size="sm" className="h-6 w-6 p-0"
                disabled={currentCitationIndex <= 0}
                onClick={() => onCitationNavigate?.(activeCitations[currentCitationIndex - 1])}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost" size="sm" className="h-6 w-6 p-0"
                disabled={currentCitationIndex >= activeCitations.length - 1}
                onClick={() => onCitationNavigate?.(activeCitations[currentCitationIndex + 1])}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Document canvas */}
      <div className="flex-1 overflow-auto p-4">
        <div
          className="bg-white shadow-lg rounded mx-auto relative"
          style={{
            width: 595 * (zoom / 100),
            minHeight: 842 * (zoom / 100),
            padding: `${50 * (zoom / 100)}px`,
            transform: `scale(1)`,
            transformOrigin: 'top center',
          }}
        >
          {/* Simulated document text */}
          {simulatedSections.map((section, i) => (
            <div
              key={i}
              className={cn('absolute left-[50px] right-[50px]', section.style)}
              style={{ top: section.y * (zoom / 100), fontSize: `${(zoom / 100)}em` }}
            >
              {section.text}
            </div>
          ))}

          {/* Citation highlight overlays */}
          {activeCitations.map(citation => citation.boundingBox && (
            <div
              key={citation.id}
              className={cn(
                'absolute border-2 rounded-sm transition-all',
                citation.id === highlightedCitationId
                  ? 'border-indigo-500 bg-indigo-500/15 shadow-sm'
                  : 'border-indigo-300/50 bg-indigo-100/20'
              )}
              style={{
                left: citation.boundingBox.x * (zoom / 100),
                top: citation.boundingBox.y * (zoom / 100),
                width: citation.boundingBox.width * (zoom / 100),
                height: citation.boundingBox.height * (zoom / 100),
              }}
            >
              {citation.id === highlightedCitationId && (
                <div className="absolute -top-5 left-0 bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap">
                  {citation.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Page navigation */}
      <div className="flex items-center justify-center gap-2 px-3 py-2 bg-white border-t shrink-0">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" disabled={currentPage <= 1} onClick={() => setCurrentPage(p => p - 1)}>
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>
        <span className="text-xs text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}>
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
