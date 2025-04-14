import type { Meta, StoryObj } from "@storybook/react"
import HeroSection from "@/components/homepage/heroSection"

const meta: Meta<typeof HeroSection> = {
  title: "Homepage/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof HeroSection>

export const Default: Story = {
  args: {
    title: "Welcome to Our Website",
    subtitle: "We provide innovative solutions to help you succeed.",
    buttonText: "Get Started",
  },
}

export const NoSubtitle: Story = {
  args: {
    title: "Join Our Team",
    subtitle: "",
    buttonText: "Apply Now",
  },
}

export const LongTitle: Story = {
  args: {
    title: "Empowering Businesses to Reach New Heights with Cutting-Edge Technology Solutions",
    subtitle: "Harness the power of technology to scale your business and achieve exceptional growth.",
    buttonText: "Learn More",
  },
}

export const DisabledButton: Story = {
  args: {
    title: "Stay Connected",
    subtitle: "Sign up to receive our latest updates and news.",
    buttonText: "Subscribe Now",
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement
    const button = canvas.querySelector("button")
    if (button) {
      button.click()
    }
  },
}

