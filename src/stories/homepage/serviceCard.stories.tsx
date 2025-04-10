import type { Meta, StoryObj } from "@storybook/react"
import ServiceCard from "@/components/homepage/serviceCard"

const meta: Meta<typeof ServiceCard> = {
  title: "Homepage/ServiceCard",
  component: ServiceCard,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ServiceCard>

export const Default: Story = {
  args: {
    title: "Family Law",
    description: "Helping you navigate family law matters with compassion and expertise.",
  },
}

export const LongTitle: Story = {
    args: {
      title: "International Trade and Investment Law",
      description: "Providing expert advice on international trade and investment regulations.",
    },
  }
  
  export const LongDescription: Story = {
      args: {
        title: "International Trade and Investment Law",
        description: "Providing expert advice on international trade and investment regulations involves guiding businesses, governments, or individuals through the complexities of global commerce. This includes helping clients understand trade agreements, tariffs, and customs procedures, while ensuring compliance with both domestic and international laws. Experts assess risks such as political or economic instability and recommend strategies to mitigate them. They also advise on entering foreign markets, navigating regulatory frameworks, and identifying investment opportunities, while offering support in resolving trade disputes through legal or diplomatic channels. The goal is to equip clients with the insights and strategies needed to succeed in an interconnected global economy.",
      },
    }

export const CustomClassNames: Story = {
  args: {
    title: "Criminal Law",
    description: "Defending your rights in criminal cases with a dedicated team.",
    className: "border-2 border-yellow-500 border-[##197508]",
    titleClassName: "text-2xl text-[#197508]",
    descriptionClassName: "text-yellow-500",
  },
}


