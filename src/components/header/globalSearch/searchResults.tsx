'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SearchResultsProps {
  query: string
  results: any[]
  isSearching: boolean
  totalResults: number
  hasMore: boolean
  onResultClick: (result: any) => void
  onLoadMore: () => void
}

/**
 * Collapsible component for search results with pagination
 *
 * This component:
 * 1. Displays search results with proper status badges
 * 2. Shows loading state during searches
 * 3. Provides pagination with "Load more" button
 * 4. Shows appropriate empty states
 */
export function SearchResults({
  query,
  results,
  isSearching,
  totalResults,
  hasMore,
  onResultClick,
  onLoadMore,
}: SearchResultsProps) {
  // State to track if section is open or closed
  const [isOpen, setIsOpen] = useState(true)

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
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:bg-muted p-2 rounded-md">
        <div className="flex items-center justify-between w-full">
          <span>Results</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {totalResults} {totalResults === 1 ? 'item' : 'items'} found
            </span>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-2 pb-1">
        {/* Loading state */}
        {isSearching ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Empty state when no query */}
            {!query.trim() ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                <Search className="h-12 w-12 mb-2 opacity-20" />
                <p>Enter a search term to begin</p>
              </div>
            ) : results.length > 0 ? (
              // Results list
              <div className="space-y-4">
                <div className="space-y-2">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                      onClick={() => onResultClick(result)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground">
                            {result.title}
                          </span>
                          {result.status && result.type !== 'Bill' && (
                            <span
                              className={cn(
                                'text-xs px-2 py-0.5 rounded-full',
                                getStatusBadgeClasses(
                                  result.type,
                                  result.status
                                )
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

                {/* Pagination */}
                <div className="flex justify-center pt-2">
                  {hasMore ? (
                    <Button variant="outline" size="sm" onClick={onLoadMore}>
                      Load more
                    </Button>
                  ) : (
                    totalResults > 0 && (
                      <p className="text-xs text-muted-foreground">
                        No more items left
                      </p>
                    )
                  )}
                </div>
              </div>
            ) : (
              // No results found
              <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                <Search className="h-12 w-12 mb-2 opacity-20" />
                <p>No results found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
