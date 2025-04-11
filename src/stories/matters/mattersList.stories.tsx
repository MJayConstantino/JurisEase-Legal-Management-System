import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MattersList } from "@/components/matters/mattersList";
import { jest } from "@storybook/jest";
import { mockMatters } from "./mockMatters";
import * as matterActions from "@/action-handlers/matters";

const meta: Meta<typeof MattersList> = {
  title: "Matters/MattersList",
  component: MattersList,
  parameters: {
    nextjs: { appDirectory: true },
    layout: "fullscreen",
    viewport: { defaultViewport: "responsive" },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", background: "#f0f0f0" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MattersList>;

/**
 * Default:
 * Mocks a successful fetch that returns a list of matters.
 */
export const Default: Story = {
  decorators: [
    (Story) => {
      jest.spyOn(matterActions, "handleFetchMatters").mockResolvedValue({
        matters: mockMatters,
        error: null,
      });
      return <Story />;
    },
  ],
};

/**
 * Loading:
 * Simulates a loading state by preventing handleFetchMatters from resolving.
 */
export const Loading: Story = {
  decorators: [
    (Story) => {
      jest
        .spyOn(matterActions, "handleFetchMatters")
        .mockImplementation(() => new Promise(() => {}));
      return <Story />;
    },
  ],
};

/**
 * DarkMode:
 * Renders the MattersList on a dark background.
 */
export const DarkMode: Story = {
  decorators: [
    (Story) => {
      jest.spyOn(matterActions, "handleFetchMatters").mockResolvedValue({
        matters: mockMatters,
        error: null,
      });
      return (
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#333",
            color: "#fff",
            minHeight: "100vh",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: { backgrounds: { default: "dark" } },
};
