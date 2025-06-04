import { Meta, StoryObj } from "@storybook/react";
import { TasksHeader } from "@/components/tasks/taskHeader";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof TasksHeader> = {
  title: "Tasks/TasksHeader",
  component: TasksHeader,
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TasksHeader>;

export const TableActive: Story = {
  args: {
    onStatusChange: action("Status Changed"),
    onViewChange: action("View Changed"),
    view: "table",
  },
};

export const GridActive: Story = {
  args: {
    onStatusChange: action("Status Changed"),
    onViewChange: action("View Changed"),
    view: "grid",
  },
};

export const DarkMode: Story = {
  args: {
    onStatusChange: action("Status Changed"),
    onViewChange: action("View Changed"),
    view: "grid",
  },
  render: (args) => (
    <div className="dark">
      <TasksHeader {...args} />
    </div>
  ),
};
