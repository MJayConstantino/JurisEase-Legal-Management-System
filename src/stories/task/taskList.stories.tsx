import { Meta, StoryObj } from "@storybook/react";
import { TaskList } from "@/components/tasks/taskList";
import mockTasks from "./mockTask";

const meta: Meta<typeof TaskList> = {
  title: "Tasks/TaskList",
  component: TaskList,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [],
};

export default meta;

type Story = StoryObj<typeof TaskList>;

const mockHandlers = {
  onTaskCreated: (task: any) => console.log("Task created:", task),
};

const allTasks = [
  mockTasks.default,
  mockTasks.overdue,
  mockTasks.complete,
  mockTasks.highPriority,
  mockTasks.lowPriority,
  mockTasks.mediumPriority,
  mockTasks.withoutMatter,
  mockTasks.withoutDueDate,
];

export const Default: Story = {
  args: {
    initialTasks: allTasks,
    ...mockHandlers,
  },
};

export const OverdueTasks: Story = {
  args: {
    initialTasks: [mockTasks.overdue],
    ...mockHandlers,
  },
};

export const CompletedTasks: Story = {
  args: {
    initialTasks: [mockTasks.complete],
    ...mockHandlers,
  },
};

export const HighPriorityTasks: Story = {
  args: {
    initialTasks: [mockTasks.highPriority],
    ...mockHandlers,
  },
};

export const DarkMode: Story = {
  args: {
    initialTasks: allTasks,
    ...mockHandlers,
  },
  render: (args) => (
    <div className="dark bg-gray-900 p-4">
      <TaskList {...args} />
    </div>
  ),
};
