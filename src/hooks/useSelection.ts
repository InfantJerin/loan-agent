import { useState, useCallback } from 'react'

export function useSelection<T extends string = string>() {
  const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set())

  const toggle = useCallback((id: T) => {
    setSelectedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const selectAll = useCallback((ids: T[]) => {
    setSelectedItems(new Set(ids))
  }, [])

  const clear = useCallback(() => {
    setSelectedItems(new Set())
  }, [])

  const isSelected = useCallback((id: T) => selectedItems.has(id), [selectedItems])

  return {
    selectedItems,
    selectedCount: selectedItems.size,
    toggle,
    selectAll,
    clear,
    isSelected,
    selectedArray: Array.from(selectedItems),
  }
}
