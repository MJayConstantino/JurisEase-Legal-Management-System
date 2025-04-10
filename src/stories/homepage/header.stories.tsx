import type { Meta, StoryObj } from "@storybook/react"
import Header from "@/components/homepage/header"

const meta: Meta<typeof Header> = {
    title: "Homepage/Header",
    component: Header,
    parameters: {
      layout: "fullscreen",
      viewport: {
        defaultViewport: "responsive",
      },
    },
    tags: ["autodocs"],
  }
  
  export default meta
  
  type Story = StoryObj<typeof Header>
  

const basicNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
]

const longNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Support", href: "/support" },
]

export const Default: Story = {
  args: {
    logoText: "MyLogo",
    navItems: basicNav,
  },
}

export const MinimalBrand: Story = {
  args: {
    logoText: "Go.",
    navItems: basicNav,
  },
}

export const LongLogo: Story = {
  args: {
    logoText: "The Great Company Name",
    navItems: basicNav,
  },
}

export const LongNavItems: Story = {
  args: {
    logoText: "MyLogo",
    navItems: longNav,
  },
}

export const NoNavItems: Story = {
  args: {
    logoText: "SoloBrand",
    navItems: [],
  },
}
