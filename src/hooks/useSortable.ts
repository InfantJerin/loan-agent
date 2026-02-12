import { useState, useMemo } from 'react'

export type SortDirection = 'asc' | 'desc'

export function useSortable<T>(items: T[], defaultKey?: keyof T, defaultDir: SortDirection = 'asc') {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(defaultKey)
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultDir)

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const sortedItems = useMemo(() => {
    if (!sortKey) return items
    return [...items].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal == null) return 1
      if (bVal == null) return -1
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      }
      return 0
    })
  }, [items, sortKey, sortDirection])

  return { sortedItems, sortKey, sortDirection, toggleSort }
}
