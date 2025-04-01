'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Search filters
  const [searchByFilters, setSearchByFilters] = useState({
    clientName: true,
    attorney: true,
    caseName: false,
    opposingCouncil: false,
    court: false,
  })

  const [contentTypeFilters, setContentTypeFilters] = useState({
    matters: true,
    tasks: true,
    bills: true,
  })

  // Focus the input when dialog opens and perform initial search
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
        // Perform initial search to show all results
        performSearch('')
      }, 100)
    } else {
      // Reset state when dialog closes
      setSearchQuery('')
      setResults([])
      setIsSearching(false)
    }
  }, [open])

  // Perform search when query or filters change
  useEffect(() => {
    performSearch(searchQuery)
  }, [searchQuery, searchByFilters, contentTypeFilters])

  const performSearch = async (query: string) => {
    setIsSearching(true)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          contentTypes: Object.entries(contentTypeFilters)
            .filter(([_, value]) => value)
            .map(([key]) => key),
          attributes: Object.entries(searchByFilters)
            .filter(([_, value]) => value)
            .map(([key]) => key),
        }),
      })

      const data = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleResultClick = (result: any) => {
    console.log('Navigating to:', result)

    // Navigate to the appropriate route based on result type
    if (result.type === 'Matter') {
      router.push(`/matters/${result.id}`)
    } else if (result.type === 'Task') {
      router.push(`/tasks/${result.id}`)
    } else if (result.type === 'Bill') {
      router.push(`/bills/${result.id}`)
    }

    onOpenChange(false)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    performSearch('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Get status badge color based on type and status
  const getStatusBadgeClasses = (type: string, status?: string) => {
    if (!status) return ''

    if (type === 'Matter') {
      return status === 'Assigned'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }

    if (type === 'Task') {
      return status === 'Pending'
        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    }

    return ''
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl w-[calc(100%-2rem)] max-h-[90vh] overflow-hidden flex flex-col p-4 sm:p-6">
        <div className="flex items-center border-b border-border pb-4">
          <Search className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for matters, documents, tasks..."
            className="border-0 p-0 focus-visible:ring-0 text-lg flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearSearch}
            className="ml-2 whitespace-nowrap"
          >
            Clear
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Search by</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="clientName"
                  checked={searchByFilters.clientName}
                  onCheckedChange={(checked) =>
                    setSearchByFilters((prev) => ({
                      ...prev,
                      clientName: !!checked,
                    }))
                  }
                />
                <label htmlFor="clientName" className="text-sm">
                  Client Name
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="attorney"
                  checked={searchByFilters.attorney}
                  onCheckedChange={(checked) =>
                    setSearchByFilters((prev) => ({
                      ...prev,
                      attorney: !!checked,
                    }))
                  }
                />
                <label htmlFor="attorney" className="text-sm">
                  Attorney
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="caseName"
                  checked={searchByFilters.caseName}
                  onCheckedChange={(checked) =>
                    setSearchByFilters((prev) => ({
                      ...prev,
                      caseName: !!checked,
                    }))
                  }
                />
                <label htmlFor="caseName" className="text-sm">
                  Case Name
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="opposingCouncil"
                  checked={searchByFilters.opposingCouncil}
                  onCheckedChange={(checked) =>
                    setSearchByFilters((prev) => ({
                      ...prev,
                      opposingCouncil: !!checked,
                    }))
                  }
                />
                <label htmlFor="opposingCouncil" className="text-sm">
                  Opposing Council
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="court"
                  checked={searchByFilters.court}
                  onCheckedChange={(checked) =>
                    setSearchByFilters((prev) => ({
                      ...prev,
                      court: !!checked,
                    }))
                  }
                />
                <label htmlFor="court" className="text-sm">
                  Court
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Search in</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="matters"
                  checked={contentTypeFilters.matters}
                  onCheckedChange={(checked) =>
                    setContentTypeFilters((prev) => ({
                      ...prev,
                      matters: !!checked,
                    }))
                  }
                />
                <label htmlFor="matters" className="text-sm">
                  Matters
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tasks"
                  checked={contentTypeFilters.tasks}
                  onCheckedChange={(checked) =>
                    setContentTypeFilters((prev) => ({
                      ...prev,
                      tasks: !!checked,
                    }))
                  }
                />
                <label htmlFor="tasks" className="text-sm">
                  Tasks
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bills"
                  checked={contentTypeFilters.bills}
                  onCheckedChange={(checked) =>
                    setContentTypeFilters((prev) => ({
                      ...prev,
                      bills: !!checked,
                    }))
                  }
                />
                <label htmlFor="bills" className="text-sm">
                  Bills
                </label>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Results section with improved scrolling */}
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Results</h3>
            <span className="text-xs text-muted-foreground">
              {results.length} {results.length === 1 ? 'item' : 'items'} found
            </span>
          </div>

          {isSearching ? (
            <div className="flex items-center justify-center h-[200px] sm:h-[300px]">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : results.length > 0 ? (
            <ScrollArea className="h-[200px] sm:h-[300px]">
              <div className="space-y-2 p-1">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{result.title}</span>
                        {result.status && result.type !== 'Bill' && (
                          <span
                            className={cn(
                              'text-xs px-2 py-0.5 rounded-full',
                              getStatusBadgeClasses(result.type, result.status)
                            )}
                          >
                            {result.status}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded mr-2">
                          {result.type}
                        </span>
                        {result.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] sm:h-[300px] text-muted-foreground">
              <Search className="h-12 w-12 mb-2 opacity-20" />
              <p>No results found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
