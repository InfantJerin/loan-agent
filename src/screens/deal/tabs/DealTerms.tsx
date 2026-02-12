import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { getDealById, getFacilitiesByDealId, getRateSetsByDealId } from '@/data'
import { formatPercent, formatBps, formatCurrency } from '@/lib/format'

export function DealTerms() {
  const { dealId } = useParams<{ dealId: string }>()
  const deal = getDealById(dealId!)
  if (!deal) return null

  const facilities = getFacilitiesByDealId(deal.id)
  const rateSets = getRateSetsByDealId(deal.id).sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())

  return (
    <div className="space-y-6">
      {/* Pricing Grid */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Pricing Grid</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Facility</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Base Rate</TableHead>
                <TableHead>Spread</TableHead>
                <TableHead>Day Count</TableHead>
                <TableHead>Maturity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facilities.map(f => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.name}</TableCell>
                  <TableCell><Badge variant="secondary" className="capitalize text-xs">{f.type.replace(/_/g, ' ')}</Badge></TableCell>
                  <TableCell>{f.pricing.split('+')[0]?.trim()}</TableCell>
                  <TableCell>{f.pricing.split('+')[1]?.trim()}</TableCell>
                  <TableCell>{f.dayCount}</TableCell>
                  <TableCell><DateDisplay date={f.maturityDate} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rate History */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Rate Set History</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Base Rate</TableHead>
                <TableHead>Spread</TableHead>
                <TableHead>All-In Rate</TableHead>
                <TableHead>Effective</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Notional</TableHead>
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
                  <TableCell>{formatCurrency(rs.notionalAmount)}</TableCell>
                  <TableCell><StatusBadge status={rs.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Fee Schedule */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Fee Schedule</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Basis</TableHead>
                <TableHead>Frequency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Commitment Fee</TableCell>
                <TableCell>0.250%</TableCell>
                <TableCell>Unused commitment</TableCell>
                <TableCell>Quarterly</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Admin Agent Fee</TableCell>
                <TableCell>$75,000</TableCell>
                <TableCell>Flat</TableCell>
                <TableCell>Annual</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LC Fee</TableCell>
                <TableCell>2.250%</TableCell>
                <TableCell>LC outstanding</TableCell>
                <TableCell>Quarterly</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
