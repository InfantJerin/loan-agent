import { Plus, Upload, FileText } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function QuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline text-xs">Quick Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem><Upload className="mr-2 h-4 w-4" /> Upload Document</DropdownMenuItem>
        <DropdownMenuItem><FileText className="mr-2 h-4 w-4" /> New Deal Setup</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
