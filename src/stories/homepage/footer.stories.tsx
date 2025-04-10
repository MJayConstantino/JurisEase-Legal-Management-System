import type { Meta, StoryObj } from "@storybook/react"
import Footer from "@/components/homepage/footer"

const meta: Meta<typeof Footer> = {
  title: "Homepage/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Footer>

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
]

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
]

const longQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Practice Areas", href: "/practice" },
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
]

const noSocialLinks: [] = []
const NoQuickLinks: [] = []


export const Default: Story = {
  args: {
    companyName: "LegalPro Firm",
    quickLinks,
    socialLinks,
  },
}

export const LongQuickLinks: Story = {
  args: {
    companyName: "Law & Justice Co.",
    quickLinks: longQuickLinks,
    socialLinks,
  },
}

export const NoSocials: Story = {
  args: {
    companyName: "SoloLegal",
    quickLinks,
    socialLinks: noSocialLinks,
  },
}

export const MinimalFooter: Story = {
  args: {
    companyName: "MiniCorp",
    quickLinks: [],
    socialLinks: [],
  },
}

export const NoQuickLink: Story = {
  args: {
    companyName: "NoLinks",
    quickLinks: NoQuickLinks,
    socialLinks,
  },
}

