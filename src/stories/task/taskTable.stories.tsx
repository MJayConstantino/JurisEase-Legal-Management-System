import { Meta, StoryObj } from "@storybook/react";
import { TaskTable } from "@/components/tasks/taskTable";
import { mockMatter } from "./mockMatter";
import mockTasks from "./mockTask";

const meta: Meta<typeof TaskTable> = {
  title: "Tasks/TaskTable",
  component: TaskTable,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TaskTable>;

// Mock handlers for task updates
const mockHandlers = {
  onTaskUpdated: (task: any) => console.log("Task updated:", task),
  onTaskDeleted: (taskId: string) => console.log("Task deleted:", taskId),
};

// Basic set of matters
const matters = [
  mockMatter,
  {
    ...mockMatter,
    matter_id: "matter-2",
    name: "Contract Review",
    client_name: "Acme Corp",
  },
  {
    ...mockMatter,
    matter_id: "matter-3",
    name: "Property Settlement",
    client_name: "Smith Family",
  },
];

// All tasks combined into an array
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

// Template for basic story
export const Default: Story = {
  args: {
    tasks: allTasks,
    matters: matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};

// With loading matters
export const LoadingMatters: Story = {
  args: {
    tasks: allTasks,
    matters: [],
    isLoadingMatters: true,
    ...mockHandlers,
  },
};

// Only with specific tasks
export const OverdueTasks: Story = {
  args: {
    tasks: [mockTasks.overdue],
    matters: matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};

export const CompletedTasks: Story = {
  args: {
    tasks: [mockTasks.complete],
    matters: matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};

export const HighPriorityTasks: Story = {
  args: {
    tasks: [mockTasks.highPriority],
    matters: matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};

export const NoTasks: Story = {
  args: {
    tasks: [],
    matters: matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
  name: "Empty Table",
};

// Tasks sorted by different fields initially
export const SortedByDueDate: Story = {
  args: {
    tasks: allTasks,
    matters: matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
  parameters: {
    // Simulate sorting by due date
    nextRouter: {
      query: { sort: "due_date", order: "asc" },
    },
  },
};

export const SortedByPriority: Story = {
  args: {
    tasks: allTasks,
    matters: matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
  parameters: {
    // Simulate sorting by priority
    nextRouter: {
      query: { sort: "priority", order: "desc" },
    },
  },
};

