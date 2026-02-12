import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { KeyboardHints } from './KeyboardHints'
import { AISidebar } from '@/components/ai-assistant/AISidebar'
import { NavigationProvider } from '@/context/NavigationContext'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useAIAssistant } from '@/context/AIAssistantContext'

export function AppLayout() {
  useKeyboardShortcuts()
  const { isOpen: aiOpen } = useAIAssistant()

  return (
    <NavigationProvider>
      <div className="min-h-screen bg-gray-50/50">
        <TopNav />
        <div className="flex">
          <main className={`flex-1 transition-all duration-200 ${aiOpen ? 'mr-96' : ''}`}>
            <div className="p-6 pb-12">
              <Outlet />
            </div>
          </main>
          <AISidebar />
        </div>
        <KeyboardHints />
      </div>
    </NavigationProvider>
  )
}
