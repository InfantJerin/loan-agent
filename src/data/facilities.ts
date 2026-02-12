import type { Facility } from '@/types'

export const facilities: Facility[] = [
  { id: 'fac-1', dealId: 'deal-1', name: 'Revolver', type: 'revolver', commitment: 750000000, drawn: 425000000, available: 325000000, currency: 'USD', maturityDate: '2029-03-15', pricing: 'SOFR + 225 bps', dayCount: 'ACT/360', status: 'active' },
  { id: 'fac-2', dealId: 'deal-2', name: 'Term Loan B', type: 'term_loan', commitment: 500000000, drawn: 487500000, available: 0, currency: 'USD', maturityDate: '2031-01-20', pricing: 'SOFR + 350 bps', dayCount: 'ACT/360', status: 'active' },
  { id: 'fac-3', dealId: 'deal-3', name: 'Revolver', type: 'revolver', commitment: 300000000, drawn: 150000000, available: 150000000, currency: 'USD', maturityDate: '2028-06-01', pricing: 'SOFR + 175 bps', dayCount: 'ACT/360', status: 'active' },
  { id: 'fac-4', dealId: 'deal-4', name: 'Delayed Draw TL', type: 'delayed_draw', commitment: 400000000, drawn: 200000000, available: 200000000, currency: 'USD', maturityDate: '2030-09-10', pricing: 'SOFR + 300 bps', dayCount: 'ACT/360', status: 'active' },
  { id: 'fac-5', dealId: 'deal-5', name: 'ABL Facility', type: 'revolver', commitment: 200000000, drawn: 165000000, available: 35000000, currency: 'USD', maturityDate: '2027-04-15', pricing: 'SOFR + 200 bps', dayCount: 'ACT/360', status: 'active' },
  { id: 'fac-6', dealId: 'deal-6', name: 'Multi-Currency Revolver', type: 'revolver', commitment: 250000000, drawn: 180000000, available: 70000000, currency: 'GBP', maturityDate: '2029-02-28', pricing: 'SONIA + 250 bps', dayCount: 'ACT/365', status: 'active' },
  { id: 'fac-7', dealId: 'deal-7', name: 'Construction Loan', type: 'delayed_draw', commitment: 350000000, drawn: 280000000, available: 70000000, currency: 'USD', maturityDate: '2026-12-31', pricing: 'SOFR + 275 bps', dayCount: 'ACT/360', status: 'active' },
  { id: 'fac-8', dealId: 'deal-8', name: 'Working Capital Line', type: 'revolver', commitment: 175000000, drawn: 0, available: 175000000, currency: 'USD', maturityDate: '2028-01-15', pricing: 'SOFR + 200 bps', dayCount: 'ACT/360', status: 'active' },
  { id: 'fac-9', dealId: 'deal-9', name: 'Term Loan A', type: 'term_loan', commitment: 250000000, drawn: 237500000, available: 0, currency: 'USD', maturityDate: '2029-03-15', pricing: 'SOFR + 200 bps', dayCount: 'ACT/360', status: 'active' },
  { id: 'fac-10', dealId: 'deal-10', name: 'Revolver', type: 'revolver', commitment: 150000000, drawn: 45000000, available: 105000000, currency: 'USD', maturityDate: '2029-01-20', pricing: 'SOFR + 225 bps', dayCount: 'ACT/360', status: 'active' },
  { id: 'fac-11', dealId: 'deal-1', name: 'Letter of Credit', type: 'letter_of_credit', commitment: 50000000, drawn: 15000000, available: 35000000, currency: 'USD', maturityDate: '2029-03-15', pricing: 'SOFR + 225 bps', dayCount: 'ACT/360', status: 'active' },
]
