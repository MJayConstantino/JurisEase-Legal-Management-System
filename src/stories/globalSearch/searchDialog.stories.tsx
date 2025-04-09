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

const withTheme: Decorator = (Story, context: StoryContext) => {
  return (
    <ThemeProvider defaultTheme={context.globals.theme ?? 'light'}>
      <Story />
    </ThemeProvider>
  )
}

export default {
  title: 'globalSearch/SearchDialog',
  component: SearchDialog,
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [withTheme],
} as Meta<typeof SearchDialog>

const Template: StoryObj<typeof SearchDialog> = {
  args: {
    open: true,
  },
}

export const DefaultView: StoryObj<typeof SearchDialog> = {
  ...Template,
}

export const ClosedView: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: { open: false },
}

export const CollapsedView: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: { open: true },
  play: async () => {
    const collapsibles = Array.from(
      document.querySelectorAll('[data-slot="collapsible-trigger"]')
    ) as HTMLElement[]

    for (const collapsible of collapsibles) {
      const initialState = collapsible.getAttribute('data-state')
      action('Initial collapsible state')(initialState)

      await userEvent.click(collapsible)
      action('Collapsed filter section')(collapsible.textContent)

      await waitFor(() => {
        const finalState = collapsible.getAttribute('data-state')
        action('Final collapsible state')(finalState)
        expect(finalState).toBe('closed')
      })
    }
  },
}

export const AllFiltersChecked: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: {
    open: true,
  },
  play: async () => {
    const checkboxes = Array.from(
      document.querySelectorAll('[data-slot="checkbox"]')
    ) as HTMLElement[]

    for (const checkbox of checkboxes) {
      const isChecked =
        checkbox.querySelector('[data-slot="checkbox-indicator"]') !== null

      if (!isChecked) {
        await userEvent.click(checkbox)
        action('Checkbox checked')(checkbox.id)
        await waitFor(() => {
          expect(
            checkbox.querySelector('[data-slot="checkbox-indicator"]')
          ).toBeTruthy()
        })
      }
    }
  },
}

// ✅ **Check Some Filters Checked**
export const SomeFiltersChecked: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: {
    open: true,
  },
}

// ✅ **Check No Filters Checked**
export const NoFiltersChecked: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: {
    open: true,
  },
  play: async () => {
    // ✅ Select all checkbox elements
    const checkboxes = Array.from(
      document.querySelectorAll('[data-slot="checkbox"]')
    ) as HTMLElement[]

    for (const checkbox of checkboxes) {
      const isChecked =
        checkbox.querySelector('[data-slot="checkbox-indicator"]') !== null

      if (isChecked) {
        await userEvent.click(checkbox) // ✅ Simulate user unchecking checkbox
        action('Checkbox unchecked')(checkbox.id) // ✅ Log unchecking action

        await waitFor(() => {
          expect(
            checkbox.querySelector('[data-slot="checkbox-indicator"]')
          ).toBeFalsy()
        }) // ✅ Validate state change
      }
    }
  },
}

// ✅ **Short Search Input**
export const ShortSearchInput: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: {
    open: true,
  },
  play: async () => {
    // ✅ Select the search input box
    const searchInputBox = (await waitFor(() =>
      document.querySelector('[aria-label="DialogBoxSearch"]')
    )) as HTMLInputElement

    // ✅ Simulate typing "Law" into the search box
    await userEvent.type(searchInputBox, 'XEEE')
    action('User typed in search box')('XEEE')

    // ✅ Validate that input value matches expected search term
    await waitFor(() => {
      expect(searchInputBox).toHaveValue('XEEE')
    })
  },
}
// ✅ **Long Search Input**
export const LongSearchInput: StoryObj<typeof SearchDialog> = {
  ...Template,
  args: { open: true },
  play: async () => {
    // ✅ Select the search input box
    const searchInputBox = (await waitFor(() =>
      document.querySelector('[aria-label="DialogBoxSearch"]')
    )) as HTMLInputElement

    // ✅ Simulate typing "Law" into the search box
    await userEvent.type(
      searchInputBox,
      'LNGSRCHRSULTTATIRLLYHDIIHVTMKTLNRBCUZTODFDJDLDLFJSDLFJSDF:DFDF'
    )
    action('User typed in search box')(
      'LNGSRCHRSULTTATIRLLYHDIIHVTMKTLNRBCUZTODFDJDLDLFJSDLFJSDF:DFDF'
    )

    // ✅ Validate that input value matches expected search term
    await waitFor(() => {
      expect(searchInputBox).toHaveValue(
        'LNGSRCHRSULTTATIRLLYHDIIHVTMKTLNRBCUZTODFDJDLDLFJSDLFJSDF:DFDF'
      )
    })
  },
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
