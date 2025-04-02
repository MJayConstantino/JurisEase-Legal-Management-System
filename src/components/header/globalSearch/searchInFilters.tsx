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

interface SearchInFiltersProps {
  filters: {
    matters: boolean
    tasks: boolean
    bills: boolean
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      matters: boolean
      tasks: boolean
      bills: boolean
    }>
  >
}

/**
 * Collapsible component for "Search in" filters
 *
 * This component allows users to select which content types to search in:
 * - Matters
 * - Tasks
 * - Bills
 */
export function SearchInFilters({ filters, setFilters }: SearchInFiltersProps) {
  // State to track if section is open or closed
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:bg-muted p-2 rounded-md">
        <span>Search in</span>
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
              id="matters"
              checked={filters.matters}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, matters: !!checked }))
              }
            />
            <label htmlFor="matters" className="text-sm text-foreground">
              Matters
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="tasks"
              checked={filters.tasks}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, tasks: !!checked }))
              }
            />
            <label htmlFor="tasks" className="text-sm text-foreground">
              Tasks
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="bills"
              checked={filters.bills}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, bills: !!checked }))
              }
            />
            <label htmlFor="bills" className="text-sm text-foreground">
              Bills
            </label>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
