import { useParams } from 'react-router-dom'
import { ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { getNoticesByDealId } from '@/data'

export function DealNotices() {
  const { dealId } = useParams<{ dealId: string }>()
  const notices = getNoticesByDealId(dealId!)

  return (
    <div className="space-y-6">
      <SectionHeader title="Notices" action={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Generate Notice</Button>} />

      <Card>
        <CardContent className="p-0 divide-y">
          {notices.map(n => (
            <div key={n.id} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${n.direction === 'inbound' ? 'bg-blue-100' : 'bg-green-100'}`}>
                {n.direction === 'inbound' ? <ArrowDownLeft className="h-4 w-4 text-blue-600" /> : <ArrowUpRight className="h-4 w-4 text-green-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{n.subject}</div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-xs capitalize">{n.type.replace(/_/g, ' ')}</Badge>
                  <span>{n.direction}</span>
                  {n.recipients && <span>To: {n.recipients.join(', ')}</span>}
                </div>
              </div>
              <DateDisplay date={n.date} />
              <StatusBadge status={n.status} />
            </div>
          ))}
          {notices.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No notices for this deal</div>}
        </CardContent>
      </Card>
    </div>
  )
}
