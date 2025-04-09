import { Meta, StoryObj, StoryContext, Decorator } from '@storybook/react'
import { userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { SearchDialog } from '@/components/header/globalSearch/searchDialog'
import { ThemeProvider } from '@/components/theme-provider'
import { action } from '@storybook/addon-actions'
import React, { useState } from 'react'
import type {
  SearchResult,
  SearchByFilters,
  ContentTypeFilters,
} from '@/components/header/globalSearch/types'

// ✅ **Theme Provider for Light/Dark Mode**
const withTheme: Decorator = (Story, context: StoryContext) => {
  return (
    <ThemeProvider defaultTheme={context.globals.theme ?? 'light'}>
      <Story />
    </ThemeProvider>
  )
}

// ✅ **Mock Results Based on Filters**
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

// ✅ **Mock Parent State Management**
const MockParentWrapper = ({ open }: { open: boolean }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>(mockResults)
  const [isSearching, setIsSearching] = useState(false)
  const [searchByFilters, setSearchByFilters] = useState<SearchByFilters>({
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
  const [hasMore, setHasMore] = useState(true)

  return (
    <SearchDialog
      open={open}
      onOpenChange={action('Dialog toggled')}
      query={searchQuery}
      results={results}
      isSearching={isSearching}
      searchByFilters={searchByFilters}
      setSearchByFilters={setSearchByFilters}
      contentTypeFilters={contentTypeFilters}
      setContentTypeFilters={setContentTypeFilters}
      totalResults={results.length}
      hasMore={hasMore}
      onResultClick={(result) => action('Result clicked')(result)}
      onLoadMore={() => {
        action('Load more clicked')()
        setResults((prev) => [...prev, ...mockResults])
      }}
    />
  )
}

// 🏗 **Meta Configuration**
export default {
  title: 'globalSearch/SearchDialog',
  component: SearchDialog,
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [withTheme],
} as Meta<typeof SearchDialog>

const Template: StoryObj<typeof SearchDialog> = {
  render: (args) => <MockParentWrapper open={args.open} />,
  args: {
    open: true,
  },
}

// 🆕 **Default Story (Dialog Just Opens)**
export const DefaultView: StoryObj<typeof SearchDialog> = {
  ...Template,
}

// 📉 **Collapsed View (Collapses all collapsible components)**
export const CollapsedView: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: { open: true },
  play: async () => {
    const collapsibles = Array.from(
      document.querySelectorAll('[data-slot="collapsible-trigger"]')
    ) as HTMLElement[]

    for (const collapsible of collapsibles) {
      // ✅ Log initial state before clicking
      const initialState = collapsible.getAttribute('data-state')
      action('Initial collapsible state')(initialState)

      // ✅ Click collapsible
      await userEvent.click(collapsible)
      action('Collapsed filter section')(collapsible.textContent)

      // ✅ Wait for state change
      await waitFor(() => {
        const finalState = collapsible.getAttribute('data-state')
        action('Final collapsible state')(finalState)
        expect(finalState).toBe('closed') // ✅ Validate state change
      })
    }
  },
}

// ✅ **Check All Filters Checked**
export const AllFiltersChecked: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: {
    open: true,
    searchByFilters: {
      clientName: true,
      attorney: true,
      caseName: true,
      opposingCouncil: true,
      court: true,
    },
    contentTypeFilters: { matters: true, tasks: true, bills: true },
  },
}

// ✅ **Check Some Filters Checked**
export const SomeFiltersChecked: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: {
    open: true,
    searchByFilters: {
      clientName: true,
      attorney: false,
      caseName: true,
      opposingCouncil: false,
      court: false,
    },
    contentTypeFilters: { matters: true, tasks: false, bills: true },
  },
}

// ✅ **Check No Filters Checked**
export const NoFiltersChecked: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: {
    open: true,
    searchByFilters: {
      clientName: false,
      attorney: false,
      caseName: false,
      opposingCouncil: false,
      court: false,
    },
    contentTypeFilters: { matters: false, tasks: false, bills: false },
  },
}

// ✅ **Simulate Loading State**
export const LoadingState: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: { open: true, isSearching: true, results: [] },
}

// ✅ **Simulate No Results**
export const NoResults: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: {
    open: true,
    query: 'Nonexistent query',
    results: [],
    isSearching: false,
    totalResults: 0,
    hasMore: false,
  },
}

// ✅ **Short Search Input**
export const ShortSearchInput: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: { open: true, query: 'Law' },
}

// ✅ **Long Search Input**
export const LongSearchInput: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: { open: true, query: 'Complex Legal Matters & Litigation Cases' },
}

// ✅ **Cleared Search Input**
export const ClearedSearchInput: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: { open: true },
  play: async () => {
    const searchInputBox = (await waitFor(() =>
      document.querySelector('[aria-label="DialogBoxSearch"]')
    )) as HTMLInputElement

    await userEvent.type(searchInputBox, 'Case Law')

    const clearButton = (await waitFor(() =>
      document.querySelector('button[aria-label="Clear"]')
    )) as HTMLButtonElement

    await userEvent.click(clearButton)
    action('Clicked Clear button')()

    await waitFor(() => expect(searchInputBox).toHaveValue(''))
  },
}
// ✅ **Clicked Search Result**
export const ClickedSearchResult: StoryObj<typeof SearchDialog> = {
  ...Template,
  play: async () => {
    const searchResultItem = (await waitFor(() =>
      document.querySelector('[data-slot="search-result"]')
    )) as HTMLElement
    await userEvent.click(searchResultItem)
    action('Clicked search result')(searchResultItem.textContent)
  },
}

// ✅ **Load More Results**
export const LoadMoreResults: StoryObj<typeof SearchDialog> = {
  ...Template,
  play: async () => {
    const loadMoreButton = (await waitFor(() =>
      document.querySelector('[data-slot="button"]')
    )) as HTMLElement
    await userEvent.click(loadMoreButton)
    action('Clicked Load More button')()
    await waitFor(() =>
      expect(
        document.querySelectorAll('.cursor-pointer').length
      ).toBeGreaterThan(mockResults.length)
    )
  },
}
