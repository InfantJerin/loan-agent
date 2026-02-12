import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Briefcase, Settings, FileText, Building2, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlobalSearch } from './GlobalSearch'
import { NotificationBell } from './NotificationBell'
import { UserMenu } from './UserMenu'
import { QuickActions } from './QuickActions'

const navItems = [
  { label: 'My Work', path: '/', icon: LayoutDashboard },
  { label: 'Deals', path: '/deals', icon: Briefcase },
  { label: 'Servicing', path: '/servicing', icon: Settings },
  { label: 'Documents', path: '/documents', icon: FileText },
  { label: 'Agency', path: '/agency', icon: Building2 },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
]

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="flex h-14 items-center px-4 gap-4">
        <div className="flex items-center gap-2 mr-4">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">LO</span>
          </div>
          <span className="font-semibold text-sm hidden lg:inline">Loan Ops</span>
        </div>
        <nav className="flex items-center gap-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden md:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <GlobalSearch />
          <QuickActions />
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
