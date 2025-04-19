import { Meta, StoryObj } from "@storybook/react";
import { mockMatter } from "./mockMatter";
import mockTasks from "./mockTask";
import { TaskRow } from "@/components/tasks/taskRow";

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

export const Default: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.default,
    matters,
  },
};

export const Overdue: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.overdue,
    matters,
  },
};

export const Complete: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.complete,
    matters,
  },
};

export const HighPriority: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.highPriority,
    matters,
  },
};

export const LowPriority: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.lowPriority,
    matters,
  },
};

export const MediumPriority: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.mediumPriority,
    matters,
  },
};

export const WithoutMatter: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.withoutMatter,
    matters,
  },
};

export const WithoutDueDate: StoryObj<typeof TaskRow> = {
  args: {
    task: mockTasks.withoutDueDate,
    matters,
  },
};
