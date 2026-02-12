import type { Deal } from '@/types'

export const deals: Deal[] = [
  {
    id: 'deal-1', name: 'Meridian Holdings Senior Secured Credit Facility', borrowerId: 'bor-1',
    status: 'active', dealType: 'Syndicated', closingDate: '2024-03-15', maturityDate: '2029-03-15',
    totalCommitment: 750000000, outstandingBalance: 425000000, currency: 'USD',
    agentBank: 'JPMorgan Chase Bank, N.A.', description: 'Senior secured revolving credit facility',
    cusip: '58933YAA2'
  },
  {
    id: 'deal-2', name: 'Atlas Industrial Term Loan B', borrowerId: 'bor-2',
    status: 'active', dealType: 'Syndicated', closingDate: '2024-01-20', maturityDate: '2031-01-20',
    totalCommitment: 500000000, outstandingBalance: 487500000, currency: 'USD',
    agentBank: 'Bank of America, N.A.', description: 'First lien term loan facility',
    cusip: '04942KAB8'
  },
  {
    id: 'deal-3', name: 'Pinnacle Healthcare Revolving Credit Facility', borrowerId: 'bor-3',
    status: 'active', dealType: 'Club Deal', closingDate: '2024-06-01', maturityDate: '2028-06-01',
    totalCommitment: 300000000, outstandingBalance: 150000000, currency: 'USD',
    agentBank: 'Citibank, N.A.', description: 'Senior unsecured revolving credit facility',
    cusip: '72345PAC1'
  },
  {
    id: 'deal-4', name: 'Vanguard Energy Delayed Draw Term Loan', borrowerId: 'bor-4',
    status: 'active', dealType: 'Syndicated', closingDate: '2024-09-10', maturityDate: '2030-09-10',
    totalCommitment: 400000000, outstandingBalance: 200000000, currency: 'USD',
    agentBank: 'Wells Fargo Bank, N.A.', description: 'Delayed draw term loan for expansion',
    cusip: '92345VAD3'
  },
  {
    id: 'deal-5', name: 'Sterling Retail ABL Facility', borrowerId: 'bor-5',
    status: 'active', dealType: 'Bilateral', closingDate: '2024-04-15', maturityDate: '2027-04-15',
    totalCommitment: 200000000, outstandingBalance: 165000000, currency: 'USD',
    agentBank: 'Goldman Sachs Lending Partners', description: 'Asset-based lending facility',
    cusip: '85345SAE5'
  },
  {
    id: 'deal-6', name: 'Nexus Communications GBP Facility', borrowerId: 'bor-6',
    status: 'active', dealType: 'Syndicated', closingDate: '2024-02-28', maturityDate: '2029-02-28',
    totalCommitment: 250000000, outstandingBalance: 180000000, currency: 'GBP',
    agentBank: 'Barclays Bank PLC', description: 'Multi-currency revolving credit facility',
    cusip: '65345NAF7'
  },
  {
    id: 'deal-7', name: 'Cascade Properties Construction Loan', borrowerId: 'bor-7',
    status: 'active', dealType: 'Club Deal', closingDate: '2024-07-01', maturityDate: '2026-12-31',
    totalCommitment: 350000000, outstandingBalance: 280000000, currency: 'USD',
    agentBank: 'Deutsche Bank AG', description: 'Construction and term loan facility',
  },
  {
    id: 'deal-8', name: 'Pacific Maritime Working Capital Line', borrowerId: 'bor-8',
    status: 'pending', dealType: 'Syndicated', closingDate: '2025-01-15', maturityDate: '2028-01-15',
    totalCommitment: 175000000, outstandingBalance: 0, currency: 'USD',
    agentBank: 'HSBC Bank PLC', description: 'Working capital revolving facility',
  },
  {
    id: 'deal-9', name: 'Meridian Holdings Term Loan A', borrowerId: 'bor-1',
    status: 'active', dealType: 'Syndicated', closingDate: '2024-03-15', maturityDate: '2029-03-15',
    totalCommitment: 250000000, outstandingBalance: 237500000, currency: 'USD',
    agentBank: 'JPMorgan Chase Bank, N.A.', description: 'Term loan A under credit facility',
    cusip: '58933YAG9'
  },
  {
    id: 'deal-10', name: 'Atlas Industrial Revolver', borrowerId: 'bor-2',
    status: 'active', dealType: 'Syndicated', closingDate: '2024-01-20', maturityDate: '2029-01-20',
    totalCommitment: 150000000, outstandingBalance: 45000000, currency: 'USD',
    agentBank: 'Bank of America, N.A.', description: 'Revolving credit facility',
    cusip: '04942KAH6'
  },
]
