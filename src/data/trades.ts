import type { Trade } from '@/types'

export const trades: Trade[] = [
  { id: 'trd-1', dealId: 'deal-2', facilityId: 'fac-2', sellerLenderId: 'len-18', buyerLenderId: 'len-16', amount: 25000000, price: 99.50, tradeDate: '2025-01-28', settlementDate: '2025-02-15', status: 'settling', type: 'assignment' },
  { id: 'trd-2', dealId: 'deal-1', facilityId: 'fac-1', sellerLenderId: 'len-6', buyerLenderId: 'len-12', amount: 37500000, price: 100.00, tradeDate: '2025-02-03', settlementDate: '2025-02-20', status: 'pending_approval', type: 'assignment' },
  { id: 'trd-3', dealId: 'deal-4', facilityId: 'fac-4', sellerLenderId: 'len-9', buyerLenderId: 'len-13', amount: 20000000, price: 98.75, tradeDate: '2025-02-05', settlementDate: '2025-02-25', status: 'pending_approval', type: 'assignment' },
  { id: 'trd-4', dealId: 'deal-2', facilityId: 'fac-2', sellerLenderId: 'len-8', buyerLenderId: 'len-11', amount: 15000000, price: 99.25, tradeDate: '2025-02-07', settlementDate: '2025-02-28', status: 'pending', type: 'participation' },
  { id: 'trd-5', dealId: 'deal-1', facilityId: 'fac-1', sellerLenderId: 'len-14', buyerLenderId: 'len-18', amount: 18750000, price: 100.125, tradeDate: '2025-02-10', settlementDate: '2025-03-05', status: 'pending', type: 'assignment' },
  { id: 'trd-6', dealId: 'deal-3', facilityId: 'fac-3', sellerLenderId: 'len-6', buyerLenderId: 'len-15', amount: 25000000, price: 100.00, tradeDate: '2025-01-15', settlementDate: '2025-02-01', status: 'settled', type: 'assignment' },
  { id: 'trd-7', dealId: 'deal-9', facilityId: 'fac-9', sellerLenderId: 'len-15', buyerLenderId: 'len-12', amount: 12500000, price: 99.875, tradeDate: '2025-02-11', settlementDate: '2025-03-01', status: 'pending', type: 'assignment' },
  { id: 'trd-8', dealId: 'deal-6', facilityId: 'fac-6', sellerLenderId: 'len-17', buyerLenderId: 'len-10', amount: 25000000, price: 99.00, tradeDate: '2025-01-20', settlementDate: '2025-02-10', status: 'settled', type: 'assignment' },
]
