import { cn } from '@/lib/utils'

export function SectionHeader({ title, description, action, className }: {
  title: string; description?: string; action?: React.ReactNode; className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
