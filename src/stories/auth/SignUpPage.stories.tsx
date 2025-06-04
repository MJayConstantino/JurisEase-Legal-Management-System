import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { z } from 'zod'
import { SignUpPage, SignUpPageProps } from '@/components/auth/SignUp'
import { Toaster, toast } from 'sonner'
import { action } from '@storybook/addon-actions'

const signUpSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters long'),
})

function validateSignUp(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  return signUpSchema.safeParse(data)
}

export default {
  title: 'Auth/SignUpPage',
  component: SignUpPage,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position="top-center" />
      </>
    ),
  ],
} as Meta<SignUpPageProps>

const Template: StoryObj<SignUpPageProps> = {
  render: (args) => <SignUpPage {...args} />,
  args: {
    signUpHandler: async (formData: FormData) => {
      action('signUpHandler')(formData) // Log the action
      const validation = validateSignUp(formData)
      if (!validation.success) {
        return { error: validation.error.errors[0].message }
      }
      if (
        formData.get('email') === 'newuser@example.com' &&
        formData.get('password') === 'password123'
      ) {
        toast.success('Sign-Up Successful', { id: 'sign-up-success' })
        return { error: null }
      } else {
        return { error: 'Sign-Up Failed' }
      }
    },
    onSignUpSuccess: action('onSignUpSuccess'), // Log the action
    isPending: false,
  },
}

// Stories
export const Default: StoryObj<SignUpPageProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nameInput = canvas.getByLabelText('Full Name')
    const emailInput = canvas.getByLabelText('Email')
    const passwordInput = canvas.getByLabelText('Password')
    const signUpButton = canvas.getByRole('button', { name: 'Sign Up' })

    // Fill out the fields, including the name
    // await userEvent.type(nameInput, 'Test User')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password123')

    // Wait for the toast notification
    // await waitFor(() =>
    //   expect(canvas.queryByText('Sign-Up Successful')).not.toBeNull()
    // )
  },
}

export const Pending: StoryObj<SignUpPageProps> = {
  ...Template,
  args: { ...Template.args, isPending: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const signUpButton = canvas.getByRole('button', { name: 'Signing up...' })
    await expect(signUpButton).toBeDisabled()
  },
}

export const Success: StoryObj<SignUpPageProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nameInput = canvas.getByLabelText('Full Name')
    const emailInput = canvas.getByLabelText('Email')
    const passwordInput = canvas.getByLabelText('Password')
    const signUpButton = canvas.getByRole('button', { name: 'Sign Up' })

    await userEvent.type(nameInput, 'New User') // Always fill out the name
    await userEvent.type(emailInput, 'newuser@example.com')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.click(signUpButton)

    // Wait for the toast notification
    // await waitFor(() =>
    //   expect(canvas.queryByText('Sign-Up Successful')).not.toBeNull()
    // )
  },
}

export const Failed: StoryObj<SignUpPageProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nameInput = canvas.getByLabelText('Full Name')
    const emailInput = canvas.getByLabelText('Email')
    const passwordInput = canvas.getByLabelText('Password')
    const signUpButton = canvas.getByRole('button', { name: 'Sign Up' })

    await userEvent.type(nameInput, 'Valid Name') // Always fill out the name
    await userEvent.type(emailInput, 'wrong@example.com')
    await userEvent.type(passwordInput, 'wrongpassword')
    await userEvent.click(signUpButton)

    // Wait for the toast notification
    // await waitFor(() =>
    //   expect(canvas.queryByText('Sign-Up Failed')).not.toBeNull()
    // )
  },
}

export const InvalidInput: StoryObj<SignUpPageProps> = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nameInput = canvas.getByLabelText('Full Name')
    const emailInput = canvas.getByLabelText('Email')
    const passwordInput = canvas.getByLabelText('Password')
    const signUpButton = canvas.getByRole('button', { name: 'Sign Up' })

    await userEvent.type(nameInput, 'Test User') // Always fill out the name
    await userEvent.type(emailInput, 'invalid-email')
    await userEvent.type(passwordInput, '12345')
    await userEvent.click(signUpButton)

    // Wait for the toast notification
    // await waitFor(() =>
    //   expect(canvas.queryByText('Invalid email address')).not.toBeNull()
    // )
  },
}
