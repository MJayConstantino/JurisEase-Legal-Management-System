'use client'

import type React from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { SearchByFilters as SearchByFiltersType } from './types'

interface SearchByFiltersProps {
  filters: SearchByFiltersType
  setFilters: React.Dispatch<React.SetStateAction<SearchByFiltersType>>
}

/**
 * SearchByFilters Component
 *
 * A collapsible component that allows users to select which attributes to search by.
 *
 * Key features:
 * - Collapsible section with toggle functionality
 * - Checkbox options for different search attributes
 * - Maintains state of selected filters
 * - Updates parent component when filters change
 *
 * Available filters:
 * - Client Name: Search by client name
 * - Attorney: Search by assigned attorney
 * - Case Name: Search by case/matter name
 * - Opposing Council: Search by opposing council name
 * - Court: Search by court name
 *
 * Usage:
 * <SearchByFilters
 *   filters={searchByFilters}
 *   setFilters={setSearchByFilters}
 * />
 */
export function SearchByFilters({ filters, setFilters }: SearchByFiltersProps) {
  // State to track if section is open or closed
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      {/* Collapsible header/trigger */}
      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:bg-muted p-2 rounded-md cursor-pointer">
        <span>Search by</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </CollapsibleTrigger>

      {/* Collapsible content */}
      <CollapsibleContent className="pt-2 pb-1">
        <div className="space-y-2 pl-2">
          {/* Client Name filter */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="clientName"
              checked={filters.clientName}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, clientName: !!checked }))
              }
            />
            <label htmlFor="clientName" className="text-sm text-foreground">
              Client Name
            </label>
          </div>

          {/* Attorney filter */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="attorney"
              checked={filters.attorney}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, attorney: !!checked }))
              }
            />
            <label htmlFor="attorney" className="text-sm text-foreground">
              Attorney
            </label>
          </div>

          {/* Case Name filter */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="caseName"
              checked={filters.caseName}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, caseName: !!checked }))
              }
            />
            <label htmlFor="caseName" className="text-sm text-foreground">
              Case Name
            </label>
          </div>

          {/* Opposing Council filter */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="opposingCouncil"
              checked={filters.opposingCouncil}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, opposingCouncil: !!checked }))
              }
            />
            <label
              htmlFor="opposingCouncil"
              className="text-sm text-foreground"
            >
              Opposing Council
            </label>
          </div>

          {/* Court filter */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="court"
              checked={filters.court}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, court: !!checked }))
              }
            />
            <label htmlFor="court" className="text-sm text-foreground">
              Court
            </label>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
