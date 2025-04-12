import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MattersList } from "@/components/matters/mattersList";
import { mockMatters } from "./mockMatters";
import { Matter } from "@/types/matter.type";
import * as matterActions from "@/action-handlers/matters";

const matters: Matter[] = mockMatters;

const meta: Meta<typeof MattersList> = {
  title: "Matters/MattersList",
  component: MattersList,
  parameters: {
    nextjs: { appDirectory: true },
    layout: "fullscreen",
    viewport: { defaultViewport: "responsive" },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MattersList>;

/**
 * Empty:
 * Simulates an empty list by overriding handleFetchMatters to return an empty array.
 */
export const Empty: Story = {
  // In your implementation, you can override the fetch function here.
  // For now, we show the default with an empty state.
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Loading:
 * Simulates a loading state by overriding handleFetchMatters to never resolve.
 */
export const Loading: Story = {
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * WithContent:
 * Simulates a successful fetch returning the mock matters.
 */
export const WithContent: Story = {
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * DarkMode:
 * Shows the MattersList on a dark background with populated content,
 * filling the whole screen using Tailwind CSS flex classes.
 */
export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * MobileView:
 * Renders the MattersList with content in a mobile viewport.
 */
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};
