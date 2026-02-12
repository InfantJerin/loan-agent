import { useParams, NavLink, Outlet, Navigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getDealById, getBorrowerById, getFacilitiesByDealId } from '@/data'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { PercentageBar } from '@/components/shared/PercentageBar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Overview', path: 'overview' },
  { label: 'Terms', path: 'terms' },
  { label: 'Positions', path: 'positions' },
  { label: 'Servicing', path: 'servicing' },
  { label: 'Covenants', path: 'covenants' },
  { label: 'Notices', path: 'notices' },
  { label: 'Documents', path: 'documents' },
  { label: 'Activity', path: 'activity' },
]

export function DealLayout() {
  const { dealId } = useParams<{ dealId: string }>()
  const deal = dealId ? getDealById(dealId) : null

  if (!deal) return <div className="p-8 text-center text-muted-foreground">Deal not found</div>

  const borrower = getBorrowerById(deal.borrowerId)
  const facilities = getFacilitiesByDealId(deal.id)
  const utilization = deal.totalCommitment > 0 ? (deal.outstandingBalance / deal.totalCommitment) * 100 : 0

  return (
    <div className="space-y-0">
      {/* Sticky Deal Header */}
      <div className="sticky top-14 z-20 bg-white border-b -mx-6 -mt-6 px-6 pt-4 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <Link to="/deals"><Button variant="ghost" size="sm" className="gap-1 text-xs"><ArrowLeft className="h-3 w-3" /> Deals</Button></Link>
        </div>
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">{deal.name}</h1>
              <StatusBadge status={deal.status} />
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span>{borrower?.name}</span>
              <span>{deal.dealType}</span>
              <span>{deal.agentBank}</span>
              {deal.cusip && <span className="font-mono text-xs">CUSIP: {deal.cusip}</span>}
            </div>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div>
              <div className="text-xs text-muted-foreground">Commitment</div>
              <div className="text-lg font-bold"><CurrencyDisplay amount={deal.totalCommitment} compact /></div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Outstanding</div>
              <div className="text-lg font-bold"><CurrencyDisplay amount={deal.outstandingBalance} compact /></div>
            </div>
            <div className="w-24">
              <div className="text-xs text-muted-foreground mb-1">Utilization {utilization.toFixed(0)}%</div>
              <PercentageBar value={utilization} color={utilization > 80 ? 'bg-red-500' : utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'} />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Maturity</div>
              <div className="text-sm font-medium"><DateDisplay date={deal.maturityDate} /></div>
            </div>
          </div>
        </div>
        <nav className="flex gap-0 -mb-px">
          {tabs.map(tab => (
            <NavLink key={tab.path} to={tab.path} className={({ isActive }) => cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
              isActive ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
            )}>
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="pt-6">
        <Outlet />
      </div>
    </div>
  )
}
