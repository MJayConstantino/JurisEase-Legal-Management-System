import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MatterDashboard } from "@/components/matters/matterDashboard";
import { mockMatters } from "./mockMatters";

// Add mock users for the stories
const mockUsers = [
  {
    user_id: "1",
    user_name: "John Doe",
    user_email: "john.doe@example.com",
    role: "attorney",
  },
  {
    user_id: "2",
    user_name: "Jane Smith",
    user_email: "jane.smith@example.com",
    role: "paralegal",
  },
];

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
    users: mockUsers,
  },
};

/**
 * IncompleteData:
 * Renders the MatterDashboard with a Matter missing opposing council and court details.
 */
export const IncompleteData: Story = {
  args: {
    matter: incompleteMatter,
    users: mockUsers,
  },
};

/**
 * DarkMode:
 * Renders the MatterDashboard in a simulated dark environment.
 */
export const DarkMode: Story = {
  args: {
    matter: mockMatters[0],
    users: mockUsers,
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
