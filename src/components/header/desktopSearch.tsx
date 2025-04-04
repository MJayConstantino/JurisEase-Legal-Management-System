import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

function DesktopSearch() {
  return (
    <div className="relative w-64 md:w-80 hidden md:block">
      <Input
        placeholder="Search"
        className="h-10 bg-white dark:bg-gray-800 text-[#1B1E4B] dark:text-white pl-10 rounded-md"
      />
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B1E4B] dark:text-gray-400" />
    </div>
  )
}

export default DesktopSearch
