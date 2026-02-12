import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: string
  header: string
  render: (item: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (key: string) => void
  selectable?: boolean
  selectedIds?: Set<string>
  onToggleSelect?: (id: string) => void
  onToggleAll?: () => void
  rowClassName?: (item: T) => string
  onRowClick?: (item: T) => void
}

export function DataTable<T>({
  data, columns, keyField, sortKey, sortDirection, onSort, selectable, selectedIds, onToggleSelect, onToggleAll, rowClassName, onRowClick,
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && selectedIds && data.every(item => selectedIds.has(String(item[keyField])))

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {selectable && (
            <TableHead className="w-10">
              <Checkbox checked={allSelected} onCheckedChange={() => onToggleAll?.()} />
            </TableHead>
          )}
          {columns.map(col => (
            <TableHead key={col.key} className={cn(col.className, col.sortable && 'cursor-pointer select-none')}
              onClick={() => col.sortable && onSort?.(col.key)}>
              <div className="flex items-center gap-1">
                {col.header}
                {col.sortable && sortKey === col.key ? (
                  sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                ) : col.sortable ? <ArrowUpDown className="h-3 w-3 opacity-30" /> : null}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => {
          const id = String(item[keyField])
          return (
            <TableRow key={id} className={cn(rowClassName?.(item), onRowClick && 'cursor-pointer')}
              onClick={() => onRowClick?.(item)} data-state={selectedIds?.has(id) ? 'selected' : undefined}>
              {selectable && (
                <TableCell onClick={e => e.stopPropagation()}>
                  <Checkbox checked={selectedIds?.has(id)} onCheckedChange={() => onToggleSelect?.(id)} />
                </TableCell>
              )}
              {columns.map(col => (
                <TableCell key={col.key} className={col.className}>{col.render(item)}</TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
