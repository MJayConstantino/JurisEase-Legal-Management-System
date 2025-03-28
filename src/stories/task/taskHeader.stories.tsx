import type { Meta, StoryObj } from "@storybook/react";
import { TasksHeader } from "@/components/tasks/taskHeader";

const meta: Meta<typeof TasksHeader> = {
  title: "Components/TasksHeader",
  component: TasksHeader,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof TasksHeader>;

export const Default: Story = {};
