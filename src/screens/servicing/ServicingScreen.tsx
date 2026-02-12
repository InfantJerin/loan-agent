import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { DealLink } from '@/components/shared/DealLink'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { BatchActionBar } from '@/components/shared/BatchActionBar'
import { TimelineEvent } from '@/components/shared/TimelineEvent'
import { useSelection } from '@/hooks/useSelection'
import { rateSets, payments, distributions, events, getDealById, getFacilityById, getLenderById } from '@/data'
import { formatPercent, formatBps, formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

export function ServicingScreen() {
  const { selectedItems, toggle, clear, isSelected, selectedCount } = useSelection()

  const todayRateSets = useMemo(() => rateSets.filter(r => r.status === 'active' || r.status === 'pending_approval'), [])
  const todayPayments = useMemo(() => payments.filter(p => p.status !== 'completed'), [])
  const pendingDistributions = useMemo(() => distributions.filter(d => d.status === 'pending'), [])
  const upcomingEvents = useMemo(() =>
    events.filter(e => e.status === 'upcoming' || e.status === 'overdue').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 10),
    []
  )

  const totalPending = todayPayments.reduce((s, p) => s + p.amount, 0)
  const overduePayments = todayPayments.filter(p => p.status === 'overdue')

  return (
    <div className="space-y-6">
      <SectionHeader title="Servicing Dashboard" description="Cross-portfolio rate and payment activity" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Active Rate Sets</div><div className="text-2xl font-bold mt-1">{todayRateSets.filter(r => r.status === 'active').length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Pending Rate Approvals</div><div className="text-2xl font-bold mt-1 text-yellow-600">{todayRateSets.filter(r => r.status === 'pending_approval').length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Pending Payments</div><div className="text-2xl font-bold mt-1"><CurrencyDisplay amount={totalPending} compact /></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Overdue</div><div className="text-2xl font-bold mt-1 text-red-600">{overduePayments.length}</div></CardContent></Card>
      </div>

      {/* Rate Activity */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Rate Activity</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Base Rate</TableHead>
                <TableHead>Spread</TableHead>
                <TableHead>All-In Rate</TableHead>
                <TableHead>Effective</TableHead>
                <TableHead>Notional</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todayRateSets.map(rs => {
                const deal = getDealById(rs.dealId)
                const fac = getFacilityById(rs.facilityId)
                const isDiscrepancy = rs.status === 'pending_approval'
                return (
                  <TableRow key={rs.id} className={cn(isDiscrepancy && 'bg-amber-50')}>
                    <TableCell>{deal && <DealLink dealId={deal.id}>{deal.name.split(' ').slice(0, 2).join(' ')}</DealLink>}</TableCell>
                    <TableCell className="text-sm">{fac?.name}</TableCell>
                    <TableCell>{rs.baseRate}</TableCell>
                    <TableCell>{formatBps(rs.spread)}</TableCell>
                    <TableCell className="font-medium">{formatPercent(rs.allInRate)}</TableCell>
                    <TableCell><DateDisplay date={rs.effectiveDate} /></TableCell>
                    <TableCell><CurrencyDisplay amount={rs.notionalAmount} compact /></TableCell>
                    <TableCell><StatusBadge status={rs.status} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Activity */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Payment Activity</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todayPayments.map(p => {
                const deal = getDealById(p.dealId)
                return (
                  <TableRow key={p.id} className={cn(p.status === 'overdue' && 'bg-red-50')}>
                    <TableCell>{deal && <DealLink dealId={deal.id}>{deal.name.split(' ').slice(0, 2).join(' ')}</DealLink>}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs capitalize">{p.type.replace(/_/g, ' ')}</Badge></TableCell>
                    <TableCell className="text-sm">{p.period}</TableCell>
                    <TableCell className="text-right"><CurrencyDisplay amount={p.amount} exact /></TableCell>
                    <TableCell><DateDisplay date={p.dueDate} /></TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pending Distributions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Pending Distributions</CardTitle>
            <Badge variant="secondary">{pendingDistributions.length} pending</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={selectedCount === pendingDistributions.length && selectedCount > 0} onCheckedChange={() => selectedCount === pendingDistributions.length ? clear() : pendingDistributions.forEach(d => !isSelected(d.id) && toggle(d.id))} /></TableHead>
                <TableHead>Deal</TableHead>
                <TableHead>Lender</TableHead>
                <TableHead>Share</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingDistributions.map(d => {
                const deal = getDealById(d.dealId)
                const lender = getLenderById(d.lenderId)
                return (
                  <TableRow key={d.id}>
                    <TableCell><Checkbox checked={isSelected(d.id)} onCheckedChange={() => toggle(d.id)} /></TableCell>
                    <TableCell>{deal && <DealLink dealId={deal.id}>{deal.name.split(' ').slice(0, 2).join(' ')}</DealLink>}</TableCell>
                    <TableCell>{lender?.shortName}</TableCell>
                    <TableCell>{formatPercent(d.share, 1)}</TableCell>
                    <TableCell className="text-right"><CurrencyDisplay amount={d.amount} exact /></TableCell>
                    <TableCell><DateDisplay date={d.distributionDate} /></TableCell>
                    <TableCell><StatusBadge status={d.status} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <BatchActionBar count={selectedCount} onApprove={() => clear()} onClear={clear} />
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Upcoming Events</CardTitle></CardHeader>
        <CardContent className="divide-y">
          {upcomingEvents.map(e => <TimelineEvent key={e.id} event={e} />)}
        </CardContent>
      </Card>
    </div>
  )
}
