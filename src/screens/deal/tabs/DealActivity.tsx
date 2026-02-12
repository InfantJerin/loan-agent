import { useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { TimelineEvent } from '@/components/shared/TimelineEvent'
import { getEventsByDealId } from '@/data'

export function DealActivity() {
  const { dealId } = useParams<{ dealId: string }>()
  const events = getEventsByDealId(dealId!).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      <SectionHeader title="Activity Log" description="Chronological history of deal events" />
      <Card>
        <CardContent className="p-4 divide-y">
          {events.map(event => (
            <TimelineEvent key={event.id} event={event} />
          ))}
          {events.length === 0 && <div className="py-8 text-center text-sm text-muted-foreground">No activity recorded</div>}
        </CardContent>
      </Card>
    </div>
  )
}
