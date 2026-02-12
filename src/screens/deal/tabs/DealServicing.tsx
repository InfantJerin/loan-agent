import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { getRateSetsByDealId, getPaymentsByDealId, getDistributionsByDealId, getLenderById } from '@/data'
import { formatPercent, formatBps } from '@/lib/format'

export function DealServicing() {
  const { dealId } = useParams<{ dealId: string }>()
  const rateSets = getRateSetsByDealId(dealId!).sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())
  const payments = getPaymentsByDealId(dealId!).sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
  const distributions = getDistributionsByDealId(dealId!)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-sm">Rate History</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Base Rate</TableHead>
                <TableHead>Spread</TableHead>
                <TableHead>All-In Rate</TableHead>
                <TableHead>Effective</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rateSets.map(rs => (
                <TableRow key={rs.id}>
                  <TableCell>{rs.baseRate}</TableCell>
                  <TableCell>{formatBps(rs.spread)}</TableCell>
                  <TableCell className="font-medium">{formatPercent(rs.allInRate)}</TableCell>
                  <TableCell><DateDisplay date={rs.effectiveDate} /></TableCell>
                  <TableCell><DateDisplay date={rs.maturityDate} /></TableCell>
                  <TableCell><StatusBadge status={rs.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Payment Schedule</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map(p => (
                <TableRow key={p.id} className={p.status === 'overdue' ? 'bg-red-50' : ''}>
                  <TableCell><Badge variant="secondary" className="capitalize text-xs">{p.type.replace(/_/g, ' ')}</Badge></TableCell>
                  <TableCell className="text-sm">{p.period}</TableCell>
                  <TableCell className="text-right"><CurrencyDisplay amount={p.amount} exact /></TableCell>
                  <TableCell><DateDisplay date={p.dueDate} /></TableCell>
                  <TableCell>{p.paidDate ? <DateDisplay date={p.paidDate} /> : '—'}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {distributions.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-sm">Distributions</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lender</TableHead>
                  <TableHead>Share</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Distribution Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {distributions.map(d => {
                  const lender = getLenderById(d.lenderId)
                  return (
                    <TableRow key={d.id}>
                      <TableCell>{lender?.shortName || d.lenderId}</TableCell>
                      <TableCell>{formatPercent(d.share, 1)}</TableCell>
                      <TableCell className="text-right"><CurrencyDisplay amount={d.amount} exact /></TableCell>
                      <TableCell><DateDisplay date={d.distributionDate} /></TableCell>
                      <TableCell><StatusBadge status={d.status} /></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
