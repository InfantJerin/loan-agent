import { useParams } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LenderLink } from '@/components/shared/DealLink'
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { getPositionsByDealId, getLenderById, getFacilitiesByDealId } from '@/data'
import { formatCurrency, formatPercent } from '@/lib/format'

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#2563eb', '#1d4ed8', '#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd']

export function DealPositions() {
  const { dealId } = useParams<{ dealId: string }>()
  const positions = getPositionsByDealId(dealId!)
  const facilities = getFacilitiesByDealId(dealId!)

  const lenderMap = new Map<string, { name: string; commitment: number; funded: number; unfunded: number; share: number }>()
  positions.forEach(p => {
    const lender = getLenderById(p.lenderId)
    const name = lender?.shortName || p.lenderId
    const existing = lenderMap.get(p.lenderId)
    if (existing) {
      existing.commitment += p.commitment
      existing.funded += p.funded
      existing.unfunded += p.unfunded
    } else {
      lenderMap.set(p.lenderId, { name, commitment: p.commitment, funded: p.funded, unfunded: p.unfunded, share: p.share })
    }
  })
  const lenderPositions = Array.from(lenderMap.entries())
  const pieData = lenderPositions.map(([, v]) => ({ name: v.name, value: v.commitment }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-sm">Lender Positions</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lender</TableHead>
                    <TableHead className="text-right">Commitment</TableHead>
                    <TableHead className="text-right">Funded</TableHead>
                    <TableHead className="text-right">Unfunded</TableHead>
                    <TableHead className="text-right">Share %</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lenderPositions.map(([lenderId, pos]) => (
                    <TableRow key={lenderId}>
                      <TableCell><LenderLink lenderId={lenderId}>{pos.name}</LenderLink></TableCell>
                      <TableCell className="text-right"><CurrencyDisplay amount={pos.commitment} /></TableCell>
                      <TableCell className="text-right"><CurrencyDisplay amount={pos.funded} /></TableCell>
                      <TableCell className="text-right"><CurrencyDisplay amount={pos.unfunded} /></TableCell>
                      <TableCell className="text-right font-medium">{formatPercent(pos.share, 1)}</TableCell>
                      <TableCell><StatusBadge status="active" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-sm">Pro-Rata Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`} labelLine={false}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
