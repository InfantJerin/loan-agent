import { Inbox } from 'lucide-react'

export function EmptyState({ title = 'No data', description = 'Nothing to display', icon: Icon = Inbox }: {
  title?: string; description?: string; icon?: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-10 w-10 text-muted-foreground/40 mb-3" />
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground/70 mt-1">{description}</p>
    </div>
  )
}
