import { createContext, useContext, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface NavigationContextType {
  currentScreen: string
  breadcrumbs: { label: string; path: string }[]
  setBreadcrumbs: (crumbs: { label: string; path: string }[]) => void
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; path: string }[]>([])

  const getScreenName = (pathname: string): string => {
    if (pathname === '/') return 'My Work'
    if (pathname.startsWith('/deals/')) return 'Deal View'
    if (pathname.startsWith('/deals')) return 'Deals'
    if (pathname.startsWith('/servicing')) return 'Servicing'
    if (pathname.startsWith('/documents')) return 'Documents'
    if (pathname.startsWith('/agency')) return 'Agency'
    if (pathname.startsWith('/reports')) return 'Reports'
    return 'Loan Operations'
  }

  return (
    <NavigationContext.Provider
      value={{
        currentScreen: getScreenName(location.pathname),
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) throw new Error('useNavigation must be used within NavigationProvider')
  return context
}
