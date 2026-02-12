import { useState, useMemo, useCallback } from 'react'

export interface FilterConfig {
  key: string
  label: string
  options: { value: string; label: string }[]
}

export function useFilters<T>(items: T[], configs: FilterConfig[]) {
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [searchQuery, setSearchQuery] = useState('')

  const setFilter = useCallback((key: string, value: string) => {
    setFilters(prev => {
      if (value === '' || value === 'all') {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: value }
    })
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({})
    setSearchQuery('')
  }, [])

  const activeFilterCount = Object.keys(filters).length + (searchQuery ? 1 : 0)

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      for (const [key, value] of Object.entries(filters)) {
        if ((item as Record<string, unknown>)[key] !== value) return false
      }
      return true
    })
  }, [items, filters])

  return { filters, setFilter, clearFilters, searchQuery, setSearchQuery, filteredItems, activeFilterCount, configs }
}
