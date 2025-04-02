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

interface SearchByFiltersProps {
  filters: {
    clientName: boolean
    attorney: boolean
    caseName: boolean
    opposingCouncil: boolean
    court: boolean
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      clientName: boolean
      attorney: boolean
      caseName: boolean
      opposingCouncil: boolean
      court: boolean
    }>
  >
}

/**
 * Collapsible component for "Search by" filters
 *
 * This component allows users to select which attributes to search by:
 * - Client Name
 * - Attorney
 * - Case Name
 * - Opposing Council
 * - Court
 */
export function SearchByFilters({ filters, setFilters }: SearchByFiltersProps) {
  // State to track if section is open or closed
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:bg-muted p-2 rounded-md">
        <span>Search by</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-2 pb-1">
        <div className="space-y-2 pl-2">
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
