export type DealStatus = 'active' | 'pending' | 'closed' | 'draft'
export type FacilityType = 'revolver' | 'term_loan' | 'delayed_draw' | 'letter_of_credit'
export type Currency = 'USD' | 'EUR' | 'GBP'
export type DayCount = 'ACT/360' | 'ACT/365' | '30/360'
export type PaymentStatus = 'pending' | 'approved' | 'processing' | 'completed' | 'failed' | 'overdue'
export type DocumentStatus = 'queued' | 'processing' | 'classified' | 'extracted' | 'in_review' | 'verified' | 'failed'
export type TradeStatus = 'pending' | 'pending_approval' | 'approved' | 'settling' | 'settled' | 'failed'
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low'
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue'
export type ConsentStatus = 'pending' | 'approved' | 'rejected' | 'waived'
export type EventType = 'payment' | 'rate_set' | 'maturity' | 'rollover' | 'covenant' | 'notice' | 'distribution' | 'trade_settlement'
export type ExtractionFieldConfidence = 'high' | 'medium' | 'low'

export interface Borrower {
  id: string
  name: string
  industry: string
  rating: string
  country: string
}

export interface Deal {
  id: string
  name: string
  borrowerId: string
  status: DealStatus
  dealType: string
  closingDate: string
  maturityDate: string
  totalCommitment: number
  outstandingBalance: number
  currency: Currency
  agentBank: string
  description: string
  cusip?: string
}

export interface Facility {
  id: string
  dealId: string
  name: string
  type: FacilityType
  commitment: number
  drawn: number
  available: number
  currency: Currency
  maturityDate: string
  pricing: string
  dayCount: DayCount
  status: 'active' | 'expired' | 'terminated'
}

export interface Lender {
  id: string
  name: string
  shortName: string
  type: 'bank' | 'fund' | 'insurance' | 'clo'
  country: string
  contact: string
  email: string
}

export interface Position {
  id: string
  dealId: string
  facilityId: string
  lenderId: string
  commitment: number
  funded: number
  unfunded: number
  share: number
  status: 'active' | 'pending' | 'transferred'
}

export interface Payment {
  id: string
  dealId: string
  facilityId: string
  type: 'principal' | 'interest' | 'fee' | 'commitment_fee'
  amount: number
  currency: Currency
  dueDate: string
  status: PaymentStatus
  period: string
  paidDate?: string
}

export interface RateSet {
  id: string
  dealId: string
  facilityId: string
  baseRate: 'SOFR' | 'EURIBOR' | 'SONIA'
  spread: number
  allInRate: number
  effectiveDate: string
  maturityDate: string
  status: 'pending_approval' | 'approved' | 'active' | 'expired'
  notionalAmount: number
}

export interface Distribution {
  id: string
  dealId: string
  paymentId: string
  lenderId: string
  amount: number
  share: number
  status: 'pending' | 'approved' | 'distributed' | 'failed'
  distributionDate: string
}

export interface Document {
  id: string
  dealId?: string
  name: string
  type: 'credit_agreement' | 'amendment' | 'compliance_certificate' | 'notice' | 'assignment_agreement' | 'funding_notice' | 'rate_set_notice' | 'financial_statement'
  status: DocumentStatus
  uploadDate: string
  classification?: string
  confidence?: number
  pages?: number
  size?: string
}

export interface ExtractionField {
  id: string
  documentId: string
  fieldName: string
  extractedValue: string
  confidence: number
  boundingBox?: { x: number; y: number; width: number; height: number }
  verified: boolean
  correctedValue?: string
}

export interface Trade {
  id: string
  dealId: string
  facilityId: string
  sellerLenderId: string
  buyerLenderId: string
  amount: number
  price: number
  tradeDate: string
  settlementDate: string
  status: TradeStatus
  type: 'assignment' | 'participation'
}

export interface Consent {
  id: string
  tradeId: string
  lenderId: string
  status: ConsentStatus
  requestDate: string
  responseDate?: string
  notes?: string
}

export interface Task {
  id: string
  dealId?: string
  title: string
  description: string
  type: 'approval' | 'review' | 'action' | 'escalation'
  priority: TaskPriority
  status: TaskStatus
  assignee: string
  dueDate: string
  category: 'rate_set' | 'payment' | 'document' | 'trade' | 'covenant' | 'general'
  relatedEntityId?: string
}

