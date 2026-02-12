import type { Covenant } from '@/types'

export const covenants: Covenant[] = [
  {
    id: 'cov-1', dealId: 'deal-1', name: 'Maximum Total Leverage Ratio', type: 'financial',
    threshold: 4.0, currentValue: 3.25, testDate: '2025-02-15', status: 'compliant',
    metric: 'Total Debt / EBITDA', frequency: 'quarterly',
    history: [
      { date: '2024-03-31', value: 3.1 }, { date: '2024-06-30', value: 3.0 },
      { date: '2024-09-30', value: 3.15 }, { date: '2024-12-31', value: 3.25 },
    ]
  },
  {
    id: 'cov-2', dealId: 'deal-1', name: 'Minimum Interest Coverage Ratio', type: 'financial',
    threshold: 3.0, currentValue: 4.8, testDate: '2025-02-15', status: 'compliant',
    metric: 'EBITDA / Interest Expense', frequency: 'quarterly',
    history: [
      { date: '2024-03-31', value: 5.2 }, { date: '2024-06-30', value: 5.0 },
      { date: '2024-09-30', value: 4.9 }, { date: '2024-12-31', value: 4.8 },
    ]
  },
  {
    id: 'cov-3', dealId: 'deal-1', name: 'Minimum Fixed Charge Coverage', type: 'financial',
    threshold: 1.25, currentValue: 1.85, testDate: '2025-02-15', status: 'compliant',
    metric: '(EBITDA - CapEx) / Fixed Charges', frequency: 'quarterly',
    history: [
      { date: '2024-03-31', value: 2.1 }, { date: '2024-06-30', value: 2.0 },
      { date: '2024-09-30', value: 1.95 }, { date: '2024-12-31', value: 1.85 },
    ]
  },
  {
    id: 'cov-4', dealId: 'deal-2', name: 'Maximum First Lien Leverage', type: 'financial',
    threshold: 5.5, currentValue: 4.8, testDate: '2025-02-20', status: 'compliant',
    metric: 'First Lien Debt / EBITDA', frequency: 'quarterly',
    history: [
      { date: '2024-03-31', value: 5.0 }, { date: '2024-06-30', value: 4.9 },
      { date: '2024-09-30', value: 4.85 }, { date: '2024-12-31', value: 4.8 },
    ]
  },
  {
    id: 'cov-5', dealId: 'deal-3', name: 'Maximum Total Leverage', type: 'financial',
    threshold: 3.5, currentValue: 3.2, testDate: '2025-03-01', status: 'warning',
    metric: 'Total Debt / EBITDA', frequency: 'quarterly',
    history: [
      { date: '2024-03-31', value: 2.8 }, { date: '2024-06-30', value: 2.9 },
      { date: '2024-09-30', value: 3.0 }, { date: '2024-12-31', value: 3.2 },
    ]
  },
  {
    id: 'cov-6', dealId: 'deal-5', name: 'Minimum Fixed Charge Coverage', type: 'financial',
    threshold: 1.10, currentValue: 1.05, testDate: '2025-02-15', status: 'breach',
    metric: '(EBITDA - CapEx) / Fixed Charges', frequency: 'quarterly',
    history: [
      { date: '2024-03-31', value: 1.35 }, { date: '2024-06-30', value: 1.25 },
      { date: '2024-09-30', value: 1.15 }, { date: '2024-12-31', value: 1.05 },
    ]
  },
  {
    id: 'cov-7', dealId: 'deal-4', name: 'Maximum Leverage Ratio', type: 'financial',
    threshold: 4.5, currentValue: 3.6, testDate: '2025-03-10', status: 'compliant',
    metric: 'Total Debt / EBITDA', frequency: 'quarterly',
    history: [
      { date: '2024-09-30', value: 3.4 }, { date: '2024-12-31', value: 3.6 },
    ]
  },
  {
    id: 'cov-8', dealId: 'deal-1', name: 'Quarterly Financial Reporting', type: 'reporting',
    threshold: 0, currentValue: 0, testDate: '2025-02-15', status: 'compliant',
    metric: 'Days after quarter end', frequency: 'quarterly',
    history: []
  },
]
