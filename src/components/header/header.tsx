import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { MobileNavMenu } from '@/components/sidebar/mobileNavMenu'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Signout } from './signout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-16 bg-[#2D336B] text-white flex items-center justify-between px-4 md:px-8 z-20">
      <div className="flex items-center gap-4">
        <MobileNavMenu />
        <SidebarTrigger className="text-white hover:bg-[#1B1E4B] dark:hover:bg-gray-800 h-10 w-10 hidden md:flex">
          <span className="sr-only">Toggle sidebar</span>
        </SidebarTrigger>
        <div className="text-xl md:text-2xl font-bold truncate">
          Dianson Law Office
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Desktop Search */}
        <div className="relative w-64 md:w-80 hidden md:block">
          <Input
            placeholder="Search"
            className="h-10 bg-white dark:bg-gray-800 text-[#1B1E4B] dark:text-white pl-10 rounded-md"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B1E4B] dark:text-gray-400" />
        </div>

        {/* Mobile Search */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#1B1E4B] md:hidden"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Create New Button - Desktop Only */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#1B1E4B] dark:bg-gray-700 text-white hover:bg-[#2D336B]/90 dark:hover:bg-gray-600 gap-2 hidden md:flex">
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Create New</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Matter</DropdownMenuItem>
            <DropdownMenuItem>New Task</DropdownMenuItem>
            <DropdownMenuItem>New Document</DropdownMenuItem>
            <DropdownMenuItem>New Event</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback className="text-black dark:text-white">
                  U
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>User Email</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem className="md:hidden">
              <Plus className="mr-2 h-4 w-4" />
              <span>Create New</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Signout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
