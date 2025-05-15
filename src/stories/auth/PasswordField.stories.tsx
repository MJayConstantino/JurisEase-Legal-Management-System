import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import React, { useState, useEffect } from 'react'
import { PasswordField } from '../../components/auth/PasswordField'
import { Toaster, toast } from 'sonner'
import { action } from '@storybook/addon-actions'
import { z } from 'zod'
import { PasswordFieldProps } from '../../components/auth/PasswordField'

export default {
  title: 'Auth/PasswordField',
  component: PasswordField,
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
} as Meta<PasswordFieldProps>

const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long') // Validate minimum password length

const Template: StoryObj<PasswordFieldProps> = {
  render: (args) => {
    const [passwordValue, setPasswordValue] = useState(args.value || '')
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
      return () => {
        if (timeoutId) clearTimeout(timeoutId)
      }
    }, [timeoutId])

    return (
      <PasswordField
        {...args}
        value={passwordValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value
          setPasswordValue(newValue)
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

export const Pending: StoryObj<PasswordFieldProps> = {
  ...Template,
  args: { ...Template.args, disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const passwordInput = canvas.getByPlaceholderText('Enter Password')
    await expect(passwordInput).toBeDisabled()
  },
}

export const FilledLong: StoryObj<PasswordFieldProps> = {
  ...Template,
  args: { ...Template.args, value: 'mypassword' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const passwordInput = canvas.getByPlaceholderText('Enter Password')
    await userEvent.clear(passwordInput)
    await userEvent.type(
      passwordInput,
      'mypasswordthatisreallylongfornootherreasonthantotest'
    )
    await expect(passwordInput).toHaveValue(
      'mypasswordthatisreallylongfornootherreasonthantotest'
    )
    action('Filled input tested')(
      'mypasswordthatisreallylongfornootherreasonthantotest'
    )
  },
}

export const InvalidPassword: StoryObj<PasswordFieldProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const passwordInput = canvas.getByPlaceholderText('Enter Password')

    passwordInput.focus()

    await userEvent.clear(passwordInput)
    await userEvent.tab()

    await waitFor(() => expect(passwordInput).toHaveValue(''))
    action('Invalid password typed')('')
  },
}

export const ValidPassword: StoryObj<PasswordFieldProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const passwordInput = canvas.getByPlaceholderText('Enter Password')

    passwordInput.focus()

    await userEvent.clear(passwordInput)
    await userEvent.type(passwordInput, 'securepass')

    await waitFor(() => expect(passwordInput).toHaveValue('securepass'))
    action('Valid password typed')('securepass')
  },
}
