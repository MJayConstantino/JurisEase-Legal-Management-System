import { Meta, StoryObj } from "@storybook/react";
import { mockMatter } from "./mockMatter";
import mockTasks from "./mockTask";
import { TaskRow } from "@/components/tasks/taskRow";
import { Task } from "@/types/task.type";

export default {
  title: "Tasks/TaskRow",
  component: TaskRow,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;

const matters = [mockMatter];

// Mock handlers for the required props
const mockHandlers = {
  getMatterName: (matterId: string) =>
    matterId
      ? matters.find((m) => m.matter_id === matterId)?.name || "Unknown Matter"
      : "None",
  onEdit: (task: Task) => console.log("Edit task", task),
  onDelete: (task: Task) => console.log("Delete task", task),
  onStatusChange: (task: Task) => console.log("Status change", task),
  onTaskUpdated: (task: Task) => console.log("Task updated", task),
  onTaskDeleted: (taskId: string) => console.log("Task deleted", taskId),
};

// Base args for all stories
const baseArgs = {
  matters,
  isLoadingMatters: false,
  isProcessing: false,
  ...mockHandlers,
};

export const Default: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.default,
    ...baseArgs,
  },
};

export const Overdue: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.overdue,
    ...baseArgs,
  },
};

export const Complete: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.complete,
    ...baseArgs,
  },
};

export const HighPriority: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.highPriority,
    ...baseArgs,
  },
};

export const LowPriority: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.lowPriority,
    ...baseArgs,
  },
};

export const MediumPriority: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.mediumPriority,
    ...baseArgs,
  },
};

export const WithoutMatter: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.withoutMatter,
    ...baseArgs,
  },
};

export const WithoutDueDate: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.withoutDueDate,
    ...baseArgs,
  },
};

export const HideMatterColumn: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.default,
    ...baseArgs,
    hideMatterColumn: true,
  },
};

export const LoadingRow: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.default,
    ...baseArgs,
    isLoadingMatters: true,
  },
};
