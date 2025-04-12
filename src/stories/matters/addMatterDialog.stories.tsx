import type { Meta, StoryObj } from "@storybook/react";
import { AddMatterDialog } from "@/components/matters/addMatterDialog";
import { userEvent, within } from "@storybook/testing-library";
import { action } from "@storybook/addon-actions";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

const meta: Meta<typeof AddMatterDialog> = {
  title: "Matters/AddMatterDialog",
  component: AddMatterDialog,
  parameters: {
    layout: "centered",
    themes: {
      default: "light",
      list: [
        { name: "light", class: "light", color: "#ffffff" },
        { name: "dark", class: "dark", color: "#000000" },
      ],
    },
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1920px", height: "1080px" },
        },
      },
      defaultViewport: "responsive",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddMatterDialog>;

// Base template for all stories
const Template: Story = {
  args: {
    open: true,
    onOpenChange: action("onOpenChange"),
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="min-h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export const Default: Story = {
  ...Template,
};

export const DarkMode: Story = {
  ...Template,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export const MobileView: Story = {
  ...Template,
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};

export const TabletView: Story = {
  ...Template,
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
};
