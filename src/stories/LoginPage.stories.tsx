import type { Meta, StoryObj } from '@storybook/react'

import LoginPage from '@/app/(auth)/login/page'

// Define Storybook metadata
export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
} satisfies Meta<typeof LoginPage>

// Stories
export const Default: StoryObj<typeof LoginPage> = {
  args: {},
}

export const Loading: StoryObj<typeof LoginPage> = {
  args: {},
}

export const InvalidCredentialsState: StoryObj<typeof LoginPage> = {
  args: {},
}

export const SupabaseAuthErorrState: StoryObj<typeof LoginPage> = {
  args: {},
}
