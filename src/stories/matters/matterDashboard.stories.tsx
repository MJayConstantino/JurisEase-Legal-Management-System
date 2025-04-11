// stories/MatterDashboard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MatterDashboard } from "@/components/matters/matterDashboard";
import { mockMatters } from "./mockMatters";
import { within, userEvent } from "@storybook/testing-library";

const sampleMatter = mockMatters[0];
const incompleteMatter = mockMatters[1];

const meta: Meta<typeof MatterDashboard> = {
  title: "Matters/MatterDashboard",
  component: MatterDashboard,
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
type Story = StoryObj<typeof MatterDashboard>;

/**
 * Default:
 * Renders the MatterDashboard component using a sample Matter object from mockMatters.
 */
export const Default: Story = {
  args: {
    matter: sampleMatter,
  },
};

/**
 * IncompleteData:
 * Renders the MatterDashboard with a Matter missing opposing council and court details.
 */
export const IncompleteData: Story = {
  args: {
    matter: incompleteMatter,
  },
};

/**
 * DarkMode:
 * Renders the MatterDashboard in a simulated dark environment.
 */
export const DarkMode: Story = {
  args: {
    matter: mockMatters[0],
  },
  decorators: [
    // Optionally wrap in a dark background container to simulate dark theme
    (Story) => (
      <div className="dark bg-gray-800">
        <Story />
      </div>
    ),
  ],
};
