import { SidebarTrigger } from '@/components/ui/sidebar'
import { MobileBottomNav } from '@/components/sidebar/mobileNavMenu'

import { ModeToggle } from '@/components/ui/mode-toggle'
import CreateNewButton from './createNewButton'
import DesktopSearch from './globalSearch/desktopSearch'

import AvatarDropdownMenu from './avatarDropdownMenu'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-16  bg-[#15183d] dark:bg-[#050c1f] text-white flex items-center justify-between px-4 md:px-8 z-20">
      <div className="flex items-center gap-4">
        <MobileBottomNav />
        <SidebarTrigger className="text-white hover:bg-[#1B1E4B] dark:hover:bg-gray-800 h-10 w-10 hidden md:flex">
          <span className="sr-only">Toggle sidebar</span>
        </SidebarTrigger>
        <div className="text-xl md:text-2xl font-bold truncate">JurisEase</div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <DesktopSearch />

        <CreateNewButton matters={[]} />

        <ModeToggle />

        <AvatarDropdownMenu />
      </div>
    </header>
  )
}
