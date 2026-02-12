export const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  'pending_approval': 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  overdue: 'bg-red-100 text-red-800',
  processing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  draft: 'bg-gray-100 text-gray-800',
  closed: 'bg-gray-100 text-gray-800',
  settled: 'bg-green-100 text-green-800',
  'in_review': 'bg-blue-100 text-blue-800',
  failed: 'bg-red-100 text-red-800',
  classified: 'bg-blue-100 text-blue-800',
  extracted: 'bg-purple-100 text-purple-800',
  verified: 'bg-green-100 text-green-800',
  queued: 'bg-gray-100 text-gray-800',
}

export const PRIORITY_COLORS: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500',
}

export const PRIORITY_TEXT_COLORS: Record<string, string> = {
  critical: 'text-red-700',
  high: 'text-orange-700',
  medium: 'text-yellow-700',
  low: 'text-blue-700',
}

export const CONFIDENCE_COLORS: Record<string, string> = {
  high: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-amber-100 text-amber-800 border-amber-300',
  low: 'bg-red-100 text-red-800 border-red-300',
}

export const CONFIDENCE_THRESHOLDS = {
  high: 0.95,
  medium: 0.80,
}

export function getConfidenceLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= CONFIDENCE_THRESHOLDS.high) return 'high'
  if (score >= CONFIDENCE_THRESHOLDS.medium) return 'medium'
  return 'low'
}

export const EVENT_TYPE_COLORS: Record<string, string> = {
  payment: 'bg-green-500',
  rate_set: 'bg-blue-500',
  maturity: 'bg-purple-500',
  rollover: 'bg-indigo-500',
  covenant: 'bg-orange-500',
  notice: 'bg-teal-500',
  distribution: 'bg-cyan-500',
  trade_settlement: 'bg-pink-500',
}

export const NAV_ITEMS = [
  { label: 'My Work', path: '/', icon: 'LayoutDashboard' },
  { label: 'Deals', path: '/deals', icon: 'Briefcase' },
  { label: 'Servicing', path: '/servicing', icon: 'Settings' },
  { label: 'Documents', path: '/documents', icon: 'FileText' },
  { label: 'Agency', path: '/agency', icon: 'Building2' },
  { label: 'Reports', path: '/reports', icon: 'BarChart3' },
] as const

export const SLA_THRESHOLD = {
  green: 95,
  yellow: 85,
}
