import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MattersTable } from "@/components/matters/mattersTable";
import { mockMatters } from "./mockMatters";
import { action } from "@storybook/addon-actions";
import { ThemeProvider } from "@/components/ui/theme-provider";

const meta: Meta<typeof MattersTable> = {
  title: "Matters/MattersTable",
  component: MattersTable,
  parameters: {
    nextjs: { appDirectory: true },
    layout: "fullscreen",
    viewports: {
      mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MattersTable>;

// Default view with content using sample matters.
export const Default: Story = {
  args: {
    matters: mockMatters,
    onSort: action("onSort"),
    sortField: "date_opened",
    sortDirection: "desc",
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="w-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// Empty view: simulates an empty matters list.
export const Empty: Story = {
  args: {
    matters: [],
    onSort: action("onSort"),
    sortField: "date_opened",
    sortDirection: "desc",
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="w-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// DarkMode: shows the MattersTable on a dark background, filling the whole screen.
export const DarkMode: Story = {
  args: {
    matters: mockMatters,
    onSort: action("onSort"),
    sortField: "date_opened",
    sortDirection: "desc",
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <div className="dark w-screen bg-gray-900 min-h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: { default: "dark" },
  },
};