export interface LoanEvent {
  id: string
  dealId: string
  type: EventType
  title: string
  description: string
  date: string
  status: 'upcoming' | 'completed' | 'overdue'
  amount?: number
}

export interface Covenant {
  id: string
  dealId: string
  name: string
  type: 'financial' | 'reporting' | 'affirmative' | 'negative'
  threshold: number
  currentValue: number
  testDate: string
  status: 'compliant' | 'warning' | 'breach'
  metric: string
  frequency: 'quarterly' | 'semi-annual' | 'annual'
  history: { date: string; value: number }[]
}

export interface Notice {
  id: string
  dealId: string
  type: 'rate_set' | 'payment' | 'drawdown' | 'prepayment' | 'general'
  direction: 'inbound' | 'outbound'
  subject: string
  date: string
  status: 'draft' | 'sent' | 'received' | 'acknowledged'
  recipients?: string[]
  content?: string
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  citations?: { text: string; dealId?: string; documentId?: string }[]
  suggestedActions?: { label: string; action: string }[]
}

// ── Document Processing: Schema-Driven Extraction Types ──

export type DocumentCategory = 'credit_agreement' | 'amendment' | 'compliance_certificate' | 'borrowing_notice' | 'assignment_agreement' | 'financial_statement' | 'funding_notice' | 'rate_set_notice'

export type ExtractionFieldType = 'text' | 'currency' | 'percentage' | 'rate' | 'date' | 'number' | 'ratio' | 'table' | 'formula' | 'conditional' | 'boolean' | 'select'

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'flagged' | 'partial'

export type CitationLevel = 'single' | 'cross_reference' | 'inferred'

export interface ExtractionFieldDef {
  id: string
  label: string
  type: ExtractionFieldType
  required?: boolean
  editable?: boolean
  description?: string
  // For select type
  options?: string[]
  // For table type
  columns?: { key: string; label: string; type: ExtractionFieldType }[]
  // Presentation hints
  width?: 'full' | 'half' | 'third'
  group?: string
}

export interface ExtractionSectionDef {
  id: string
  label: string
  level: 'agreement' | 'facility' | 'covenant' | 'reporting' | 'conditions' | 'general'
  approvalScope: 'section' | 'field'
  repeatable?: boolean
  repeatLabel?: string // e.g., "Facility" — used for dynamic labels like "Facility 1: $500M Revolver"
  collapsible?: boolean
  fields: ExtractionFieldDef[]
  subsections?: ExtractionSectionDef[]
}

export interface ExtractionSchema {
  id: string
  name: string
  documentCategory: DocumentCategory
  version: string
  description?: string
  sections: ExtractionSectionDef[]
}

export interface CitationRef {
  id: string
  label: string
  sectionRef: string
  pageNumber: number
  snippetText: string
  boundingBox?: { x: number; y: number; width: number; height: number }
  level: CitationLevel
}

export type FieldReviewStatus = 'unreviewed' | 'confirmed' | 'corrected' | 'flagged'

export interface ExtractionFieldResult {
  fieldDefId: string
  extractedValue: string | number | boolean | null
  correctedValue?: string | number | boolean | null
  confidence: 'high' | 'medium' | 'low'
  confidenceScore: number
  status: FieldReviewStatus
  citations: CitationRef[]
  // For table type — rows of values keyed by column key
  tableData?: Record<string, string | number>[]
  // For formula type
  formulaDisplay?: string
  // For conditional type
  conditions?: { condition: string; value: string; citations: CitationRef[] }[]
}

export interface ExtractionSectionResult {
  sectionDefId: string
  instanceLabel?: string // For repeatable sections, e.g., "Facility A: $500M Revolving Credit"
  instanceIndex?: number
  approvalStatus: ApprovalStatus
  approvedBy?: string
  approvedAt?: string
  fields: ExtractionFieldResult[]
  subsections?: ExtractionSectionResult[]
}

export interface ExtractionResult {
  id: string
  documentId: string
  dealId: string
  schemaId: string
  status: 'in_progress' | 'completed' | 'approved' | 'rejected'
  overallConfidence: number
  overallApproval: ApprovalStatus
  completedSections: number
  totalSections: number
  assignedTo?: string
  startedAt: string
  completedAt?: string
  sections: ExtractionSectionResult[]
}
