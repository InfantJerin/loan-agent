import { useParams } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { getCovenantsByDealId } from '@/data'
import { cn } from '@/lib/utils'

const statusColors = { compliant: 'bg-green-100 text-green-800', warning: 'bg-amber-100 text-amber-800', breach: 'bg-red-100 text-red-800' }

export function DealCovenants() {
  const { dealId } = useParams<{ dealId: string }>()
  const covenants = getCovenantsByDealId(dealId!)

  return (
    <div className="space-y-6">
      {covenants.filter(c => c.type === 'financial').map(cov => (
        <Card key={cov.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">{cov.name}</CardTitle>
              <Badge className={cn('border-0', statusColors[cov.status])}>{cov.status}</Badge>
            </div>
            <div className="text-xs text-muted-foreground">{cov.metric} | Tested {cov.frequency}</div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs text-muted-foreground">Current Value</div>
                <div className={cn('text-lg font-bold', cov.status === 'breach' ? 'text-red-600' : cov.status === 'warning' ? 'text-amber-600' : 'text-green-600')}>
                  {cov.currentValue}x
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Threshold</div>
                <div className="text-lg font-bold">{cov.threshold}x</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Next Test</div>
                <div className="text-sm font-medium"><DateDisplay date={cov.testDate} /></div>
              </div>
            </div>
            {cov.history.length > 0 && (
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={cov.history}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <ReferenceLine y={cov.threshold} stroke="#ef4444" strokeDasharray="3 3" label={{ value: `Threshold: ${cov.threshold}x`, position: 'right', fill: '#ef4444', fontSize: 10 }} />
                  <Line type="monotone" dataKey="value" stroke="#1e40af" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      ))}

      {covenants.filter(c => c.type === 'reporting').length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-sm">Reporting Covenants</CardTitle></CardHeader>
          <CardContent>
            {covenants.filter(c => c.type === 'reporting').map(cov => (
              <div key={cov.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm">{cov.name}</span>
                <Badge className={cn('border-0', statusColors[cov.status])}>{cov.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
