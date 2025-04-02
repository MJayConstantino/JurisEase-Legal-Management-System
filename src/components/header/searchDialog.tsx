'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { search } from '@/actions/globalSearch' // Import server action
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SearchResult {
  id: string
  type: 'Matter' | 'Task' | 'Bill'
  title: string
  subtitle: string
  status?: string
  route: string
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
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

  // Focus input and perform initial search when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
        performSearch('')
      }, 100)
    } else {
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
      const data = await search(
        query,
        Object.entries(contentTypeFilters)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        Object.entries(searchByFilters)
          .filter(([_, value]) => value)
          .map(([key]) => key)
      )

      // ✅ Handle potential errors properly
      if ('error' in data) {
        console.error('Search error:', data.error)
        setResults([]) // Reset results to empty on error
      } else {
        setResults(data.results)
      }
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    router.push(result.route)
    onOpenChange(false)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    performSearch('')
    inputRef.current?.focus()
  }

  const getStatusBadgeClasses = (type: string, status?: string) => {
    if (!status) return ''
    return type === 'Matter'
      ? status === 'Assigned'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      : type === 'Task'
      ? status === 'Pending'
        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      : ''
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
            className="ml-2"
          >
            Clear
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Search by</h3>
            <div className="space-y-2">
              {Object.keys(searchByFilters).map((filter) => (
                <div key={filter} className="flex items-center space-x-2">
                  <Checkbox
                    id={filter}
                    checked={
                      searchByFilters[filter as keyof typeof searchByFilters]
                    }
                    onCheckedChange={(checked) =>
                      setSearchByFilters((prev) => ({
                        ...prev,
                        [filter]: !!checked,
                      }))
                    }
                  />
                  <label htmlFor={filter} className="text-sm capitalize">
                    {filter}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Search in</h3>
            <div className="space-y-2">
              {Object.keys(contentTypeFilters).map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={
                      contentTypeFilters[
                        type as keyof typeof contentTypeFilters
                      ]
                    }
                    onCheckedChange={(checked) =>
                      setContentTypeFilters((prev) => ({
                        ...prev,
                        [type]: !!checked,
                      }))
                    }
                  />
                  <label htmlFor={type} className="text-sm capitalize">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-2" />

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
                      <div className="text-sm text-muted-foreground">
                        {result.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
