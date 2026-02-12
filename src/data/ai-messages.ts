import type { AIMessage } from '@/types'

export const sampleAIMessages: AIMessage[] = [
  {
    id: 'ai-1', role: 'assistant', content: "Good morning! I see you have 15 open tasks today, including 5 rate set approvals and 1 critical escalation for Sterling Retail's overdue payment. Would you like me to prioritize your workflow?",
    timestamp: '2025-02-12T08:00:00Z',
    suggestedActions: [
      { label: 'Show critical items', action: 'filter-critical' },
      { label: 'Review rate sets', action: 'navigate-rate-sets' },
      { label: 'Sterling Retail details', action: 'navigate-deal-5' },
    ]
  },
  {
    id: 'ai-2', role: 'user', content: "What's the status of the Meridian Holdings rate set?",
    timestamp: '2025-02-12T08:01:00Z',
  },
  {
    id: 'ai-3', role: 'assistant', content: "The Meridian Holdings Revolver has a pending rate set for March 2025:\n\n- **Base Rate:** SOFR (4.33%)\n- **Spread:** 225 bps\n- **All-in Rate:** 6.55%\n- **Effective Date:** March 15, 2025\n- **Notional:** $425,000,000\n\nThis represents a 3 bps decrease from the current rate of 6.58%. The rate set requires your approval by February 14.",
    timestamp: '2025-02-12T08:01:30Z',
    citations: [
      { text: 'Meridian Holdings Senior Secured Credit Facility', dealId: 'deal-1' },
      { text: 'Rate Set RS-2', dealId: 'deal-1' },
    ],
    suggestedActions: [
      { label: 'Approve rate set', action: 'approve-rs-2' },
      { label: 'View deal details', action: 'navigate-deal-1' },
      { label: 'Compare to market', action: 'compare-rates' },
    ]
  },
]
