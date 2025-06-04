import { Meta, StoryObj } from "@storybook/react";
import { TaskCard } from "@/components/tasks/taskCard";
import { mockMatter } from "./mockMatter";
import mockTasks from "./mockTask";

export default {
  title: "Tasks/TaskCard",
  component: TaskCard,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;

const matters = [mockMatter];

export const Default: StoryObj<typeof TaskCard> = {
  args: {
    task: mockTasks.default,
    matters,
  },
};

export const Overdue: StoryObj<typeof TaskCard> = {
  args: {
    task: mockTasks.overdue,
    matters,
  },
};

export const Complete: StoryObj<typeof TaskCard> = {
  args: {
    task: mockTasks.complete,
    matters,
  },
};

export const HighPriority: StoryObj<typeof TaskCard> = {
  args: {
    task: mockTasks.highPriority,
    matters,
  },
};

export const LowPriority: StoryObj<typeof TaskCard> = {
  args: {
    task: mockTasks.lowPriority,
    matters,
  },
};

export const MediumPriority: StoryObj<typeof TaskCard> = {
  args: {
    task: mockTasks.mediumPriority,
    matters,
  },
};

export const LongDescription: StoryObj<typeof TaskCard> = {
  args: {
    task: mockTasks.longDescription,
    matters,
  },
};

export const WithoutMatter: StoryObj<typeof TaskCard> = {
  args: {
    task: mockTasks.withoutMatter,
    matters,
  },
};

export const WithoutDueDate: StoryObj<typeof TaskCard> = {
  args: {
    task: mockTasks.withoutDueDate,
    matters,
  },
};
