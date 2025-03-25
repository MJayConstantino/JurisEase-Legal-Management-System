import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Footer } from '../../components/auth/Footer'

export default {
  title: 'Auth/Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: StoryObj = {
  render: (args: any) => <Footer {...args} />,
  args: {
    text: "Don't have an account?",
    linkHref: '/signup',
    linkText: 'Sign Up',
  },
}

export const Default = Template

export const DifferentCTA: StoryObj = {
  ...Template,
  args: {
    ...Template.args,
    text: 'Already have an account?',
    linkHref: '/login',
    linkText: 'Log In',
  },
}

export const CustomFooter: StoryObj = {
  ...Template,
  args: {
    text: 'Need help with something?',
    linkHref: '/support',
    linkText: 'Contact Support',
  },
}
