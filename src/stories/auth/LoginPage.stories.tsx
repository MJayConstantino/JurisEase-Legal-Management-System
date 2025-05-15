import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { z } from 'zod'
import { LoginPage, LoginPageProps } from '@/components/auth/Login'
import { Toaster, toast } from 'sonner'
import { action } from '@storybook/addon-actions' // Import Storybook actions

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters long'),
})

function validateLogin(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  return loginSchema.safeParse(data)
}

export default {
  title: 'Auth/LoginPage',
  component: LoginPage,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position="top-center" />
      </>
    ),
  ],
} as Meta<LoginPageProps>

const Template: StoryObj<LoginPageProps> = {
  render: (args) => <LoginPage {...args} />,
  args: {
    handleLoginSubmitfn: async (formData: FormData) => {
      action('handleLoginSubmitfn')(formData) // Log the action
      const validation = validateLogin(formData)
      if (!validation.success) {
        return { error: validation.error.errors[0].message }
      }
      if (
        formData.get('email') === 'test@example.com' &&
        formData.get('password') === 'password'
      ) {
        return { error: null }
      } else {
        return { error: 'Invalid credentials' }
      }
    },
    handleGoogleLoginfn: async () => {
      action('handleGoogleLoginfn')() // Log the action

      return { error: null }
    },
    onLoginSuccess: action('onLoginSuccess'), // Log the action
    onGoogleLoginSuccess: action('onGoogleLoginSuccess'), // Log the action
    isPending: false,
  },
}

// Stories
export const Default = Template

export const Pending: StoryObj<LoginPageProps> = {
  ...Template,
  args: { ...Template.args, isPending: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginButton = canvas.getByRole('button', { name: 'Logging in...' })
    await expect(loginButton).toBeDisabled()
  },
}

export const Success: StoryObj<LoginPageProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailInput = canvas.getByPlaceholderText('Enter Email')
    const passwordInput = canvas.getByPlaceholderText('Enter Password')
    const loginButton = canvas.getByRole('button', { name: 'Log in' })
    await userEvent.clear(emailInput)
    await userEvent.clear(passwordInput)
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.click(loginButton)

    // Wait for the toast notification
    // await waitFor(() =>
    //   expect(canvas.queryByText('Login Success')).not.toBeNull()
    // )
  },
}

export const Failed: StoryObj<LoginPageProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter Email')
    const passwordInput = canvas.getByPlaceholderText('Enter Password')
    const loginButton = canvas.getByRole('button', { name: 'Log in' })

    await userEvent.clear(emailInput)
    await userEvent.clear(passwordInput)
    await userEvent.type(emailInput, 'wrong@example.com')
    await userEvent.type(passwordInput, 'wrongpassword')
    await userEvent.click(loginButton)

    // Wait for the toast notification
    // await waitFor(() =>
    //   expect(canvas.queryByText('Invalid credentials')).not.toBeNull()
    // )
  },
}

export const InvalidInput: StoryObj<LoginPageProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter Email')
    const passwordInput = canvas.getByPlaceholderText('Enter Password')
    const loginButton = canvas.getByRole('button', { name: 'Log in' })
    await userEvent.clear(emailInput)
    await userEvent.clear(passwordInput)
    await userEvent.type(emailInput, 'invalid-email')
    await userEvent.type(passwordInput, '123')
    await userEvent.click(loginButton)

    // Wait for the toast notification
    // await waitFor(() =>
    //   expect(canvas.queryByText('Invalid email address')).not.toBeNull()
    // )
  },
}

export const GoogleLoginSuccess: StoryObj<LoginPageProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const googleLoginButton = canvas.getByRole('button', {
      name: 'Continue with Google',
    })

    await userEvent.click(googleLoginButton)

    // Wait for the toast notification
    // await waitFor(() =>
    //   expect(canvas.queryByText('Google Login Success')).not.toBeNull()
    // )
  },
}
