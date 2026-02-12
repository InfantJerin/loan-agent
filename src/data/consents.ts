import type { Consent } from '@/types'

export const consents: Consent[] = [
  // Consents for trd-2 (Meridian deal assignment)
  { id: 'con-1', tradeId: 'trd-2', lenderId: 'len-1', status: 'approved', requestDate: '2025-02-03', responseDate: '2025-02-05', notes: 'Approved per standard terms' },
  { id: 'con-2', tradeId: 'trd-2', lenderId: 'len-2', status: 'approved', requestDate: '2025-02-03', responseDate: '2025-02-06' },
  { id: 'con-3', tradeId: 'trd-2', lenderId: 'len-3', status: 'pending', requestDate: '2025-02-03' },
  { id: 'con-4', tradeId: 'trd-2', lenderId: 'len-4', status: 'approved', requestDate: '2025-02-03', responseDate: '2025-02-04' },
  { id: 'con-5', tradeId: 'trd-2', lenderId: 'len-5', status: 'pending', requestDate: '2025-02-03' },
  { id: 'con-6', tradeId: 'trd-2', lenderId: 'len-7', status: 'approved', requestDate: '2025-02-03', responseDate: '2025-02-07' },
  { id: 'con-7', tradeId: 'trd-2', lenderId: 'len-11', status: 'pending', requestDate: '2025-02-03' },
  { id: 'con-8', tradeId: 'trd-2', lenderId: 'len-14', status: 'rejected', requestDate: '2025-02-03', responseDate: '2025-02-08', notes: 'Requires additional documentation' },
  // Consents for trd-3
  { id: 'con-9', tradeId: 'trd-3', lenderId: 'len-4', status: 'approved', requestDate: '2025-02-05', responseDate: '2025-02-07' },
  { id: 'con-10', tradeId: 'trd-3', lenderId: 'len-1', status: 'approved', requestDate: '2025-02-05', responseDate: '2025-02-06' },
  { id: 'con-11', tradeId: 'trd-3', lenderId: 'len-7', status: 'pending', requestDate: '2025-02-05' },
  { id: 'con-12', tradeId: 'trd-3', lenderId: 'len-10', status: 'pending', requestDate: '2025-02-05' },
  { id: 'con-13', tradeId: 'trd-3', lenderId: 'len-15', status: 'approved', requestDate: '2025-02-05', responseDate: '2025-02-09' },
]
