import type { Payment } from '@/types'

export const payments: Payment[] = [
  { id: 'pay-1', dealId: 'deal-1', facilityId: 'fac-1', type: 'interest', amount: 2656250, currency: 'USD', dueDate: '2025-02-15', status: 'completed', period: 'Jan 15 - Feb 15, 2025', paidDate: '2025-02-15' },
  { id: 'pay-2', dealId: 'deal-1', facilityId: 'fac-1', type: 'interest', amount: 2656250, currency: 'USD', dueDate: '2025-03-15', status: 'pending', period: 'Feb 15 - Mar 15, 2025' },
  { id: 'pay-3', dealId: 'deal-1', facilityId: 'fac-1', type: 'commitment_fee', amount: 203125, currency: 'USD', dueDate: '2025-03-15', status: 'pending', period: 'Q1 2025' },
  { id: 'pay-4', dealId: 'deal-2', facilityId: 'fac-2', type: 'interest', amount: 4739583, currency: 'USD', dueDate: '2025-02-20', status: 'completed', period: 'Jan 20 - Feb 20, 2025', paidDate: '2025-02-20' },
  { id: 'pay-5', dealId: 'deal-2', facilityId: 'fac-2', type: 'interest', amount: 4739583, currency: 'USD', dueDate: '2025-03-20', status: 'pending', period: 'Feb 20 - Mar 20, 2025' },
  { id: 'pay-6', dealId: 'deal-2', facilityId: 'fac-2', type: 'principal', amount: 1250000, currency: 'USD', dueDate: '2025-03-20', status: 'pending', period: 'Q1 2025 Amortization' },
  { id: 'pay-7', dealId: 'deal-3', facilityId: 'fac-3', type: 'interest', amount: 729167, currency: 'USD', dueDate: '2025-03-01', status: 'pending', period: 'Feb 1 - Mar 1, 2025' },
  { id: 'pay-8', dealId: 'deal-3', facilityId: 'fac-3', type: 'commitment_fee', amount: 93750, currency: 'USD', dueDate: '2025-03-01', status: 'pending', period: 'Q1 2025' },
  { id: 'pay-9', dealId: 'deal-4', facilityId: 'fac-4', type: 'interest', amount: 1666667, currency: 'USD', dueDate: '2025-03-10', status: 'pending', period: 'Feb 10 - Mar 10, 2025' },
  { id: 'pay-10', dealId: 'deal-5', facilityId: 'fac-5', type: 'interest', amount: 916667, currency: 'USD', dueDate: '2025-02-15', status: 'overdue', period: 'Jan 15 - Feb 15, 2025' },
  { id: 'pay-11', dealId: 'deal-6', facilityId: 'fac-6', type: 'interest', amount: 1250000, currency: 'GBP', dueDate: '2025-02-28', status: 'pending', period: 'Jan 28 - Feb 28, 2025' },
  { id: 'pay-12', dealId: 'deal-7', facilityId: 'fac-7', type: 'interest', amount: 2138889, currency: 'USD', dueDate: '2025-03-01', status: 'pending', period: 'Feb 1 - Mar 1, 2025' },
  { id: 'pay-13', dealId: 'deal-1', facilityId: 'fac-1', type: 'interest', amount: 2656250, currency: 'USD', dueDate: '2025-01-15', status: 'completed', period: 'Dec 15 - Jan 15, 2025', paidDate: '2025-01-15' },
  { id: 'pay-14', dealId: 'deal-9', facilityId: 'fac-9', type: 'interest', amount: 1319444, currency: 'USD', dueDate: '2025-03-15', status: 'pending', period: 'Feb 15 - Mar 15, 2025' },
  { id: 'pay-15', dealId: 'deal-9', facilityId: 'fac-9', type: 'principal', amount: 3125000, currency: 'USD', dueDate: '2025-03-15', status: 'pending', period: 'Q1 2025 Amortization' },
]
