import { useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { useAIAssistant } from '@/context/AIAssistantContext'

export function useKeyboardShortcuts() {
  const { dispatch } = useApp()
  const { toggleOpen } = useAIAssistant()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Cmd+K or Ctrl+K — open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        dispatch({ type: 'TOGGLE_SEARCH' })
      }
      // Cmd+/ or Ctrl+/ — toggle AI sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        toggleOpen()
      }
      // Escape — close search
      if (e.key === 'Escape') {
        dispatch({ type: 'SET_SEARCH', open: false })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch, toggleOpen])
}
