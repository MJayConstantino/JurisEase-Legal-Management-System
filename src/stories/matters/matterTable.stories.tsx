import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MattersTable } from "@/components/matters/mattersTable";
import { mockMatters } from "./mockMatters";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof MattersTable> = {
  title: "Matters/MattersTable",
  component: MattersTable,
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
    (Story) => {
      return <div className="p-4">{Story()}</div>;
    },
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
    (Story) => {
      return <div className="p-4">{Story()}</div>;
    },
  ],
};

// Loading view: simulates a loading state by never resolving fetchUsersAction.
export const Loading: Story = {
  args: {
    matters: mockMatters,
    onSort: action("onSort"),
    sortField: "date_opened",
    sortDirection: "desc",
  },
  decorators: [
    (Story) => {
      return <div className="p-4">{Story()}</div>;
    },
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
    (Story) => {
      return <div className="dark">{Story()}</div>;
    },
  ],
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// MobileView: renders the component in a mobile viewport.
export const MobileView: Story = {
  args: {
    matters: mockMatters,
    onSort: action("onSort"),
    sortField: "date_opened",
    sortDirection: "desc",
  },
  decorators: [
    (Story) => {
      return <div className="p-4">{Story()}</div>;
    },
  ],
  parameters: {
    viewport: { defaultViewport: "iphonex" },
  },
};
