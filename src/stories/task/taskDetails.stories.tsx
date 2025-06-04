import { Meta, StoryObj } from "@storybook/react";
import { TaskDetails } from "@/components/tasks/taskDetails";
import { mockMatter } from "./mockMatter";
import mockTasks from "./mockTask";

const meta: Meta<typeof TaskDetails> = {
  title: "Tasks/TaskDetails",
  component: TaskDetails,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TaskDetails>;

// Mock handlers
const mockHandlers = {
  onTaskUpdated: (updatedTask: any) =>
    console.log("Task updated:", updatedTask),
  onTaskDeleted: (taskId: string) => console.log("Task deleted:", taskId),
  onOpenChange: (open: boolean) => console.log("Dialog open state:", open),
};

const matters = [
  mockMatter,
  {
    ...mockMatter,
    matter_id: "matter-2",
    name: "Contract Review",
    client_name: "Acme Corp",
  },
];

export const Default: Story = {
  args: {
    open: true,
    task: mockTasks.default,
    matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};

export const HighPriorityTask: Story = {
  args: {
    open: true,
    task: mockTasks.highPriority,
    matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};

export const OverdueTask: Story = {
  args: {
    open: true,
    task: mockTasks.overdue,
    matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};

export const CompleteTask: Story = {
  args: {
    open: true,
    task: mockTasks.complete,
    matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};

export const LongDescription: Story = {
  args: {
    open: true,
    task: mockTasks.longDescription,
    matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};

export const WithoutMatter: Story = {
  args: {
    open: true,
    task: mockTasks.withoutMatter,
    matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};

export const WithoutDueDate: Story = {
  args: {
    open: true,
    task: mockTasks.withoutDueDate,
    matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
};
