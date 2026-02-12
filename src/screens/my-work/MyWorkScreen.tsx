import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Clock, CheckCircle, Calendar, Briefcase, FileText, ArrowRight, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { TaskCard } from '@/components/shared/TaskCard'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { PriorityIndicator } from '@/components/shared/PriorityIndicator'
import { DealLink } from '@/components/shared/DealLink'
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { TimelineEvent } from '@/components/shared/TimelineEvent'
import { BatchActionBar } from '@/components/shared/BatchActionBar'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { useSelection } from '@/hooks/useSelection'
import { tasks, events, deals, rateSets, payments, trades, getDealById, getBorrowerById } from '@/data'
import { formatDate, formatRelativeDate, formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'
import { EVENT_TYPE_COLORS } from '@/lib/constants'

export function MyWorkScreen() {
  const navigate = useNavigate()
  const { selectedItems, toggle, clear, isSelected, selectedCount, selectAll, selectedArray } = useSelection()
  const [approvalTab, setApprovalTab] = useState('rate_set')

  // Attention Required - critical/high tasks
  const attentionItems = useMemo(() =>
    tasks.filter(t => t.status === 'pending' && (t.priority === 'critical' || t.priority === 'high')),
    []
  )

  // Pending Approvals - grouped
  const pendingApprovals = useMemo(() => ({
    rate_set: tasks.filter(t => t.category === 'rate_set' && t.type === 'approval' && t.status === 'pending'),
    payment: tasks.filter(t => t.category === 'payment' && t.status === 'pending'),
    document: tasks.filter(t => t.category === 'document' && t.status === 'pending'),
    trade: tasks.filter(t => t.category === 'trade' && t.status === 'pending'),
  }), [])

  // Upcoming events (next 5 days)
  const upcomingEvents = useMemo(() =>
    events.filter(e => e.status === 'upcoming' || e.status === 'overdue')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 12),
    []
  )

  // Queue stats
  const activeDeals = deals.filter(d => d.status === 'active').length
  const openTasks = tasks.filter(t => t.status === 'pending').length
  const pendingApprovalCount = tasks.filter(t => t.type === 'approval' && t.status === 'pending').length
  const slaPercent = 92

  const currentApprovalList = pendingApprovals[approvalTab as keyof typeof pendingApprovals] || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Work</h1>
          <p className="text-sm text-muted-foreground">Good morning, Sarah. Here's your operational summary.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatDate(new Date().toISOString())}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main content - 3 cols */}
        <div className="xl:col-span-3 space-y-6">

          {/* Attention Required */}
          <section>
            <SectionHeader
              title="Attention Required"
              description={`${attentionItems.length} items need your immediate attention`}
              action={<Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" /> {attentionItems.length}</Badge>}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {attentionItems.map(task => (
                <TaskCard key={task.id} task={task} onAction={(id, action) => console.log(id, action)} />
              ))}
            </div>
          </section>

          <Separator />

          {/* Pending Approvals */}
          <section>
            <SectionHeader
              title="Pending Approvals"
              description={`${pendingApprovalCount} approvals waiting for your review`}
            />
            <Tabs value={approvalTab} onValueChange={setApprovalTab}>
              <TabsList>
                <TabsTrigger value="rate_set" className="gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" /> Rate Sets
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">{pendingApprovals.rate_set.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="trade" className="gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Trades
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">{pendingApprovals.trade.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="document" className="gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Documents
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">{pendingApprovals.document.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="payment" className="gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" /> Payments
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">{pendingApprovals.payment.length}</Badge>
                </TabsTrigger>
              </TabsList>

              <div className="mt-3 space-y-2">
                {currentApprovalList.map(task => {
                  const deal = task.dealId ? getDealById(task.dealId) : null
                  return (
                    <Card key={task.id} className={cn('p-3', isSelected(task.id) && 'ring-2 ring-primary')}>
                      <div className="flex items-center gap-3">
                        <Checkbox checked={isSelected(task.id)} onCheckedChange={() => toggle(task.id)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <PriorityIndicator priority={task.priority} />
                            <span className="text-sm font-medium truncate">{task.title}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            {deal && <DealLink dealId={deal.id}>{deal.name}</DealLink>}
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Due {formatRelativeDate(task.dueDate)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="outline" className="h-7 text-xs">Reject</Button>
                          <Button size="sm" className="h-7 text-xs">Approve</Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
                {currentApprovalList.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    No pending approvals in this category
                  </div>
                )}
              </div>
            </Tabs>

            <BatchActionBar count={selectedCount} onApprove={() => clear()} onReject={() => clear()} onClear={clear} />
          </section>

          <Separator />

          {/* Upcoming Events Timeline */}
          <section>
            <SectionHeader
              title="Upcoming Events"
              description="Next 5 business days"
              action={<Button variant="outline" size="sm" className="text-xs">View Calendar</Button>}
            />
            <Card>
              <CardContent className="p-4 divide-y">
                {upcomingEvents.map(event => (
                  <TimelineEvent key={event.id} event={event} />
                ))}
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Right Sidebar - My Queue */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">My Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Deals</span>
                <span className="text-lg font-bold">{activeDeals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Open Tasks</span>
                <span className="text-lg font-bold">{openTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending Approvals</span>
                <span className="text-lg font-bold">{pendingApprovalCount}</span>
              </div>
              <Separator />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">SLA Compliance</span>
                  <span className={cn('text-sm font-bold', slaPercent >= 95 ? 'text-green-600' : slaPercent >= 85 ? 'text-yellow-600' : 'text-red-600')}>{slaPercent}%</span>
                </div>
                <Progress value={slaPercent} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Tasks by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: 'Rate Sets', count: pendingApprovals.rate_set.length, color: 'bg-blue-500' },
                { label: 'Trades', count: pendingApprovals.trade.length, color: 'bg-purple-500' },
                { label: 'Documents', count: pendingApprovals.document.length, color: 'bg-orange-500' },
                { label: 'Payments', count: pendingApprovals.payment.length, color: 'bg-green-500' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-2 w-2 rounded-full', item.color)} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {deals.filter(d => d.status === 'active').slice(0, 5).map(deal => {
                const borrower = getBorrowerById(deal.borrowerId)
                return (
                  <button key={deal.id} onClick={() => navigate(`/deals/${deal.id}/overview`)}
                    className="flex items-center justify-between w-full text-left rounded-md px-2 py-1.5 hover:bg-muted text-sm">
                    <span className="truncate">{borrower?.name || deal.name}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
