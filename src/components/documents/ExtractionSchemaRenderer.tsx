import { SectionGroup, FacilityAccordion } from '@/components/documents/SectionGroup'
import type { ExtractionSchema, ExtractionResult, CitationRef, FieldReviewStatus } from '@/types'

interface ExtractionSchemaRendererProps {
  schema: ExtractionSchema
  extraction: ExtractionResult
  onFieldCitationClick?: (citation: CitationRef) => void
  onFieldStatusChange?: (sectionIndex: number, fieldDefId: string, status: FieldReviewStatus) => void
  highlightedFieldId?: string | null
}

export function ExtractionSchemaRenderer({
  schema,
  extraction,
  onFieldCitationClick,
  onFieldStatusChange,
  highlightedFieldId,
}: ExtractionSchemaRendererProps) {
  // Determine which facilities should default open: first one + any pending/flagged
  const shouldDefaultOpen = (sectionResult: typeof extraction.sections[0], index: number) => {
    const def = schema.sections.find(d => d.id === sectionResult.sectionDefId)
    if (!def?.repeatable) return false
    const firstIdx = extraction.sections.findIndex(s => {
      const d = schema.sections.find(sd => sd.id === s.sectionDefId)
      return d?.repeatable && d?.level === 'facility'
    })
    return index === firstIdx || sectionResult.approvalStatus === 'pending' || sectionResult.approvalStatus === 'flagged' || sectionResult.approvalStatus === 'partial'
  }

  return (
    <div className="space-y-4">
      {extraction.sections.map((sectionResult, index) => {
        const sectionDef = schema.sections.find(d => d.id === sectionResult.sectionDefId)
        if (!sectionDef) return null

        // Facility-level repeatable sections get the accordion treatment
        if (sectionDef.repeatable && sectionDef.level === 'facility') {
          return (
            <FacilityAccordion
              key={`${sectionResult.sectionDefId}-${sectionResult.instanceIndex ?? index}`}
              sectionDef={sectionDef}
              sectionResult={sectionResult}
              defaultOpen={shouldDefaultOpen(sectionResult, index)}
              onFieldCitationClick={onFieldCitationClick}
              onFieldStatusChange={(fieldDefId, status) => onFieldStatusChange?.(index, fieldDefId, status)}
              highlightedFieldId={highlightedFieldId}
            />
          )
        }

        // Regular sections
        return (
          <SectionGroup
            key={`${sectionResult.sectionDefId}-${index}`}
            sectionDef={sectionDef}
            sectionResult={sectionResult}
            onFieldCitationClick={onFieldCitationClick}
            onFieldStatusChange={(fieldDefId, status) => onFieldStatusChange?.(index, fieldDefId, status)}
            highlightedFieldId={highlightedFieldId}
          />
        )
      })}
    </div>
  )
}
