import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MatterConfirmDeletionDialog } from "@/components/matters/matterConfirmDeletionDialog";
import { action } from "@storybook/addon-actions";
import { mockMatters } from "./mockMatters";
import { ThemeProvider } from "@/components/ui/theme-provider";

const sampleMatter = mockMatters[0];

const meta: Meta<typeof MatterConfirmDeletionDialog> = {
  title: "Matters/MatterConfirmDeletionDialog",
  component: MatterConfirmDeletionDialog,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MatterConfirmDeletionDialog>;

/**
 * OpenDialog:
 * Renders the dialog in an open state without triggering deletion.
 */
export const OpenDialog: Story = {
  args: {
    isOpen: true,
    onOpenChange: action("onOpenChange"),
    matter: sampleMatter,
    onSuccess: action("onSuccess"),
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

/**
 * DarkMode:
 * Renders the dialog in dark mode.
 */
export const DarkMode: Story = {
  args: {
    isOpen: true,
    onOpenChange: action("onOpenChange"),
    matter: sampleMatter,
    onSuccess: action("onSuccess"),
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen dark">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
