import { useNavigate } from 'react-router-dom'
import { Briefcase, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { PercentageBar } from '@/components/shared/PercentageBar'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { DataTable, type Column } from '@/components/shared/DataTable'
import { deals, getBorrowerById, getFacilitiesByDealId } from '@/data'
import type { Deal } from '@/types'
import { formatCompactNumber } from '@/lib/format'

const columns: Column<Deal>[] = [
  {
    key: 'name', header: 'Deal Name', sortable: true,
    render: (d) => (
      <div>
        <div className="font-medium text-sm">{d.name}</div>
        <div className="text-xs text-muted-foreground">{d.cusip || d.dealType}</div>
      </div>
    ),
  },
  {
    key: 'borrower', header: 'Borrower', sortable: true,
    render: (d) => {
      const b = getBorrowerById(d.borrowerId)
      return (
        <div>
          <div className="text-sm">{b?.name}</div>
          <div className="text-xs text-muted-foreground">{b?.industry} | {b?.rating}</div>
        </div>
      )
    },
  },
  { key: 'status', header: 'Status', render: (d) => <StatusBadge status={d.status} /> },
  {
    key: 'commitment', header: 'Commitment', sortable: true, className: 'text-right',
    render: (d) => <div className="text-right"><CurrencyDisplay amount={d.totalCommitment} compact /></div>,
  },
  {
    key: 'utilization', header: 'Utilization', className: 'w-40',
    render: (d) => {
      const pct = d.totalCommitment > 0 ? (d.outstandingBalance / d.totalCommitment) * 100 : 0
      return (
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>{formatCompactNumber(d.outstandingBalance)}</span>
            <span>{pct.toFixed(0)}%</span>
          </div>
          <PercentageBar value={pct} color={pct > 80 ? 'bg-red-500' : pct > 60 ? 'bg-yellow-500' : 'bg-green-500'} />
        </div>
      )
    },
  },
  {
    key: 'facilities', header: 'Facilities',
    render: (d) => {
      const facs = getFacilitiesByDealId(d.id)
      return <span className="text-sm">{facs.length} {facs.length === 1 ? 'facility' : 'facilities'}</span>
    },
  },
  { key: 'maturity', header: 'Maturity', sortable: true, render: (d) => <DateDisplay date={d.maturityDate} /> },
]

export function DealsListScreen() {
  const navigate = useNavigate()

  const summary = {
    total: deals.length,
    active: deals.filter(d => d.status === 'active').length,
    totalCommitment: deals.reduce((s, d) => s + d.totalCommitment, 0),
    totalOutstanding: deals.reduce((s, d) => s + d.outstandingBalance, 0),
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Deals" description={`${summary.total} deals across your portfolio`}
        action={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Deal</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total Deals</div><div className="text-2xl font-bold mt-1">{summary.total}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Active Deals</div><div className="text-2xl font-bold mt-1 text-green-600">{summary.active}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total Commitment</div><div className="text-2xl font-bold mt-1"><CurrencyDisplay amount={summary.totalCommitment} compact /></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Outstanding Balance</div><div className="text-2xl font-bold mt-1"><CurrencyDisplay amount={summary.totalOutstanding} compact /></div></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable data={deals} columns={columns} keyField="id" onRowClick={(d) => navigate(`/deals/${d.id}/overview`)} />
        </CardContent>
      </Card>
    </div>
  )
}
