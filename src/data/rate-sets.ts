import type { RateSet } from '@/types'

export const rateSets: RateSet[] = [
  { id: 'rs-1', dealId: 'deal-1', facilityId: 'fac-1', baseRate: 'SOFR', spread: 225, allInRate: 6.58, effectiveDate: '2025-02-15', maturityDate: '2025-03-15', status: 'active', notionalAmount: 425000000 },
  { id: 'rs-2', dealId: 'deal-1', facilityId: 'fac-1', baseRate: 'SOFR', spread: 225, allInRate: 6.55, effectiveDate: '2025-03-15', maturityDate: '2025-04-15', status: 'pending_approval', notionalAmount: 425000000 },
  { id: 'rs-3', dealId: 'deal-2', facilityId: 'fac-2', baseRate: 'SOFR', spread: 350, allInRate: 7.83, effectiveDate: '2025-02-20', maturityDate: '2025-03-20', status: 'active', notionalAmount: 487500000 },
  { id: 'rs-4', dealId: 'deal-2', facilityId: 'fac-2', baseRate: 'SOFR', spread: 350, allInRate: 7.80, effectiveDate: '2025-03-20', maturityDate: '2025-04-20', status: 'pending_approval', notionalAmount: 487500000 },
  { id: 'rs-5', dealId: 'deal-3', facilityId: 'fac-3', baseRate: 'SOFR', spread: 175, allInRate: 6.08, effectiveDate: '2025-03-01', maturityDate: '2025-04-01', status: 'pending_approval', notionalAmount: 150000000 },
  { id: 'rs-6', dealId: 'deal-4', facilityId: 'fac-4', baseRate: 'SOFR', spread: 300, allInRate: 7.33, effectiveDate: '2025-02-10', maturityDate: '2025-03-10', status: 'active', notionalAmount: 200000000 },
  { id: 'rs-7', dealId: 'deal-5', facilityId: 'fac-5', baseRate: 'SOFR', spread: 200, allInRate: 6.33, effectiveDate: '2025-02-15', maturityDate: '2025-03-15', status: 'active', notionalAmount: 165000000 },
  { id: 'rs-8', dealId: 'deal-6', facilityId: 'fac-6', baseRate: 'SONIA', spread: 250, allInRate: 7.20, effectiveDate: '2025-02-28', maturityDate: '2025-03-28', status: 'pending_approval', notionalAmount: 180000000 },
  { id: 'rs-9', dealId: 'deal-7', facilityId: 'fac-7', baseRate: 'SOFR', spread: 275, allInRate: 7.08, effectiveDate: '2025-03-01', maturityDate: '2025-04-01', status: 'pending_approval', notionalAmount: 280000000 },
  { id: 'rs-10', dealId: 'deal-9', facilityId: 'fac-9', baseRate: 'SOFR', spread: 200, allInRate: 6.33, effectiveDate: '2025-02-15', maturityDate: '2025-03-15', status: 'active', notionalAmount: 237500000 },
  { id: 'rs-11', dealId: 'deal-1', facilityId: 'fac-1', baseRate: 'SOFR', spread: 225, allInRate: 6.60, effectiveDate: '2025-01-15', maturityDate: '2025-02-15', status: 'expired', notionalAmount: 425000000 },
  { id: 'rs-12', dealId: 'deal-10', facilityId: 'fac-10', baseRate: 'SOFR', spread: 225, allInRate: 6.58, effectiveDate: '2025-02-20', maturityDate: '2025-03-20', status: 'active', notionalAmount: 45000000 },
]
