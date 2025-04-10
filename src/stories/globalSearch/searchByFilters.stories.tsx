import { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { SearchByFilters } from '@/components/header/globalSearch/searchByFilters'
import { action } from '@storybook/addon-actions'
import React, { useState } from 'react'
import type { SearchByFilters as SearchByFiltersType } from '@/components/header/globalSearch/types'

export default {
  title: 'globalSearch/SearchByFilters',
  component: SearchByFilters,
} as Meta<typeof SearchByFilters>

const MockParentWrapper = ({
  initialFilters,
}: {
  initialFilters: SearchByFiltersType
}) => {
  const [filters, setFilters] = useState<SearchByFiltersType>(initialFilters)

  return (
    <SearchByFilters
      filters={filters}
      setFilters={(update) => {
        action('Filter updated')(update)
        setFilters(update)
      }}
    />
  )
}

const Template: StoryObj<typeof SearchByFilters> = {
  render: (args) => <MockParentWrapper initialFilters={args.filters} />,
  args: {
    filters: {
      clientName: false,
      attorney: false,
      caseName: false,
      opposingCouncil: false,
      court: false,
    },
  },
}

export const DefaultView: StoryObj<typeof SearchByFilters> = {
  ...Template,
}

export const CollapsedView: StoryObj<typeof SearchByFilters> = {
  ...Template,
  play: async () => {
    const collapsibleTrigger = (await waitFor(() =>
      document.querySelector('[data-slot="collapsible-trigger"]')
    )) as HTMLElement

    await waitFor(() => {
      const initialState = collapsibleTrigger.getAttribute('data-state')
      action('Initial collapsible state')(initialState)
      expect(initialState).toBe('open')
    })

    await userEvent.click(collapsibleTrigger)
    action('Clicked collapsible trigger to collapse')()

    await waitFor(() => {
      const collapsed =
        collapsibleTrigger.getAttribute('data-state') === 'closed'
      action('Collapsible state after click')(collapsed ? 'CLOSED' : 'OPEN')
      expect(collapsed).toBe(true)
    })
  },
}

export const CheckedUncheckedCheckBoxes: StoryObj<typeof SearchByFilters> = {
  ...Template,
  play: async () => {
    const collapsibleTrigger = (await waitFor(() =>
      document.querySelector('[data-slot="collapsible-trigger"]')
    )) as HTMLElement

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
