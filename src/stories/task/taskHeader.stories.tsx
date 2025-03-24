import type { Meta, StoryObj } from "@storybook/react";
import { TasksHeader } from "@/components/tasks/taskHeader";
import { TasksProvider } from "@/components/tasks/taskProvider";

const meta: Meta<typeof TasksHeader> = {
  title: "Components/TasksHeader",
  component: TasksHeader,
  decorators: [
    (Story) => (
      <TasksProvider>
        <Story />
      </TasksProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TasksHeader>;

export const Default: Story = {};
