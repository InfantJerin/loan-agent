import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { DealLink, LenderLink } from '@/components/shared/DealLink'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { PercentageBar } from '@/components/shared/PercentageBar'
import { positions, trades, consents, distributions, deals, getLenderById, getDealById, getFacilityById, getConsentsByTradeId } from '@/data'
import { formatCurrency, formatPercent } from '@/lib/format'
import { cn } from '@/lib/utils'

export function AgencyScreen() {
  const [activeTab, setActiveTab] = useState('positions')

  // Aggregate lender positions across all deals
  const lenderBook = useMemo(() => {
    const map = new Map<string, { lenderId: string; name: string; totalCommitment: number; totalFunded: number; dealCount: number; deals: Map<string, { commitment: number; funded: number; share: number }> }>()
    positions.forEach(p => {
      const lender = getLenderById(p.lenderId)
      if (!lender) return
      let entry = map.get(p.lenderId)
      if (!entry) {
        entry = { lenderId: p.lenderId, name: lender.shortName, totalCommitment: 0, totalFunded: 0, dealCount: 0, deals: new Map() }
        map.set(p.lenderId, entry)
      }
      entry.totalCommitment += p.commitment
      entry.totalFunded += p.funded
      if (!entry.deals.has(p.dealId)) {
        entry.deals.set(p.dealId, { commitment: 0, funded: 0, share: p.share })
        entry.dealCount++
      }
      const dealEntry = entry.deals.get(p.dealId)!
      dealEntry.commitment += p.commitment
      dealEntry.funded += p.funded
    })
    return Array.from(map.values()).sort((a, b) => b.totalCommitment - a.totalCommitment)
  }, [])

  const [expandedLender, setExpandedLender] = useState<string | null>(null)

  // Trade pipeline
  const activeTrades = useMemo(() => trades.filter(t => t.status !== 'settled'), [])
  const tradeStages = ['pending', 'pending_approval', 'approved', 'settling', 'settled']

  return (
    <div className="space-y-6">
      <SectionHeader title="Agency & Syndication" description="Lender positions, trades, and consent tracking" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total Lenders</div><div className="text-2xl font-bold mt-1">{lenderBook.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Active Trades</div><div className="text-2xl font-bold mt-1 text-blue-600">{activeTrades.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Pending Consents</div><div className="text-2xl font-bold mt-1 text-amber-600">{consents.filter(c => c.status === 'pending').length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total Commitments</div><div className="text-2xl font-bold mt-1"><CurrencyDisplay amount={lenderBook.reduce((s, l) => s + l.totalCommitment, 0)} compact /></div></CardContent></Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="positions">Lender Position Book</TabsTrigger>
          <TabsTrigger value="trades">Trade Pipeline</TabsTrigger>
          <TabsTrigger value="consents">Consent Tracking</TabsTrigger>
          <TabsTrigger value="distributions">Distribution Center</TabsTrigger>
        </TabsList>

        <TabsContent value="positions">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lender</TableHead>
                    <TableHead className="text-right">Total Commitment</TableHead>
                    <TableHead className="text-right">Total Funded</TableHead>
                    <TableHead>Deals</TableHead>
                    <TableHead className="w-32">Utilization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lenderBook.map(entry => (
                    <>
                      <TableRow key={entry.lenderId} className="cursor-pointer hover:bg-muted/50" onClick={() => setExpandedLender(expandedLender === entry.lenderId ? null : entry.lenderId)}>
                        <TableCell className="font-medium"><LenderLink lenderId={entry.lenderId}>{entry.name}</LenderLink></TableCell>
                        <TableCell className="text-right"><CurrencyDisplay amount={entry.totalCommitment} /></TableCell>
                        <TableCell className="text-right"><CurrencyDisplay amount={entry.totalFunded} /></TableCell>
                        <TableCell>{entry.dealCount} deals</TableCell>
                        <TableCell>
                          <PercentageBar value={entry.totalCommitment > 0 ? (entry.totalFunded / entry.totalCommitment) * 100 : 0} />
                        </TableCell>
                      </TableRow>
                      {expandedLender === entry.lenderId && Array.from(entry.deals.entries()).map(([dealId, pos]) => {
                        const deal = getDealById(dealId)
                        return (
                          <TableRow key={`${entry.lenderId}-${dealId}`} className="bg-muted/30">
                            <TableCell className="pl-8 text-sm">{deal && <DealLink dealId={deal.id}>{deal.name}</DealLink>}</TableCell>
                            <TableCell className="text-right text-sm"><CurrencyDisplay amount={pos.commitment} /></TableCell>
                            <TableCell className="text-right text-sm"><CurrencyDisplay amount={pos.funded} /></TableCell>
                            <TableCell className="text-sm">{formatPercent(pos.share, 1)} share</TableCell>
                            <TableCell />
                          </TableRow>
                        )
                      })}
                    </>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades">
          <div className="space-y-4">
            {trades.map(trade => {
              const deal = getDealById(trade.dealId)
              const seller = getLenderById(trade.sellerLenderId)
              const buyer = getLenderById(trade.buyerLenderId)
              const stageIndex = tradeStages.indexOf(trade.status)
              return (
                <Card key={trade.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-sm">{seller?.shortName} → {buyer?.shortName}</div>
                        <div className="text-xs text-muted-foreground">{deal && <DealLink dealId={deal.id}>{deal.name}</DealLink>}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium"><CurrencyDisplay amount={trade.amount} /></div>
                        <div className="text-xs text-muted-foreground">@ {trade.price}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {tradeStages.map((stage, i) => (
                        <div key={stage} className="flex-1 flex items-center gap-1">
                          <div className={cn('h-2 rounded-full flex-1', i <= stageIndex ? 'bg-primary' : 'bg-gray-200')} />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Trade: <DateDisplay date={trade.tradeDate} /></span>
                      <StatusBadge status={trade.status} />
                      <span>Settlement: <DateDisplay date={trade.settlementDate} /></span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="consents">
          <div className="space-y-4">
            {trades.filter(t => t.status === 'pending_approval').map(trade => {
              const tradeConsents = getConsentsByTradeId(trade.id)
              const deal = getDealById(trade.dealId)
              const seller = getLenderById(trade.sellerLenderId)
              const buyer = getLenderById(trade.buyerLenderId)
              const approvedCount = tradeConsents.filter(c => c.status === 'approved').length
              const progress = tradeConsents.length > 0 ? (approvedCount / tradeConsents.length) * 100 : 0

              return (
                <Card key={trade.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-sm">{seller?.shortName} → {buyer?.shortName}</CardTitle>
                        <div className="text-xs text-muted-foreground">{deal && <DealLink dealId={deal.id}>{deal.name}</DealLink>}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{approvedCount}/{tradeConsents.length} approved</div>
                        <Progress value={progress} className="h-2 w-24 mt-1" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {tradeConsents.map(c => {
                        const lender = getLenderById(c.lenderId)
                        return (
                          <div key={c.id} className={cn('rounded-lg border p-2 text-sm', c.status === 'approved' ? 'bg-green-50 border-green-200' : c.status === 'rejected' ? 'bg-red-50 border-red-200' : 'bg-gray-50')}>
                            <div className="font-medium text-xs">{lender?.shortName}</div>
                            <StatusBadge status={c.status} />
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="distributions">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deal</TableHead>
                    <TableHead>Lender</TableHead>
                    <TableHead>Share</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {distributions.map(d => {
                    const deal = getDealById(d.dealId)
                    const lender = getLenderById(d.lenderId)
                    return (
                      <TableRow key={d.id}>
                        <TableCell>{deal && <DealLink dealId={deal.id}>{deal.name.split(' ').slice(0, 2).join(' ')}</DealLink>}</TableCell>
                        <TableCell><LenderLink lenderId={d.lenderId}>{lender?.shortName || d.lenderId}</LenderLink></TableCell>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
