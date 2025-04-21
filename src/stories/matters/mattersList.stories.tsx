import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MattersList } from "@/components/matters/mattersList";
import { mockMatters } from "./mockMatters";
import { ThemeProvider } from "@/components/theme-provider";

const meta: Meta<typeof MattersList> = {
  title: "Matters/MattersList",
  component: MattersList,
  parameters: {
    nextjs: { appDirectory: true },
    layout: "fullscreen",
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
      },
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="w-screen min-h-screen bg-white dark:bg-gray-900 p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MattersList>;

/**
 * Empty:
 * Simulates an empty list by passing an empty matters array.
 */
export const Empty: Story = {
  args: {
    matters: [],
  },
};

/**
 * WithContent:
 * Simulates a successful fetch returning the mock matters.
 */
export const WithContent: Story = {
  args: {
    matters: mockMatters,
  },
};

/**
 * DarkMode:
 * Shows the MattersList on a dark background with populated content.
 */
export const DarkMode: Story = {
  args: {
    matters: mockMatters,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="dark bg-gray-900 min-h-screen w-screen p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

/**
 * MobileView:
 * Renders the MattersList with content in a mobile viewport.
 */
export const MobileView: Story = {
  args: {
    matters: mockMatters,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};
