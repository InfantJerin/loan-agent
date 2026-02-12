import { useState, useMemo } from 'react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, AreaChart, Area,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { LenderLink } from '@/components/shared/DealLink'
import { deals, facilities, positions, lenders, borrowers, getLenderById, getBorrowerById } from '@/data'
import { formatCurrency, formatCompactNumber } from '@/lib/format'

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#14b8a6']

// SLA mock data
const slaData = [
  { month: 'Sep', sla: 94 }, { month: 'Oct', sla: 96 }, { month: 'Nov', sla: 93 },
  { month: 'Dec', sla: 91 }, { month: 'Jan', sla: 95 }, { month: 'Feb', sla: 92 },
]

const extractionAccuracyData = [
  { month: 'Sep', accuracy: 89 }, { month: 'Oct', accuracy: 91 }, { month: 'Nov', accuracy: 90 },
  { month: 'Dec', accuracy: 93 }, { month: 'Jan', accuracy: 94 }, { month: 'Feb', accuracy: 93 },
]

const processingTimeData = [
  { month: 'Sep', time: 4.2 }, { month: 'Oct', time: 3.8 }, { month: 'Nov', time: 3.5 },
  { month: 'Dec', time: 3.2 }, { month: 'Jan', time: 2.9 }, { month: 'Feb', time: 2.7 },
]

const workloadData = [
  { day: 'Mon', tasks: 45 }, { day: 'Tue', tasks: 52 }, { day: 'Wed', tasks: 38 },
  { day: 'Thu', tasks: 61 }, { day: 'Fri', tasks: 34 },
]

export function ReportsScreen() {
  const [activeTab, setActiveTab] = useState('operational')

  // Facility type breakdown
  const facilityTypeData = useMemo(() => {
    const map = new Map<string, number>()
    facilities.forEach(f => {
      const type = f.type.replace(/_/g, ' ')
      map.set(type, (map.get(type) || 0) + f.commitment)
    })
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [])

  // Borrower exposure
  const borrowerExposure = useMemo(() => {
    const map = new Map<string, number>()
    deals.forEach(d => {
      const b = getBorrowerById(d.borrowerId)
      const name = b?.name.split(' ').slice(0, 2).join(' ') || d.borrowerId
      map.set(name, (map.get(name) || 0) + d.outstandingBalance)
    })
    return Array.from(map.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
  }, [])

  // Maturity profile
  const maturityProfile = useMemo(() => {
    const years = new Map<string, { term_loan: number; revolver: number; other: number }>()
    facilities.forEach(f => {
      const year = f.maturityDate.slice(0, 4)
      if (!years.has(year)) years.set(year, { term_loan: 0, revolver: 0, other: 0 })
      const entry = years.get(year)!
      if (f.type === 'term_loan') entry.term_loan += f.commitment
      else if (f.type === 'revolver') entry.revolver += f.commitment
      else entry.other += f.commitment
    })
    return Array.from(years.entries()).map(([year, vals]) => ({ year, ...vals })).sort((a, b) => a.year.localeCompare(b.year))
  }, [])

  // Lender exposure table
  const lenderExposure = useMemo(() => {
    const map = new Map<string, { lenderId: string; name: string; commitment: number; funded: number }>()
    positions.forEach(p => {
      const l = getLenderById(p.lenderId)
      if (!l) return
      const existing = map.get(p.lenderId)
      if (existing) { existing.commitment += p.commitment; existing.funded += p.funded }
      else map.set(p.lenderId, { lenderId: p.lenderId, name: l.shortName, commitment: p.commitment, funded: p.funded })
    })
    return Array.from(map.values()).sort((a, b) => b.commitment - a.commitment)
  }, [])

  const topLenders = lenderExposure.slice(0, 10).map(l => ({ name: l.name, value: l.commitment }))

  return (
    <div className="space-y-6">
      <SectionHeader title="Reports & Analytics" description="Operational metrics and portfolio insights" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
        </TabsList>

        {/* Operational */}
        <TabsContent value="operational">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Avg SLA</div><div className="text-2xl font-bold mt-1">93.5%</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Extraction Accuracy</div><div className="text-2xl font-bold mt-1">93%</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Avg Processing Time</div><div className="text-2xl font-bold mt-1">2.7 hrs</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Tasks Completed (MTD)</div><div className="text-2xl font-bold mt-1">127</div></CardContent></Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">SLA Compliance Trend</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={slaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="sla" stroke="#1e40af" strokeWidth={2} dot={{ r: 4 }} name="SLA %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">Extraction Accuracy Trend</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={extractionAccuracyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="accuracy" stroke="#16a34a" fill="#16a34a" fillOpacity={0.1} strokeWidth={2} name="Accuracy %" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Portfolio */}
        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Facility Type Breakdown</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={facilityTypeData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}>
                      {facilityTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">Borrower Exposure</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={borrowerExposure} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(v) => formatCompactNumber(v)} />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader><CardTitle className="text-sm">Maturity Profile</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={maturityProfile}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(v) => formatCompactNumber(v)} />
                    <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
                    <Legend />
                    <Bar dataKey="term_loan" name="Term Loan" fill="#1e40af" stackId="stack" />
                    <Bar dataKey="revolver" name="Revolver" fill="#3b82f6" stackId="stack" />
                    <Bar dataKey="other" name="Other" fill="#93c5fd" stackId="stack" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Participants */}
        <TabsContent value="participants">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader><CardTitle className="text-sm">Lender Exposure Table</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lender</TableHead>
                        <TableHead className="text-right">Commitment</TableHead>
                        <TableHead className="text-right">Funded</TableHead>
                        <TableHead className="text-right">% of Portfolio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lenderExposure.map(l => {
                        const totalCommitment = lenderExposure.reduce((s, x) => s + x.commitment, 0)
                        return (
                          <TableRow key={l.lenderId}>
                            <TableCell><LenderLink lenderId={l.lenderId}>{l.name}</LenderLink></TableCell>
                            <TableCell className="text-right"><CurrencyDisplay amount={l.commitment} /></TableCell>
                            <TableCell className="text-right"><CurrencyDisplay amount={l.funded} /></TableCell>
                            <TableCell className="text-right">{((l.commitment / totalCommitment) * 100).toFixed(1)}%</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader><CardTitle className="text-sm">Top 10 Lenders by Commitment</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={topLenders} layout="vertical">
                    <XAxis type="number" tickFormatter={(v) => formatCompactNumber(v)} />
                    <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
                    <Bar dataKey="value" fill="#1e40af" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Management */}
        <TabsContent value="management">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total AUM</div><div className="text-2xl font-bold mt-1"><CurrencyDisplay amount={deals.reduce((s, d) => s + d.totalCommitment, 0)} compact /></div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Avg Utilization</div><div className="text-2xl font-bold mt-1">{(deals.reduce((s, d) => s + (d.totalCommitment > 0 ? d.outstandingBalance / d.totalCommitment : 0), 0) / deals.length * 100).toFixed(0)}%</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Tasks/Day (Avg)</div><div className="text-2xl font-bold mt-1">46</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Completion Rate</div><div className="text-2xl font-bold mt-1 text-green-600">94%</div></CardContent></Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Processing Time Trend</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={processingTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="time" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} name="Hours" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">Weekly Workload</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={workloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Tasks" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
