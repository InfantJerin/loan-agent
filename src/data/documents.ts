import type { Document } from '@/types'

export const documents: Document[] = [
  { id: 'doc-1', dealId: 'deal-1', name: 'Meridian Holdings - Credit Agreement (Amended & Restated)', type: 'credit_agreement', status: 'verified', uploadDate: '2024-03-15', classification: 'Credit Agreement', confidence: 0.99, pages: 245, size: '12.4 MB' },
  { id: 'doc-2', dealId: 'deal-1', name: 'Meridian Holdings - First Amendment', type: 'amendment', status: 'verified', uploadDate: '2024-09-20', classification: 'Amendment', confidence: 0.97, pages: 34, size: '2.1 MB' },
  { id: 'doc-3', dealId: 'deal-2', name: 'Atlas Industrial - Credit Agreement', type: 'credit_agreement', status: 'verified', uploadDate: '2024-01-20', classification: 'Credit Agreement', confidence: 0.98, pages: 198, size: '10.8 MB' },
  { id: 'doc-4', dealId: 'deal-1', name: 'Meridian Holdings - Q4 2024 Compliance Certificate', type: 'compliance_certificate', status: 'in_review', uploadDate: '2025-01-30', classification: 'Compliance Certificate', confidence: 0.94, pages: 12, size: '1.2 MB' },
  { id: 'doc-5', dealId: 'deal-3', name: 'Pinnacle Healthcare - Credit Agreement', type: 'credit_agreement', status: 'verified', uploadDate: '2024-06-01', classification: 'Credit Agreement', confidence: 0.99, pages: 178, size: '9.6 MB' },
  { id: 'doc-6', dealId: 'deal-2', name: 'Atlas Industrial - Assignment Agreement (Carlyle to Octagon)', type: 'assignment_agreement', status: 'extracted', uploadDate: '2025-02-01', classification: 'Assignment Agreement', confidence: 0.91, pages: 8, size: '0.8 MB' },
  { id: 'doc-7', dealId: 'deal-1', name: 'Meridian Holdings - Rate Set Notice Feb 2025', type: 'rate_set_notice', status: 'classified', uploadDate: '2025-02-10', classification: 'Rate Set Notice', confidence: 0.88, pages: 2, size: '0.3 MB' },
  { id: 'doc-8', dealId: 'deal-4', name: 'Vanguard Energy - Credit Agreement', type: 'credit_agreement', status: 'verified', uploadDate: '2024-09-10', classification: 'Credit Agreement', confidence: 0.98, pages: 210, size: '11.2 MB' },
  { id: 'doc-9', dealId: 'deal-5', name: 'Sterling Retail - Q4 2024 Financial Statement', type: 'financial_statement', status: 'processing', uploadDate: '2025-02-08', classification: undefined, confidence: undefined, pages: 45, size: '3.8 MB' },
  { id: 'doc-10', dealId: 'deal-1', name: 'Meridian Holdings - Funding Notice', type: 'funding_notice', status: 'extracted', uploadDate: '2025-02-05', classification: 'Funding Notice', confidence: 0.93, pages: 3, size: '0.4 MB' },
  { id: 'doc-11', dealId: 'deal-6', name: 'Nexus Communications - Credit Agreement', type: 'credit_agreement', status: 'verified', uploadDate: '2024-02-28', classification: 'Credit Agreement', confidence: 0.97, pages: 186, size: '10.2 MB' },
  { id: 'doc-12', dealId: 'deal-7', name: 'Cascade Properties - Construction Loan Agreement', type: 'credit_agreement', status: 'verified', uploadDate: '2024-07-01', classification: 'Credit Agreement', confidence: 0.96, pages: 225, size: '11.8 MB' },
  { id: 'doc-13', dealId: 'deal-3', name: 'Pinnacle Healthcare - Compliance Certificate Q4', type: 'compliance_certificate', status: 'queued', uploadDate: '2025-02-11', classification: undefined, confidence: undefined, pages: 15, size: '1.5 MB' },
  { id: 'doc-14', dealId: 'deal-4', name: 'Vanguard Energy - Draw Request #3', type: 'funding_notice', status: 'extracted', uploadDate: '2025-02-09', classification: 'Funding Notice', confidence: 0.85, pages: 4, size: '0.5 MB' },
  { id: 'doc-15', dealId: 'deal-2', name: 'Atlas Industrial - Amendment No. 2', type: 'amendment', status: 'queued', uploadDate: '2025-02-12', classification: undefined, confidence: undefined, pages: 28, size: '2.4 MB' },
]
