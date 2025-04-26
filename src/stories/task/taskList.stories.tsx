import { Meta, StoryObj } from "@storybook/react";
import { TaskList } from "@/components/tasks/taskList";

export default {
  title: "Tasks/TaskList",
  component: TaskList,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;


export const AllTasks: StoryObj<typeof TaskList> = {
  args: {
    initialTasks: [],
    matterId: undefined,
  },
};

export const DarkMode: StoryObj<typeof TaskList> = {
  args: {
    initialTasks: [],
  },
  render: (args) => (
    <div className="dark">
      <TaskList {...args} />
    </div>
  ),
};
