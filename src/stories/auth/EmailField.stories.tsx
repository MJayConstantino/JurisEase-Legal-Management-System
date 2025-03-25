import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import React, { useState, useEffect } from 'react'
import { EmailField } from '../../components/auth/Emailfield'
import { Toaster, toast } from 'sonner'
import { action } from '@storybook/addon-actions'
import { z } from 'zod'

export default {
  title: 'Auth/EmailField',
  component: EmailField,
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

const emailSchema = z.string().email('Invalid email format')

const Template: StoryObj = {
  render: (args: any) => {
    const [emailValue, setEmailValue] = useState(args.value || '')
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
      return () => {
        if (timeoutId) clearTimeout(timeoutId)
      }
    }, [timeoutId])

    return (
      <EmailField
        {...args}
        value={emailValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value
          setEmailValue(newValue)
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
    const emailInput = canvas.getByPlaceholderText('Enter Email')
    await expect(emailInput).toBeDisabled()
  },
}

export const Filled: StoryObj = {
  ...Template,
  args: { ...Template.args, value: 'user@example.com' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter Email')
    await userEvent.clear(emailInput)
    await userEvent.type(emailInput, 'user@example.com')
    await expect(emailInput).toHaveValue('user@example.com')
    action('Filled input tested')('user@example.com')
  },
}

export const InvalidInput: StoryObj = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter Email')

    emailInput.focus()

    await userEvent.clear(emailInput)
    await userEvent.type(emailInput, 'invalid-email')

    await waitFor(() => expect(emailInput).toHaveValue('invalid-email'))
    action('Invalid email typed')('invalid-email')
    const validation = emailSchema.safeParse('invalid-email')
    if (validation.error) {
      toast.error(validation.error.errors[0].message)
    }
  },
}

export const ValidInput: StoryObj = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter Email')

    emailInput.focus()

    await userEvent.clear(emailInput)
    await userEvent.type(emailInput, 'user@example.com')

    await waitFor(() => expect(emailInput).toHaveValue('user@example.com'))
    action('Valid email typed')('user@example.com')
  },
}
