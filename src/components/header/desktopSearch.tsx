'use client'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '../ui/button'
import { SearchDialog } from './searchDialog'

function DesktopSearch() {
  // State to control the search dialog
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
          aria-label="Search"
        />
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B1E4B] dark:text-gray-400 cursor-pointer"
          onClick={handleOpenDialog}
        />
      </div>

      {/* Mobile view - just the search icon button (hidden on desktop/tablet) */}
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-[#1B1E4B] dark:hover:bg-gray-800 block md:hidden"
        onClick={handleOpenDialog}
        aria-label="Search"
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
