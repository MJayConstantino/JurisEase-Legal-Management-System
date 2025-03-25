import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import React from 'react'
import { GoogleSignInButton } from '../../components/auth/GoogleSigninBtn'
import { Toaster, toast } from 'sonner'
import { action } from '@storybook/addon-actions'
import { GoogleSignInButtonProps } from '../../components/auth/GoogleSigninBtn'

export default {
  title: 'Auth/GoogleSignInButton',
  component: GoogleSignInButton,
  decorators: [
    (Story) => (
      <>
        <Toaster position="top-right" />{' '}
        <div style={{ maxWidth: '200px', margin: '0 auto' }}>
          <Story />
        </div>
      </>
    ),
  ],
} as Meta<GoogleSignInButtonProps>

const Template: StoryObj<GoogleSignInButtonProps> = {
  render: (args) => <GoogleSignInButton {...args} />,
  args: {
    onClick: () => {
      action('onClick')()
      toast.success('You have successfully signed in with Google!')
    },
    disabled: false,
  },
}

export const Default = Template

export const Pending: StoryObj<GoogleSignInButtonProps> = {
  ...Template,
  args: { ...Template.args, disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Sign in with Google' })
    await expect(button).toBeDisabled()
  },
}

export const Clicked: StoryObj<GoogleSignInButtonProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Sign in with Google' })

    await userEvent.click(button)

    await waitFor(() =>
      expect(
        canvas.queryByText('You have successfully signed in with Google!')
      ).not.toBeNull()
    )

    action('Button clicked')('Sign in with Google')
  },
}
