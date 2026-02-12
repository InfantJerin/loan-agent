import type { Position } from '@/types'

export const positions: Position[] = [
  // Deal 1 - Meridian Holdings Revolver (fac-1)
  { id: 'pos-1', dealId: 'deal-1', facilityId: 'fac-1', lenderId: 'len-1', commitment: 150000000, funded: 85000000, unfunded: 65000000, share: 20.0, status: 'active' },
  { id: 'pos-2', dealId: 'deal-1', facilityId: 'fac-1', lenderId: 'len-2', commitment: 112500000, funded: 63750000, unfunded: 48750000, share: 15.0, status: 'active' },
  { id: 'pos-3', dealId: 'deal-1', facilityId: 'fac-1', lenderId: 'len-3', commitment: 112500000, funded: 63750000, unfunded: 48750000, share: 15.0, status: 'active' },
  { id: 'pos-4', dealId: 'deal-1', facilityId: 'fac-1', lenderId: 'len-4', commitment: 75000000, funded: 42500000, unfunded: 32500000, share: 10.0, status: 'active' },
  { id: 'pos-5', dealId: 'deal-1', facilityId: 'fac-1', lenderId: 'len-5', commitment: 75000000, funded: 42500000, unfunded: 32500000, share: 10.0, status: 'active' },
  { id: 'pos-6', dealId: 'deal-1', facilityId: 'fac-1', lenderId: 'len-6', commitment: 75000000, funded: 42500000, unfunded: 32500000, share: 10.0, status: 'active' },
  { id: 'pos-7', dealId: 'deal-1', facilityId: 'fac-1', lenderId: 'len-7', commitment: 56250000, funded: 31875000, unfunded: 24375000, share: 7.5, status: 'active' },
  { id: 'pos-8', dealId: 'deal-1', facilityId: 'fac-1', lenderId: 'len-11', commitment: 56250000, funded: 31875000, unfunded: 24375000, share: 7.5, status: 'active' },
  { id: 'pos-9', dealId: 'deal-1', facilityId: 'fac-1', lenderId: 'len-14', commitment: 37500000, funded: 21250000, unfunded: 16250000, share: 5.0, status: 'active' },

  // Deal 2 - Atlas Industrial TLB (fac-2)
  { id: 'pos-10', dealId: 'deal-2', facilityId: 'fac-2', lenderId: 'len-2', commitment: 100000000, funded: 97500000, unfunded: 0, share: 20.0, status: 'active' },
  { id: 'pos-11', dealId: 'deal-2', facilityId: 'fac-2', lenderId: 'len-5', commitment: 75000000, funded: 73125000, unfunded: 0, share: 15.0, status: 'active' },
  { id: 'pos-12', dealId: 'deal-2', facilityId: 'fac-2', lenderId: 'len-11', commitment: 75000000, funded: 73125000, unfunded: 0, share: 15.0, status: 'active' },
  { id: 'pos-13', dealId: 'deal-2', facilityId: 'fac-2', lenderId: 'len-12', commitment: 75000000, funded: 73125000, unfunded: 0, share: 15.0, status: 'active' },
  { id: 'pos-14', dealId: 'deal-2', facilityId: 'fac-2', lenderId: 'len-13', commitment: 50000000, funded: 48750000, unfunded: 0, share: 10.0, status: 'active' },
  { id: 'pos-15', dealId: 'deal-2', facilityId: 'fac-2', lenderId: 'len-16', commitment: 50000000, funded: 48750000, unfunded: 0, share: 10.0, status: 'active' },
  { id: 'pos-16', dealId: 'deal-2', facilityId: 'fac-2', lenderId: 'len-8', commitment: 50000000, funded: 48750000, unfunded: 0, share: 10.0, status: 'active' },
  { id: 'pos-17', dealId: 'deal-2', facilityId: 'fac-2', lenderId: 'len-18', commitment: 25000000, funded: 24375000, unfunded: 0, share: 5.0, status: 'active' },

  // Deal 3 - Pinnacle Healthcare Revolver (fac-3)
  { id: 'pos-18', dealId: 'deal-3', facilityId: 'fac-3', lenderId: 'len-3', commitment: 100000000, funded: 50000000, unfunded: 50000000, share: 33.33, status: 'active' },
  { id: 'pos-19', dealId: 'deal-3', facilityId: 'fac-3', lenderId: 'len-4', commitment: 100000000, funded: 50000000, unfunded: 50000000, share: 33.33, status: 'active' },
  { id: 'pos-20', dealId: 'deal-3', facilityId: 'fac-3', lenderId: 'len-6', commitment: 100000000, funded: 50000000, unfunded: 50000000, share: 33.34, status: 'active' },

  // Deal 4 - Vanguard Energy DDTL (fac-4)
  { id: 'pos-21', dealId: 'deal-4', facilityId: 'fac-4', lenderId: 'len-4', commitment: 100000000, funded: 50000000, unfunded: 50000000, share: 25.0, status: 'active' },
  { id: 'pos-22', dealId: 'deal-4', facilityId: 'fac-4', lenderId: 'len-1', commitment: 80000000, funded: 40000000, unfunded: 40000000, share: 20.0, status: 'active' },
  { id: 'pos-23', dealId: 'deal-4', facilityId: 'fac-4', lenderId: 'len-7', commitment: 80000000, funded: 40000000, unfunded: 40000000, share: 20.0, status: 'active' },
  { id: 'pos-24', dealId: 'deal-4', facilityId: 'fac-4', lenderId: 'len-10', commitment: 60000000, funded: 30000000, unfunded: 30000000, share: 15.0, status: 'active' },
  { id: 'pos-25', dealId: 'deal-4', facilityId: 'fac-4', lenderId: 'len-15', commitment: 40000000, funded: 20000000, unfunded: 20000000, share: 10.0, status: 'active' },
  { id: 'pos-26', dealId: 'deal-4', facilityId: 'fac-4', lenderId: 'len-9', commitment: 40000000, funded: 20000000, unfunded: 20000000, share: 10.0, status: 'active' },

  // Deal 5 positions
  { id: 'pos-27', dealId: 'deal-5', facilityId: 'fac-5', lenderId: 'len-5', commitment: 200000000, funded: 165000000, unfunded: 35000000, share: 100.0, status: 'active' },

  // Deal 6 positions
  { id: 'pos-28', dealId: 'deal-6', facilityId: 'fac-6', lenderId: 'len-7', commitment: 75000000, funded: 54000000, unfunded: 21000000, share: 30.0, status: 'active' },
  { id: 'pos-29', dealId: 'deal-6', facilityId: 'fac-6', lenderId: 'len-8', commitment: 62500000, funded: 45000000, unfunded: 17500000, share: 25.0, status: 'active' },
  { id: 'pos-30', dealId: 'deal-6', facilityId: 'fac-6', lenderId: 'len-10', commitment: 62500000, funded: 45000000, unfunded: 17500000, share: 25.0, status: 'active' },
  { id: 'pos-31', dealId: 'deal-6', facilityId: 'fac-6', lenderId: 'len-17', commitment: 50000000, funded: 36000000, unfunded: 14000000, share: 20.0, status: 'active' },

  // Deal 9 - Meridian TLA positions
  { id: 'pos-32', dealId: 'deal-9', facilityId: 'fac-9', lenderId: 'len-1', commitment: 62500000, funded: 59375000, unfunded: 0, share: 25.0, status: 'active' },
  { id: 'pos-33', dealId: 'deal-9', facilityId: 'fac-9', lenderId: 'len-2', commitment: 50000000, funded: 47500000, unfunded: 0, share: 20.0, status: 'active' },
  { id: 'pos-34', dealId: 'deal-9', facilityId: 'fac-9', lenderId: 'len-3', commitment: 50000000, funded: 47500000, unfunded: 0, share: 20.0, status: 'active' },
  { id: 'pos-35', dealId: 'deal-9', facilityId: 'fac-9', lenderId: 'len-4', commitment: 37500000, funded: 35625000, unfunded: 0, share: 15.0, status: 'active' },
  { id: 'pos-36', dealId: 'deal-9', facilityId: 'fac-9', lenderId: 'len-14', commitment: 25000000, funded: 23750000, unfunded: 0, share: 10.0, status: 'active' },
  { id: 'pos-37', dealId: 'deal-9', facilityId: 'fac-9', lenderId: 'len-15', commitment: 25000000, funded: 23750000, unfunded: 0, share: 10.0, status: 'active' },
]
