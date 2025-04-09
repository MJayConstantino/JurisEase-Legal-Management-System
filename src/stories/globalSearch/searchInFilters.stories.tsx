import { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { SearchInFilters } from '@/components/header/globalSearch/searchInFilters'
import { action } from '@storybook/addon-actions'
import React, { useState } from 'react'
import type { ContentTypeFilters } from '@/components/header/globalSearch/types'

// 🏗 **Meta Configuration**
export default {
  title: 'globalSearch/SearchInFilters',
  component: SearchInFilters,
} as Meta<typeof SearchInFilters>

// ✅ **Mock Parent Component to Simulate State**
const MockParentWrapper = ({
  initialFilters,
}: {
  initialFilters: ContentTypeFilters
}) => {
  const [filters, setFilters] = useState<ContentTypeFilters>(initialFilters)

  return (
    <SearchInFilters
      filters={filters}
      setFilters={(update) => {
        action('Filter updated')(update)
        setFilters(update) // ✅ Updates real state inside Storybook
      }}
    />
  )
}

const Template: StoryObj<typeof SearchInFilters> = {
  render: (args) => <MockParentWrapper initialFilters={args.filters} />,
  args: {
    filters: {
      matters: true,
      tasks: false,
      bills: false,
    },
  },
}

// 🆕 **Default Story (Collapsible Open)**
export const DefaultView: StoryObj<typeof SearchInFilters> = {
  ...Template,
}

// 📉 **Collapsed View (Ensures filters are collapsed from expanded default state)**
export const CollapsedView: StoryObj<typeof SearchInFilters> = {
  ...Template,
  play: async () => {
    const collapsibleTrigger = (await waitFor(() =>
      document.querySelector('[data-slot="collapsible-trigger"]')
    )) as HTMLElement

    // ✅ Ensure it's **already expanded** by default
    await waitFor(() => {
      const initialState = collapsibleTrigger.getAttribute('data-state')
      action('Initial collapsible state')(initialState)
      expect(initialState).toBe('open') // ✅ Ensuring default is expanded
    })

    // ✅ Click to collapse
    await userEvent.click(collapsibleTrigger)
    action('Clicked collapsible trigger to collapse')()

    // ✅ Wait for **it to close**
    await waitFor(() => {
      const collapsed =
        collapsibleTrigger.getAttribute('data-state') === 'closed'
      action('Collapsible state after click')(collapsed ? 'CLOSED' : 'OPEN')
      expect(collapsed).toBe(true)
    })
  },
}

// ✅ **Check All Unchecked Checkboxes (Expands collapsible first if needed)**
export const CheckedUncheckedCheckBoxes: StoryObj<typeof SearchInFilters> = {
  ...Template,
  play: async () => {
    const collapsibleTrigger = (await waitFor(() =>
      document.querySelector('[data-slot="collapsible-trigger"]')
    )) as HTMLElement

    // ✅ Expand collapsible before interacting with checkboxes if needed
    if (collapsibleTrigger.getAttribute('data-state') !== 'open') {
      await userEvent.click(collapsibleTrigger)
      action('Clicked collapsible trigger to expand')()

      await waitFor(() => {
        const expanded =
          collapsibleTrigger.getAttribute('data-state') === 'open'
        action('Collapsible state after click')(expanded ? 'OPEN' : 'CLOSED')
        expect(expanded).toBe(true)
      })
    }

    const checkboxes = Array.from(
      document.querySelectorAll('[data-slot="checkbox"]')
    ) as HTMLElement[]

    for (const checkbox of checkboxes) {
      const indicator = checkbox.querySelector(
        '[data-slot="checkbox-indicator"]'
      )
      const isChecked = indicator !== null

      if (!isChecked) {
        await userEvent.click(checkbox)
        action('Checkbox checked')(checkbox.id)
        await waitFor(() =>
          expect(
            checkbox.querySelector('[data-slot="checkbox-indicator"]')
          ).toBeTruthy()
        )
      }
    }
  },
}
