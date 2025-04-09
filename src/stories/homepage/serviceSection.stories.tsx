import type { Meta, StoryObj } from "@storybook/react"
import ServiceSection from "@/components/homepage/serviceSection"

const meta: Meta<typeof ServiceSection> = {
  title: "Homepage/ServicesSection",
  component: ServiceSection,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ServiceSection>

const services = [
  {
    title: "Family Law",
    description: "Expert legal advice and representation for family matters including divorce, custody, and adoption.",
  },
  {
    title: "Corporate Law",
    description: "Comprehensive legal services for businesses, from startup formation to mergers and acquisitions.",
  },
  {
    title: "Intellectual Property",
    description: "Protect your creative assets with our IP law services, including trademarks, patents, and copyrights.",
  },
]

export const Default: Story = {
  args: {
    title: "Our Legal Services",
    services: services,
  },
}

export const NoServices: Story = {
  args: {
    title: "Our Legal Services",
    services: [],
  },
}

export const SingleService: Story = {
  args: {
    title: "Our Legal Services",
    services: [services[0]],
  },
}

export const LongTitles: Story = {
  args: {
    title: "Our Specialized Legal Services Across Multiple Practice Areas",
    services: [
      {
        title: "International Trade and Investment Law",
        description: "Expert legal guidance on international trade and investment laws, policies, and negotiations.",
      },
      {
        title: "Real Estate Law",
        description: "Comprehensive real estate law services including contract review, dispute resolution, and property transactions.",
      },
      {
        title: "Bankruptcy and Restructuring",
        description: "Helping individuals and companies navigate bankruptcy proceedings and corporate restructuring processes.",
      },
    ],
  },
}