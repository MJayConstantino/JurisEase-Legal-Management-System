import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Header } from '../../components/auth/Header' // Path to your Header component

export default {
  title: 'Auth/Header',
  component: Header,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: StoryObj = {
  render: (args: any) => <Header {...args} />,
  args: {
    title: 'Welcome to Our Platform',
    subtitle: 'Your Trusted Partner',
    description: 'Sign up to access exclusive features and services.',
  },
}

export const Default = Template

export const ShortDescription: StoryObj = {
  ...Template,
  args: {
    ...Template.args,
    description: 'Simple and short description.',
  },
}

export const LongDescription: StoryObj = {
  ...Template,
  args: {
    ...Template.args,
    description:
      'This is a longer description that provides more details about the service or platform. It highlights key features and benefits, ensuring users understand the value of signing up or engaging with the platform.',
  },
}

export const CustomHeader: StoryObj = {
  ...Template,
  args: {
    title: 'Custom Title',
    subtitle: 'Specialized Subtitle',
    description: 'A tailored description for specific use cases.',
  },
}
