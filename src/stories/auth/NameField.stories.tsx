import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import React, { useState, useEffect } from 'react'
import { NameField } from '../../components/auth/NameField'
import { Toaster, toast } from 'sonner'
import { action } from '@storybook/addon-actions'
import { z } from 'zod'

export default {
  title: 'Auth/NameField',
  component: NameField,
  decorators: [
    (Story) => (
      <>
        <Toaster position="top-center" />
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <Story />
        </div>
      </>
    ),
  ],
} as Meta

const nameSchema = z.string().min(3, 'Name must be at least 3 characters long') // Zod name validation schema

const Template: StoryObj = {
  render: (args: any) => {
    const [nameValue, setNameValue] = useState(args.value || '')
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
      return () => {
        if (timeoutId) clearTimeout(timeoutId)
      }
    }, [timeoutId])

    return (
      <NameField
        {...args}
        value={nameValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value
          setNameValue(newValue)

          if (timeoutId) clearTimeout(timeoutId)

          // Set a new timeout to prevent spamming of toast
          const newTimeoutId = setTimeout(() => {
            const validation = nameSchema.safeParse(newValue)
            if (!validation.success) {
              toast.error(validation.error.errors[0].message)
              action('Invalid name detected')(newValue)
            } else {
              action('onChange')(newValue)
            }
          }, 1000) // 1-second delay
          setTimeoutId(newTimeoutId)
        }}
      />
    )
  },
  args: {
    value: '',
    disabled: false,
  },
}

export const Default = Template

export const Pending: StoryObj = {
  ...Template,
  args: { ...Template.args, disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nameInput = canvas.getByPlaceholderText('Enter your full name')
    await expect(nameInput).toBeDisabled()
  },
}

export const Filled: StoryObj = {
  ...Template,
  args: { ...Template.args, value: 'John Doe' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nameInput = canvas.getByPlaceholderText('Enter your full name')
    await expect(nameInput).toHaveValue('John Doe')
    action('Filled input tested')('John Doe')
  },
}

export const InvalidInput: StoryObj = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nameInput = canvas.getByPlaceholderText('Enter your full name')

    nameInput.focus()

    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'JD')

    await waitFor(() => expect(nameInput).toHaveValue('JD'))
    action('Invalid name typed')('JD')
  },
}

export const ValidInput: StoryObj = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nameInput = canvas.getByPlaceholderText('Enter your full name')

    nameInput.focus()

    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'John Doe')

    await waitFor(() => expect(nameInput).toHaveValue('John Doe'))
    action('Valid name typed')('John Doe')
  },
}
