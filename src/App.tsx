import { RouterProvider } from 'react-router-dom'
import { AppProvider } from '@/context/AppContext'
import { AIAssistantProvider } from '@/context/AIAssistantContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import { router } from '@/routes'

function InnerApp() {
  return (
    <AIAssistantProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </AIAssistantProvider>
  )
}

export default function App() {
  return (
    <AppProvider>
      <InnerApp />
    </AppProvider>
  )
}
