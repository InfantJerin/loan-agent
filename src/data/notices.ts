import type { Notice } from '@/types'

export const notices: Notice[] = [
  { id: 'not-1', dealId: 'deal-1', type: 'rate_set', direction: 'outbound', subject: 'Rate Set Notice - SOFR + 225 bps effective Feb 15', date: '2025-02-12', status: 'sent', recipients: ['All Lenders'] },
  { id: 'not-2', dealId: 'deal-1', type: 'payment', direction: 'outbound', subject: 'Interest Payment Notice - Due Mar 15, 2025', date: '2025-03-10', status: 'draft', recipients: ['All Lenders'] },
  { id: 'not-3', dealId: 'deal-2', type: 'rate_set', direction: 'outbound', subject: 'Rate Set Notice - SOFR + 350 bps effective Feb 20', date: '2025-02-17', status: 'sent', recipients: ['All Lenders'] },
  { id: 'not-4', dealId: 'deal-1', type: 'drawdown', direction: 'inbound', subject: 'Drawdown Request - $50,000,000', date: '2025-02-05', status: 'received' },
  { id: 'not-5', dealId: 'deal-4', type: 'drawdown', direction: 'inbound', subject: 'Draw Request #3 - Phase 3 Expansion', date: '2025-02-09', status: 'received' },
  { id: 'not-6', dealId: 'deal-5', type: 'payment', direction: 'outbound', subject: 'Overdue Payment Notice - Interest Due Feb 15', date: '2025-02-12', status: 'sent', recipients: ['Sterling Retail Holdings'] },
  { id: 'not-7', dealId: 'deal-1', type: 'general', direction: 'outbound', subject: 'Assignment Notice - Morgan Stanley to Blackstone', date: '2025-02-04', status: 'sent', recipients: ['All Lenders'] },
  { id: 'not-8', dealId: 'deal-3', type: 'rate_set', direction: 'outbound', subject: 'Rate Set Notice - SOFR + 175 bps effective Mar 1', date: '2025-02-25', status: 'draft', recipients: ['All Lenders'] },
]
