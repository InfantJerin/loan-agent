import type { ExtractionField } from '@/types'

export const extractions: ExtractionField[] = [
  // Doc-4: Meridian Compliance Certificate
  { id: 'ext-1', documentId: 'doc-4', fieldName: 'Borrower Name', extractedValue: 'Meridian Holdings Corp', confidence: 0.99, boundingBox: { x: 120, y: 85, width: 280, height: 22 }, verified: true },
  { id: 'ext-2', documentId: 'doc-4', fieldName: 'Reporting Period', extractedValue: 'Q4 2024', confidence: 0.98, boundingBox: { x: 120, y: 115, width: 100, height: 22 }, verified: true },
  { id: 'ext-3', documentId: 'doc-4', fieldName: 'Total Leverage Ratio', extractedValue: '3.25x', confidence: 0.96, boundingBox: { x: 350, y: 280, width: 80, height: 22 }, verified: false },
  { id: 'ext-4', documentId: 'doc-4', fieldName: 'Interest Coverage Ratio', extractedValue: '4.8x', confidence: 0.94, boundingBox: { x: 350, y: 310, width: 60, height: 22 }, verified: false },
  { id: 'ext-5', documentId: 'doc-4', fieldName: 'Fixed Charge Coverage', extractedValue: '1.85x', confidence: 0.82, boundingBox: { x: 350, y: 340, width: 70, height: 22 }, verified: false },
  { id: 'ext-6', documentId: 'doc-4', fieldName: 'EBITDA', extractedValue: '$142,500,000', confidence: 0.91, boundingBox: { x: 350, y: 370, width: 140, height: 22 }, verified: false },
  { id: 'ext-7', documentId: 'doc-4', fieldName: 'Compliance Officer', extractedValue: 'Jennifer M. Walsh, CFO', confidence: 0.87, boundingBox: { x: 120, y: 580, width: 220, height: 22 }, verified: false },
  { id: 'ext-8', documentId: 'doc-4', fieldName: 'Certification Date', extractedValue: 'January 28, 2025', confidence: 0.95, boundingBox: { x: 120, y: 610, width: 180, height: 22 }, verified: false },

  // Doc-6: Assignment Agreement
  { id: 'ext-9', documentId: 'doc-6', fieldName: 'Assignor', extractedValue: 'Carlyle Credit Partners', confidence: 0.97, boundingBox: { x: 150, y: 120, width: 250, height: 22 }, verified: false },
  { id: 'ext-10', documentId: 'doc-6', fieldName: 'Assignee', extractedValue: 'Octagon Credit Investors', confidence: 0.96, boundingBox: { x: 150, y: 150, width: 250, height: 22 }, verified: false },
  { id: 'ext-11', documentId: 'doc-6', fieldName: 'Assignment Amount', extractedValue: '$25,000,000', confidence: 0.93, boundingBox: { x: 150, y: 220, width: 150, height: 22 }, verified: false },
  { id: 'ext-12', documentId: 'doc-6', fieldName: 'Trade Date', extractedValue: 'January 28, 2025', confidence: 0.88, boundingBox: { x: 150, y: 250, width: 180, height: 22 }, verified: false },
  { id: 'ext-13', documentId: 'doc-6', fieldName: 'Settlement Date', extractedValue: 'February 15, 2025', confidence: 0.79, boundingBox: { x: 150, y: 280, width: 180, height: 22 }, verified: false },
  { id: 'ext-14', documentId: 'doc-6', fieldName: 'Purchase Price', extractedValue: '99.50', confidence: 0.92, boundingBox: { x: 150, y: 310, width: 80, height: 22 }, verified: false },

  // Doc-10: Funding Notice
  { id: 'ext-15', documentId: 'doc-10', fieldName: 'Borrower', extractedValue: 'Meridian Holdings Corp', confidence: 0.99, boundingBox: { x: 100, y: 90, width: 250, height: 22 }, verified: true },
  { id: 'ext-16', documentId: 'doc-10', fieldName: 'Draw Amount', extractedValue: '$50,000,000', confidence: 0.95, boundingBox: { x: 100, y: 180, width: 150, height: 22 }, verified: false },
  { id: 'ext-17', documentId: 'doc-10', fieldName: 'Funding Date', extractedValue: 'February 10, 2025', confidence: 0.93, boundingBox: { x: 100, y: 210, width: 180, height: 22 }, verified: false },
  { id: 'ext-18', documentId: 'doc-10', fieldName: 'Interest Period', extractedValue: '1 Month', confidence: 0.88, boundingBox: { x: 100, y: 240, width: 100, height: 22 }, verified: false },

  // Doc-14: Vanguard Draw Request
  { id: 'ext-19', documentId: 'doc-14', fieldName: 'Borrower', extractedValue: 'Vanguard Energy Partners', confidence: 0.97, boundingBox: { x: 110, y: 95, width: 260, height: 22 }, verified: false },
  { id: 'ext-20', documentId: 'doc-14', fieldName: 'Draw Amount', extractedValue: '$75,000,000', confidence: 0.85, boundingBox: { x: 110, y: 190, width: 150, height: 22 }, verified: false },
  { id: 'ext-21', documentId: 'doc-14', fieldName: 'Requested Date', extractedValue: 'February 20, 2025', confidence: 0.78, boundingBox: { x: 110, y: 220, width: 180, height: 22 }, verified: false },
  { id: 'ext-22', documentId: 'doc-14', fieldName: 'Purpose', extractedValue: 'Phase 3 Expansion - Pipeline Construction', confidence: 0.72, boundingBox: { x: 110, y: 250, width: 350, height: 22 }, verified: false },
]
