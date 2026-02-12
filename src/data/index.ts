import { borrowers } from './borrowers'
import { lenders } from './lenders'
import { deals } from './deals'
import { facilities } from './facilities'
import { positions } from './positions'
import { payments } from './payments'
import { rateSets } from './rate-sets'
import { distributions } from './distributions'
import { documents } from './documents'
import { extractions } from './extractions'
import { trades } from './trades'
import { consents } from './consents'
import { tasks } from './tasks'
import { events } from './events'
import { covenants } from './covenants'
import { notices } from './notices'
import { sampleAIMessages } from './ai-messages'

// Re-export all data
export { borrowers, lenders, deals, facilities, positions, payments, rateSets, distributions, documents, extractions, trades, consents, tasks, events, covenants, notices, sampleAIMessages }

// Lookup helpers
export const getBorrowerById = (id: string) => borrowers.find(b => b.id === id)
export const getLenderById = (id: string) => lenders.find(l => l.id === id)
export const getDealById = (id: string) => deals.find(d => d.id === id)
export const getFacilityById = (id: string) => facilities.find(f => f.id === id)

export const getFacilitiesByDealId = (dealId: string) => facilities.filter(f => f.dealId === dealId)
export const getPositionsByDealId = (dealId: string) => positions.filter(p => p.dealId === dealId)
export const getPositionsByFacilityId = (facilityId: string) => positions.filter(p => p.facilityId === facilityId)
export const getPaymentsByDealId = (dealId: string) => payments.filter(p => p.dealId === dealId)
export const getRateSetsByDealId = (dealId: string) => rateSets.filter(r => r.dealId === dealId)
export const getDistributionsByDealId = (dealId: string) => distributions.filter(d => d.dealId === dealId)
export const getDistributionsByPaymentId = (paymentId: string) => distributions.filter(d => d.paymentId === paymentId)
export const getDocumentsByDealId = (dealId: string) => documents.filter(d => d.dealId === dealId)
export const getExtractionsByDocumentId = (documentId: string) => extractions.filter(e => e.documentId === documentId)
export const getTradesByDealId = (dealId: string) => trades.filter(t => t.dealId === dealId)
export const getConsentsByTradeId = (tradeId: string) => consents.filter(c => c.tradeId === tradeId)
export const getTasksByDealId = (dealId: string) => tasks.filter(t => t.dealId === dealId)
export const getEventsByDealId = (dealId: string) => events.filter(e => e.dealId === dealId)
export const getCovenantsByDealId = (dealId: string) => covenants.filter(c => c.dealId === dealId)
export const getNoticesByDealId = (dealId: string) => notices.filter(n => n.dealId === dealId)
export const getDealsByBorrowerId = (borrowerId: string) => deals.filter(d => d.borrowerId === borrowerId)
export const getDocumentById = (id: string) => documents.find(d => d.id === id)
export const getTradeById = (id: string) => trades.find(t => t.id === id)
