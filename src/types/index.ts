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
