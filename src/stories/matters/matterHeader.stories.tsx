import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MatterHeader } from "@/components/matters/matterHeader";
import { mockMatters } from "./mockMatters";
import { userEvent, within } from "@storybook/testing-library";
import { ThemeProvider } from "@/components/ui/theme-provider";

const sampleMatter = mockMatters[0];

const meta: Meta<typeof MatterHeader> = {
  title: "Matters/MatterHeader",
  component: MatterHeader,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "fullscreen",
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
      },
      defaultViewport: "rsponsive",
    },
    themes: {
      default: "light",
      list: [
        { name: "light", class: "", color: "#ffffff" },
        { name: "dark", class: "dark", color: "#000000" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MatterHeader>;

export const Default: Story = {
  args: {
    matter: sampleMatter,
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="min-h-screen w-screen p-4 bg-white dark:bg-gray-900">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export const DarkMode: Story = {
  args: {
    matter: sampleMatter,
  },
  parameters: {
    themes: { current: "dark" },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="min-h-screen p-4 w-screen bg-white dark:bg-gray-900">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export const MobileView: Story = {
  args: {
    matter: sampleMatter,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="min-h-screen w-screen p-4 bg-white dark:bg-gray-900">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
