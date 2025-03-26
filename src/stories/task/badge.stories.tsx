import { Meta, StoryObj } from "@storybook/react";
import { Badge, badgeVariants } from "@/components/ui/badge";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: Object.keys(badgeVariants({ variant: "default" })),
      },
    },
    children: {
      control: "text",
    },
  },
} as Meta;

type Story = StoryObj<typeof Badge>;


export const Default: Story = {
  args: {
    variant: "default",
    children: "Default Badge",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  },
}

export const Completed: Story = {
  args: {
    variant: "default",
    children: "completed",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
  },
};

export const Pending: Story = {
  args: {
    variant: "default",
    children: "pending",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
  },
};

export const InProgress: Story = {
  args: {
    variant: "default",
    children: "in progress",
    className:"bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
  },
};

export const High: Story = {
  args: {
    variant: "default",
    children: "high",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  },
};

export const Medium: Story = {
  args: {
    variant: "default",
    children: "medium",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
  },
};

export const Low: Story = {
  args: {
    variant: "default",
    children: "low",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
  },
};

