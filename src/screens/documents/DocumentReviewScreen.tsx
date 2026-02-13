import { useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels'
import { ArrowLeft, CheckCircle2, XCircle, Flag, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AgreementSummaryCard } from '@/components/documents/AgreementSummaryCard'
import { ExtractionSchemaRenderer } from '@/components/documents/ExtractionSchemaRenderer'
import { DocumentViewer } from '@/components/documents/DocumentViewer'
import { getDocumentById, getDealById, getBorrowerById } from '@/data'
import { getExtractionResultByDocumentId } from '@/data/extraction-results'
import { getSchemaByCategory } from '@/data/extraction-schemas'
import type { CitationRef, FieldReviewStatus, DocumentCategory, ExtractionSectionResult } from '@/types'

export function DocumentReviewScreen() {
  const { documentId } = useParams<{ documentId: string }>()
  const navigate = useNavigate()

  const document = documentId ? getDocumentById(documentId) : null
  const extraction = documentId ? getExtractionResultByDocumentId(documentId) : null
  const deal = document?.dealId ? getDealById(document.dealId) : null
  const borrower = deal ? getBorrowerById(deal.borrowerId) : null
  const schema = extraction ? getSchemaByCategory(document?.type as DocumentCategory) : null

  // Active citations for the document viewer
  const [activeCitations, setActiveCitations] = useState<CitationRef[]>([])
  const [highlightedCitationId, setHighlightedCitationId] = useState<string | null>(null)
  const [highlightedFieldId, setHighlightedFieldId] = useState<string | null>(null)

  const handleFieldCitationClick = useCallback((citation: CitationRef) => {
    // Collect all citations from the same field for multi-citation navigation
    if (!extraction) return
    const fieldCitations: CitationRef[] = []
    const findCitations = (sections: ExtractionSectionResult[]) => {
      sections.forEach((s: ExtractionSectionResult) => {
        s.fields.forEach((f) => {
          if (f.citations.some((c) => c.id === citation.id)) {
            fieldCitations.push(...f.citations)
          }
        })
        if (s.subsections) findCitations(s.subsections)
      })
    }
    findCitations(extraction.sections)

    setActiveCitations(fieldCitations.length > 0 ? fieldCitations : [citation])
    setHighlightedCitationId(citation.id)
  }, [extraction])

  const handleCitationNavigate = useCallback((citation: CitationRef) => {
    setHighlightedCitationId(citation.id)
  }, [])

  const handleFieldStatusChange = useCallback((_sectionIndex: number, fieldDefId: string, _status: FieldReviewStatus) => {
    // In a real app this would update state. For the mockup, just highlight the field.
    setHighlightedFieldId(fieldDefId)
    setTimeout(() => setHighlightedFieldId(null), 2000)
  }, [])

  if (!document || !extraction || !schema) {
    return (
      <div className="p-6">
        <Button variant="ghost" className="gap-2 mb-4" onClick={() => navigate('/documents')}>
          <ArrowLeft className="h-4 w-4" /> Back to Documents
        </Button>
        <div className="text-center py-20 text-muted-foreground">
          {!document ? 'Document not found.' : 'No extraction data available for this document.'}
        </div>
      </div>
    )
  }

  // Count review stats
  const stats = useMemo(() => {
    let unreviewed = 0
    let confirmed = 0
    let corrected = 0
    let flagged = 0
    const count = (sections: ExtractionSectionResult[]) => {
      sections.forEach((s: ExtractionSectionResult) => {
        s.fields.forEach((f) => {
          if (f.status === 'unreviewed') unreviewed++
          else if (f.status === 'confirmed') confirmed++
          else if (f.status === 'corrected') corrected++
          else if (f.status === 'flagged') flagged++
        })
        if (s.subsections) count(s.subsections)
      })
    }
    count(extraction.sections)
    return { unreviewed, confirmed, corrected, flagged, total: unreviewed + confirmed + corrected + flagged }
  }, [extraction])

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Top bar */}
      <div className="shrink-0 border-b bg-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => navigate('/documents')}>
            <ArrowLeft className="h-4 w-4" /> Documents
          </Button>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm font-medium">{document.name}</span>
          {deal && (
            <>
              <div className="h-4 w-px bg-border" />
              <Badge variant="outline" className="text-xs">{deal.name.split(' ').slice(0, 3).join(' ')}</Badge>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 mr-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500" /> {stats.confirmed} confirmed
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> {stats.corrected} corrected
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" /> {stats.flagged} flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-gray-300" /> {stats.unreviewed} pending
            </span>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset Review
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-red-600 hover:text-red-700">
            <XCircle className="h-3.5 w-3.5" /> Reject
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-amber-600 hover:text-amber-700">
            <Flag className="h-3.5 w-3.5" /> Flag for Review
          </Button>
          <Button size="sm" className="gap-1.5 bg-green-600 hover:bg-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" /> Approve Extraction
          </Button>
        </div>
      </div>

      {/* Split view */}
      <div className="flex-1 min-h-0">
        <PanelGroup orientation="horizontal">
          {/* Left: Extraction review */}
          <Panel defaultSize="50%" minSize="35%">
            <div className="h-full overflow-auto">
              <div className="p-4 space-y-4">
                {/* Summary card */}
                <AgreementSummaryCard
                  extraction={extraction}
                  document={document}
                  dealName={deal?.name}
                  borrowerName={borrower?.name}
                  schemaName={schema.name}
                />

                {/* Schema-driven sections */}
                <ExtractionSchemaRenderer
                  schema={schema}
                  extraction={extraction}
                  onFieldCitationClick={handleFieldCitationClick}
                  onFieldStatusChange={handleFieldStatusChange}
                  highlightedFieldId={highlightedFieldId}
                />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-border hover:bg-primary/20 transition-colors cursor-col-resize" />

          {/* Right: Document viewer */}
          <Panel defaultSize="50%" minSize="30%">
            <DocumentViewer
              document={document}
              activeCitations={activeCitations}
              highlightedCitationId={highlightedCitationId}
              onCitationNavigate={handleCitationNavigate}
            />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}
