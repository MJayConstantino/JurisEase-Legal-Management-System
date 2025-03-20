import type { Meta, StoryObj } from "@storybook/react";
import { TaskTable } from "@/components/tasks/task-table";
import { Task } from "@/components/tasks/task-table";
const meta: Meta<typeof TaskTable> = {
  title: "Tasks/TaskTable",
  component: TaskTable,
  tags: ["autodocs"],
  argTypes: {
    onEdit: { action: "edit" },
    onDelete: { action: "delete" },
    onStatusChange: { action: "status change" },
  },
};

export default meta;
type Story = StoryObj<typeof TaskTable>;

const sampleTasks: Task[] = [
  {
    id: "1",
    name: "Complete Storybook setup",
    dueDate: new Date(),
    assignedTo: "John Doe",
    status: "pending",
    priority: "high",
    recurring: false,
  },
  {
    id: "2",
    name: "Fix UI bugs",
    dueDate: new Date(),
    assignedTo: "Jane Smith",
    status: "completed",
    priority: "medium",
    recurring: true,
  },
  {
    id: "3",
    name: "Refactor components",
    dueDate: null,
    assignedTo: "Alice Brown",
    status: "pending",
    priority: "low",
    recurring: false,
  },
];

export const EmptyTable: Story = {
  args: {
    tasks: [],
  },
};

export const DefaultTable: Story = {
  args: {
    tasks: sampleTasks,
  },
};

export const CompletedTasks: Story = {
  args: {
    tasks: sampleTasks.map((task) => ({ ...task, status: "completed" })),
  },
};