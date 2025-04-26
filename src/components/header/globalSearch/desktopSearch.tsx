'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchDialog } from './searchDialog'

/**
 * DesktopSearch Component
 *
 * A responsive search component that adapts to different screen sizes using Tailwind breakpoints.
 *
 * Key features:
 * - Shows an input field with search icon on medium and larger screens (md:block)
 * - Shows just a search icon button on smaller screens (block md:hidden)
 * - Clicking either the input or icon opens the search dialog
 * - Uses Tailwind's responsive classes instead of media queries
 *
 * Component structure:
 * 1. Desktop/tablet view: Input field with search icon (hidden on mobile)
 * 2. Mobile view: Search icon button (hidden on desktop/tablet)
 * 3. Search dialog: Appears when clicking either the input or icon
 *
 * Usage:
 * <DesktopSearch />
 */
function DesktopSearch() {
  // State to control the search dialog visibility
  const [dialogOpen, setDialogOpen] = useState(false)

  // Handler to open the search dialog
  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  return (
    <>
      {/* Desktop/tablet view - input field with search icon (hidden on mobile) */}
      <div className="relative w-64 md:w-80 hidden md:block">
        <Input
          placeholder="Search"
          className="h-10 bg-white/90 dark:bg-gray-800/90 text-[#1B1E4B] dark:text-white pl-10 rounded-md cursor-pointer"
          onClick={handleOpenDialog}
          readOnly
          aria-label="SearchInput"
        />
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B1E4B] dark:text-gray-400 cursor-pointer"
          onClick={handleOpenDialog}
        />
      </div>

      {/* Mobile view - just the search icon button (hidden on desktop/tablet) */}
      <Button
        variant="ghost"
        role="button"
        size="sm"
        className="text-white hover:bg-[#1B1E4B]/50 dark:hover:bg-gray-800/50 items-center justify-center h-10 w-10 p-0 block md:hidden"
        onClick={handleOpenDialog}
        aria-label="SearchButton"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Search dialog that appears when clicking the search input or icon */}
      <SearchDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}

export default DesktopSearch
