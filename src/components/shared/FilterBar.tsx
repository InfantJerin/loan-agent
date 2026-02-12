import { X, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface FilterConfig {
  key: string
  label: string
  options: { value: string; label: string }[]
}

export function FilterBar({ configs, filters, onFilterChange, searchQuery, onSearchChange, activeCount, onClear }: {
  configs: FilterConfig[]
  filters: Record<string, string>
  onFilterChange: (key: string, value: string) => void
  searchQuery?: string
  onSearchChange?: (q: string) => void
  activeCount: number
  onClear: () => void
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Filter className="h-4 w-4 text-muted-foreground" />
      {onSearchChange && (
        <Input placeholder="Search..." value={searchQuery || ''} onChange={e => onSearchChange(e.target.value)} className="w-48 h-8 text-xs" />
      )}
      {configs.map(c => (
        <Select key={c.key} value={filters[c.key] || 'all'} onValueChange={v => onFilterChange(c.key, v)}>
          <SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder={c.label} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All {c.label}</SelectItem>
            {c.options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      ))}
      {activeCount > 0 && (
        <Button variant="ghost" size="sm" className="h-8 text-xs gap-1" onClick={onClear}>
          <X className="h-3 w-3" /> Clear ({activeCount})
        </Button>
      )}
    </div>
  )
}
