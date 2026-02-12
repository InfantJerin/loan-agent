import type { LoanEvent } from '@/types'

export const events: LoanEvent[] = [
  { id: 'evt-1', dealId: 'deal-1', type: 'rate_set', title: 'Rate Set Effective - Meridian Revolver', description: 'New SOFR + 225 bps rate set becomes effective', date: '2025-02-15', status: 'upcoming', amount: 425000000 },
  { id: 'evt-2', dealId: 'deal-5', type: 'payment', title: 'Overdue Interest - Sterling Retail', description: 'Interest payment past due', date: '2025-02-12', status: 'overdue', amount: 916667 },
  { id: 'evt-3', dealId: 'deal-2', type: 'trade_settlement', title: 'Trade Settlement - Atlas (Carlyle→Octagon)', description: 'Assignment settlement due', date: '2025-02-15', status: 'upcoming', amount: 25000000 },
  { id: 'evt-4', dealId: 'deal-1', type: 'trade_settlement', title: 'Trade Settlement - Meridian (MS→Blackstone)', description: 'Assignment settlement due', date: '2025-02-20', status: 'upcoming', amount: 37500000 },
  { id: 'evt-5', dealId: 'deal-6', type: 'payment', title: 'Interest Payment - Nexus Communications', description: 'GBP interest payment due', date: '2025-02-28', status: 'upcoming', amount: 1250000 },
  { id: 'evt-6', dealId: 'deal-3', type: 'payment', title: 'Interest Payment - Pinnacle Healthcare', description: 'Quarterly interest payment due', date: '2025-03-01', status: 'upcoming', amount: 729167 },
  { id: 'evt-7', dealId: 'deal-7', type: 'payment', title: 'Interest Payment - Cascade Properties', description: 'Monthly interest payment due', date: '2025-03-01', status: 'upcoming', amount: 2138889 },
  { id: 'evt-8', dealId: 'deal-4', type: 'payment', title: 'Interest Payment - Vanguard Energy', description: 'Monthly interest payment due', date: '2025-03-10', status: 'upcoming', amount: 1666667 },
  { id: 'evt-9', dealId: 'deal-1', type: 'payment', title: 'Interest Payment - Meridian Revolver', description: 'Monthly interest payment due', date: '2025-03-15', status: 'upcoming', amount: 2656250 },
  { id: 'evt-10', dealId: 'deal-9', type: 'payment', title: 'Principal + Interest - Meridian TLA', description: 'Quarterly amortization + interest', date: '2025-03-15', status: 'upcoming', amount: 4444444 },
  { id: 'evt-11', dealId: 'deal-2', type: 'payment', title: 'Interest + Principal - Atlas TLB', description: 'Quarterly payment due', date: '2025-03-20', status: 'upcoming', amount: 5989583 },
  { id: 'evt-12', dealId: 'deal-1', type: 'covenant', title: 'Covenant Test Date - Meridian Q4', description: 'Quarterly financial covenant testing', date: '2025-02-15', status: 'upcoming' },
  { id: 'evt-13', dealId: 'deal-3', type: 'covenant', title: 'Covenant Test Date - Pinnacle Q4', description: 'Quarterly financial covenant testing', date: '2025-03-01', status: 'upcoming' },
  { id: 'evt-14', dealId: 'deal-1', type: 'notice', title: 'Payment Notice Due - Meridian', description: 'Send interest payment notice (T-5)', date: '2025-03-10', status: 'upcoming' },
  { id: 'evt-15', dealId: 'deal-4', type: 'distribution', title: 'Distribute Interest - Vanguard', description: 'Distribute interest payments to lenders', date: '2025-03-11', status: 'upcoming', amount: 1666667 },
  { id: 'evt-16', dealId: 'deal-1', type: 'rate_set', title: 'Rate Set Rollover - Meridian Revolver', description: 'Current rate set expires, new rate takes effect', date: '2025-03-15', status: 'upcoming' },
  { id: 'evt-17', dealId: 'deal-2', type: 'rate_set', title: 'Rate Set Rollover - Atlas TLB', description: 'Rate set rollover', date: '2025-03-20', status: 'upcoming' },
  { id: 'evt-18', dealId: 'deal-1', type: 'payment', title: 'Interest Payment - Meridian Revolver', description: 'January interest payment completed', date: '2025-01-15', status: 'completed', amount: 2656250 },
  { id: 'evt-19', dealId: 'deal-1', type: 'payment', title: 'Interest Payment - Meridian Revolver', description: 'February interest payment completed', date: '2025-02-15', status: 'completed', amount: 2656250 },
  { id: 'evt-20', dealId: 'deal-2', type: 'payment', title: 'Interest Payment - Atlas TLB', description: 'February interest payment completed', date: '2025-02-20', status: 'completed', amount: 4739583 },
]
