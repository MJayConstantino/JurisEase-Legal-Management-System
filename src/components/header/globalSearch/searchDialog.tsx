'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, XIcon } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// Import subcomponents
import { SearchByFilters } from './searchByFilters'
import { SearchInFilters } from './searchInFilters'
import { SearchResults } from './searchResults'
import type {
  SearchByFilters as SearchByFiltersType,
  ContentTypeFilters,
  SearchResult,
} from './types'
import { search } from '@/actions/globalSearch'
import { debounce } from 'lodash'

import { DialogTitle } from '@radix-ui/react-dialog'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  // debounce should be longer if DB is in too much ram usage to prevent search errors
  const debounceTime = 500

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [allResults, setAllResults] = useState<SearchResult[]>([])
  const [displayedResults, setDisplayedResults] = useState<SearchResult[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 5 // Number of results to show per page

  // Filter states
  const [searchByFilters, setSearchByFilters] = useState<SearchByFiltersType>({
    clientName: true,
    attorney: true,
    caseName: true,
    opposingCouncil: false,
    court: false,
  })

  const [contentTypeFilters, setContentTypeFilters] =
    useState<ContentTypeFilters>({
      matters: true,
      tasks: true,
      bills: true,
    })

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()

        setAllResults([])
        setDisplayedResults([])
        setCurrentPage(1)
      }, 100)
    } else {
      // Reset state when dialog closes
      setSearchQuery('')
      setAllResults([])
      setDisplayedResults([])
      setIsSearching(false)
      setCurrentPage(1)
    }
  }, [open])

  // debounced search ensures that it's only fired after certain time - 500ms
  const debouncedSearch = debounce((query: string) => {
    performSearch(query)
  }, debounceTime)

  // Perform search when query or filters change

  useEffect(() => {
    // Only search if there's a query
    if (searchQuery.trim()) {
      debouncedSearch(searchQuery)
    } else {
      // Clear results if search is empty
      setAllResults([])
      setDisplayedResults([])
      setCurrentPage(1)
    }
    return () => debouncedSearch.cancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, searchByFilters, contentTypeFilters])

  // Update displayed results when page changes or all results update
  useEffect(() => {
    const startIndex = 0
    const endIndex = currentPage * resultsPerPage
    setDisplayedResults(allResults.slice(startIndex, endIndex))
  }, [allResults, currentPage])

  // Perform search using server action
  const performSearch = async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)

    try {
      // Convert filter objects to arrays of selected options
      const contentTypes = Object.entries(contentTypeFilters)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value)
        .map(([key]) => key)

      const attributes = Object.entries(searchByFilters)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value)
        .map(([key]) => key)

      // Call the server action with query and filters
      const result = await search(query, contentTypes, attributes)

      if ('results' in result) {
        setAllResults(result.results)
      } else {
        console.error('Search error:', result.error)
        setAllResults([])
      }

      setCurrentPage(1) // Reset to first page on new search
    } catch (error) {
      console.error('Search error:', error)
      setAllResults([])
      setDisplayedResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Handle result click for navigation
  const handleResultClick = (result: SearchResult) => {
    console.log('Navigating to:', result)

    // Navigate to the appropriate route based on result type
    if (result.type === 'Matter') {
      router.push(`/matters/${result.id}`)
    } else if (result.type === 'Task') {
      if (result.matterid) {
        router.push(`/matters/${result.matterid}`)
      } else {
        router.push(`/tasks`)
      }
    } else if (result.type === 'Bill') {
      router.push(`/matters/${result.matterid}`)
    }

    onOpenChange(false) // Close dialog after navigation
  }

  // Clear search and reset results
  const handleClearSearch = () => {
    setSearchQuery('')
    setAllResults([])
    setDisplayedResults([])
    setCurrentPage(1)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Load more results
  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1)
  }

  // Check if there are more results to load
  const hasMoreResults = displayedResults.length < allResults.length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">Search Dialog</DialogTitle>
      <DialogContent
        role="dialog"
        className="w-[calc(100%-2rem)] sm:max-w-xl max-h-[90vh] p-4 sm:p-6 overflow-hidden bg-accent "
      >
        {/* Make the entire content area scrollable */}
        <div className="max-h-[calc(90vh-2rem)] overflow-y-auto pr-2 scrollbar-hide">
          {/* Search input area - sticky at the top */}
          <div className="flex items-center border-b border-border pb-4 sticky top-0  z-10">
            <Search className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0 hidden sm:block" />
            <Input
              aria-label="DialogBoxSearch"
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for matters, bills, tasks..."
              className="border-0 p-0 focus-visible:ring-0 text-lg flex-1 text-foreground placeholder:text-muted-foreground placeholder:text-xs sm:placeholder:text-sm "
            />
            <Button
              variant="secondary"
              size="sm"
              aria-label="Clear"
              onClick={handleClearSearch}
              className="ml-2 whitespace-nowrap cursor-pointer hover:text-muted-foreground"
            >
              <span className="hidden sm:block">Clear</span>
              <span>
                <XIcon className="hover:text-muted-foreground" />
              </span>
            </Button>
          </div>

          {/* Filter sections */}
          <div className="py-4 space-y-4">
            {/* Search by filters component */}
            <SearchByFilters
              filters={searchByFilters}
              setFilters={setSearchByFilters}
            />

            {/* Search in filters component */}
            <SearchInFilters
              filters={contentTypeFilters}
              setFilters={setContentTypeFilters}
            />
          </div>

          <Separator className="my-2" />

          {/* Results section */}
          <SearchResults
            query={searchQuery}
            results={displayedResults}
            isSearching={isSearching}
            totalResults={allResults.length}
            hasMore={hasMoreResults}
            onResultClick={handleResultClick}
            onLoadMore={handleLoadMore}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
