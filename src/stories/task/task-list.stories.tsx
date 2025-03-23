import { Meta, StoryObj } from "@storybook/react";
import TaskList from "@/components/tasks/task-list";
import type { Task } from "@/app/(dashboard)/types";

export default {
  title: "Task/TaskList",
  component: TaskList,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof TaskList>;

const sampleTasks: Task[] = [
  {
    id: "1",
    name: "Complete project report",
    description: "Finish the final report for the client",
    priority: "high",
    status: "pending",
    dueDate: new Date(),
  },
  {
    id: "2",
    name: "Team meeting",
    description: "Weekly team sync-up",
    priority: "medium",
    status: "in-progress",
    dueDate: new Date()
  },
  {
    id: "3",
    name: "Code review",
    description: "Review the PR for the new feature",
    priority: "low",
    status: "completed",
    dueDate: new Date()
  },
];

export const Default: Story = {
  args: {
    tasks: sampleTasks,
    onEdit: (task) => alert(`Edit: ${task.name}`),
    onDelete: (taskId) => alert(`Delete: ${taskId}`),
    onStatusChange: (taskId, completed) =>
      alert(`Status changed for ${taskId}: ${completed}`),
  },
};

export const Empty: Story = {
  args: {
    tasks: [],
    onEdit: () => {},
    onDelete: () => {},
    onStatusChange: () => {},
  },
};

export const WithCompletedTasks: Story = {
  args: {
    tasks: sampleTasks.map((task) => ({ ...task, status: "completed" })),
    onEdit: (task) => alert(`Edit: ${task.name}`),
    onDelete: (taskId) => alert(`Delete: ${taskId}`),
    onStatusChange: (taskId, completed) =>
      alert(`Status changed for ${taskId}: ${completed}`),
  },
};
