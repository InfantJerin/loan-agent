import { useParams } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { PercentageBar } from '@/components/shared/PercentageBar'
import { DealLink } from '@/components/shared/DealLink'
import { getDealById, getBorrowerById, getFacilitiesByDealId, getPositionsByDealId, getRateSetsByDealId, getTasksByDealId } from '@/data'
import { getLenderById } from '@/data'
import { formatCurrency, formatPercent } from '@/lib/format'

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#2563eb', '#1d4ed8', '#6366f1', '#8b5cf6', '#a78bfa']

export function DealOverview() {
  const { dealId } = useParams<{ dealId: string }>()
  const deal = getDealById(dealId!)
  if (!deal) return null

  const borrower = getBorrowerById(deal.borrowerId)
  const facilities = getFacilitiesByDealId(deal.id)
  const positions = getPositionsByDealId(deal.id)
  const rateSets = getRateSetsByDealId(deal.id).filter(r => r.status === 'active')
  const tasks = getTasksByDealId(deal.id).filter(t => t.status === 'pending')

  // Position pie data - aggregate by lender
  const lenderMap = new Map<string, number>()
  positions.forEach(p => {
    const name = getLenderById(p.lenderId)?.shortName || p.lenderId
    lenderMap.set(name, (lenderMap.get(name) || 0) + p.commitment)
  })
  const pieData = Array.from(lenderMap.entries()).map(([name, value]) => ({ name, value }))

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Facilities</div><div className="text-2xl font-bold mt-1">{facilities.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Lenders</div><div className="text-2xl font-bold mt-1">{new Set(positions.map(p => p.lenderId)).size}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Active Rate</div><div className="text-2xl font-bold mt-1">{rateSets[0] ? formatPercent(rateSets[0].allInRate) : 'N/A'}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Open Tasks</div><div className="text-2xl font-bold mt-1">{tasks.length}</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Facility Cards */}
        <div className="space-y-4">
          <h3 className="font-semibold">Facilities</h3>
          {facilities.map(fac => {
            const util = fac.commitment > 0 ? (fac.drawn / fac.commitment) * 100 : 0
            return (
              <Card key={fac.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{fac.name}</span>
                      <Badge variant="secondary" className="text-xs capitalize">{fac.type.replace(/_/g, ' ')}</Badge>
                    </div>
                    <StatusBadge status={fac.status} />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><span className="text-xs text-muted-foreground block">Commitment</span><CurrencyDisplay amount={fac.commitment} compact /></div>
                    <div><span className="text-xs text-muted-foreground block">Drawn</span><CurrencyDisplay amount={fac.drawn} compact /></div>
                    <div><span className="text-xs text-muted-foreground block">Available</span><CurrencyDisplay amount={fac.available} compact /></div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{fac.pricing}</span>
                      <span>{util.toFixed(0)}% utilized</span>
                    </div>
                    <PercentageBar value={util} color={util > 80 ? 'bg-red-500' : util > 60 ? 'bg-yellow-500' : 'bg-green-500'} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Position Pie Chart */}
        <div>
          <h3 className="font-semibold mb-4">Lender Positions</h3>
          <Card>
            <CardContent className="p-4">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}>
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-muted-foreground">No positions</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Borrower Info */}
      {borrower && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Borrower Information</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-muted-foreground block text-xs">Name</span>{borrower.name}</div>
              <div><span className="text-muted-foreground block text-xs">Industry</span>{borrower.industry}</div>
              <div><span className="text-muted-foreground block text-xs">Rating</span>{borrower.rating}</div>
              <div><span className="text-muted-foreground block text-xs">Country</span>{borrower.country}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
