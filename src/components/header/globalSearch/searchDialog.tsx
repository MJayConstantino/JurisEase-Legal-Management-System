'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
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
import { DialogTitle } from '@radix-ui/react-dialog'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * SearchDialog Component
 *
 * The main search dialog component that integrates all search functionality.
 *
 * Key features:
 * - Manages search state and server action calls
 * - Coordinates between filter components and results
 * - Handles navigation when results are clicked
 * - Provides pagination for search results
 * - Maintains responsive layout across device sizes
 *
 * Component structure:
 * 1. Search input area: Input field with clear button
 * 2. Filter sections:
 *    - SearchByFilters: Allows filtering by different attributes
 *    - SearchInFilters: Allows filtering by content types
 * 3. Results section:
 *    - SearchResults: Displays search results with pagination
 *
 * Data flow:
 * 1. User enters search query and selects filters
 * 2. Component calls server action with query and filters
 * 3. Results are displayed and paginated
 * 4. Clicking a result navigates to the corresponding page
 *
 * Usage:
 * <SearchDialog
 *   open={dialogOpen}
 *   onOpenChange={setDialogOpen}
 * />
 */
export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

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

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
        // Don't perform initial search - start with empty results
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

  // Perform search when query or filters change
  useEffect(() => {
    // Only search if there's a query
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    } else {
      // Clear results if search is empty
      setAllResults([])
      setDisplayedResults([])
      setCurrentPage(1)
    }
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
        .filter(([_, value]) => value)
        .map(([key]) => key)

      const attributes = Object.entries(searchByFilters)
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
      router.push(`/tasks/${result.id}`)
    } else if (result.type === 'Bill') {
      router.push(`/bills/${result.id}`)
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
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-xl max-h-[90vh] p-4 sm:p-6 overflow-hidden">
        {/* Make the entire content area scrollable */}
        <div className="max-h-[calc(90vh-2rem)] overflow-y-auto pr-2">
          {/* Search input area - sticky at the top */}
          <div className="flex items-center border-b border-border pb-4 sticky top-0 bg-background z-10">
            <Search className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
            <Input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for matters, documents, tasks..."
              className="border-0 p-0 focus-visible:ring-0 text-lg flex-1 text-foreground placeholder:text-muted-foreground"
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
