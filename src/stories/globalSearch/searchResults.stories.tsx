import { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { SearchResults } from '@/components/header/globalSearch/searchResults'
import { action } from '@storybook/addon-actions'
import React, { useState } from 'react'
import type { SearchResult } from '@/components/header/globalSearch/types'

// 🏗 **Meta Configuration**
export default {
  title: 'globalSearch/SearchResults',
  component: SearchResults,
} as Meta<typeof SearchResults>

// ✅ **Mock Results**
const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'Matter',
    title: 'Case A',
    subtitle: 'Client A',
    status: 'open',
    route: '/matters/1',
  },
  {
    id: '2',
    type: 'Task',
    title: 'Task B',
    subtitle: 'Due tomorrow',
    status: 'in-progress',
    route: '/tasks/2',
  },
  {
    id: '3',
    type: 'Bill',
    title: 'Invoice C',
    subtitle: 'Pending payment',
    status: 'pending',
    route: '/bills/3',
  },
]

// ✅ **Mock Parent Component to Simulate State**
const MockParentWrapper = ({
  query,
  results,
  isSearching,
  totalResults,
  hasMore,
}: {
  query: string
  results: SearchResult[]
  isSearching: boolean
  totalResults: number
  hasMore: boolean
}) => {
  const [currentResults, setCurrentResults] = useState(results)

  return (
    <SearchResults
      query={query}
      results={currentResults}
      isSearching={isSearching}
      totalResults={totalResults}
      hasMore={hasMore}
      onResultClick={(result) => action('Result clicked')(result)}
      onLoadMore={() => {
        action('Load more clicked')()
        setCurrentResults((prev) => [...prev, ...mockResults]) // ✅ Ensures proper state update
      }}
    />
  )
}

const Template: StoryObj<typeof SearchResults> = {
  render: (args) => <MockParentWrapper {...args} />,
  args: {
    query: 'Legal case',
    results: mockResults,
    isSearching: false,
    totalResults: mockResults.length,
    hasMore: true,
  },
}

// 🆕 **Default Story (Collapsible Open)**
export const DefaultView: StoryObj<typeof SearchResults> = {
  ...Template,
}

// 📉 **Collapsed View (Ensures collapsible starts open, then closes)**
export const CollapsedView: StoryObj<typeof SearchResults> = {
  ...Template,
  play: async () => {
    const collapsibleTrigger = (await waitFor(() =>
      document.querySelector('[data-slot="collapsible-trigger"]')
    )) as HTMLElement

    await waitFor(() =>
      expect(collapsibleTrigger.getAttribute('data-state')).toBe('open')
    )

    await userEvent.click(collapsibleTrigger)
    action('Clicked collapsible trigger to collapse')()

    await waitFor(() =>
      expect(collapsibleTrigger.getAttribute('data-state')).toBe('closed')
    )
  },
}

// ✅ **Simulate Loading State**
export const LoadingState: StoryObj<typeof SearchResults> = {
  ...Template,
  args: {
    query: 'Processing search...',
    results: [],
    isSearching: true,
    totalResults: 0,
    hasMore: false,
  },
}

// ✅ **Simulate No Results State**
export const NoResults: StoryObj<typeof SearchResults> = {
  ...Template,
  args: {
    query: 'Nonexistent query',
    results: [],
    isSearching: false,
    totalResults: 0,
    hasMore: false,
  },
}

// ✅ **Check Pagination (Load More)**
export const LoadMorePagination: StoryObj<typeof SearchResults> = {
  ...Template,
  play: async () => {
    const loadMoreButton = (await waitFor(() =>
      document.querySelector('[data-slot="button"]')
    )) as HTMLElement // ✅ Uses the correct ShadCN Button selector

    await userEvent.hover(loadMoreButton) // ✅ Ensures interaction is registered
    await userEvent.click(loadMoreButton)
    action('Clicked Load More')()

    // ✅ Wait for results to update
    await waitFor(() =>
      expect(
        document.querySelectorAll('.cursor-pointer').length
      ).toBeGreaterThan(mockResults.length)
    )
  },
}

// ✅ **Test Clicking Search Results**
export const ClickSearchResults: StoryObj<typeof SearchResults> = {
  ...Template,
  play: async () => {
    const firstResult = (await waitFor(() =>
      document.querySelector('.cursor-pointer')
    )) as HTMLElement

    await userEvent.click(firstResult)
    action('Clicked search result')(firstResult.textContent)
  },
}
