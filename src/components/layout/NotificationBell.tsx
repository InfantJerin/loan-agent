import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatRelativeDate } from '@/lib/format'

const notifications = [
  { id: '1', title: 'Sterling Retail payment overdue', description: 'Interest payment past due by 1 day', time: '2025-02-12T09:00:00Z', read: false, type: 'alert' as const },
  { id: '2', title: 'Rate set approved - Atlas TLB', description: 'SOFR + 350 bps approved for Mar period', time: '2025-02-11T16:30:00Z', read: false, type: 'success' as const },
  { id: '3', title: 'New document uploaded', description: 'Atlas Industrial - Amendment No. 2', time: '2025-02-12T08:15:00Z', read: false, type: 'info' as const },
  { id: '4', title: 'Trade settlement complete', description: 'Nexus Communications assignment settled', time: '2025-02-10T14:00:00Z', read: true, type: 'success' as const },
  { id: '5', title: 'Consent received - Barclays', description: 'Approved Meridian assignment (MS to Blackstone)', time: '2025-02-07T11:20:00Z', read: true, type: 'info' as const },
]

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(!open)}>
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-80 rounded-xl border bg-white shadow-lg">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="font-semibold text-sm">Notifications</span>
              <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map(n => (
                <div key={n.id} className={`flex gap-3 px-4 py-3 border-b last:border-0 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${n.type === 'alert' ? 'bg-red-500' : n.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{n.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{n.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">{formatRelativeDate(n.time)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
