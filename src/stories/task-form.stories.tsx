import type { Meta, StoryObj } from "@storybook/react";
import { TaskForm } from "@/components/tasks/task-form";
import { useState } from "react";
import type { Task } from "@/components/tasks/task-table";

const meta: Meta<typeof TaskForm> = {
  title: "Tasks/TaskForm",
  component: TaskForm,
  tags: ["autodocs"],
  argTypes: {
    onSave: { action: "saved" },
    onSaveAndCreateAnother: { action: "saved and create another" },
    onOpenChange: { action: "dialog toggled" },
  },
};

export default meta;
type Story = StoryObj<typeof TaskForm>;

const TaskFormWrapper = (args: any) => {
  const [open, setOpen] = useState(args.open || false);
  return <TaskForm {...args} open={open} onOpenChange={setOpen} />;
};

export const Default: Story = {
  render: (args) => <TaskFormWrapper {...args} />,
  args: {
    open: true,
    initialData: {},
  },
};

export const PrefilledForm: Story = {
  render: (args) => <TaskFormWrapper {...args} />,
  args: {
    open: true,
    initialData: {
      name: "Design Homepage",
      priority: "high",
      status: "pending",
      dueDate: new Date(),
    } as Partial<Task>,
  },
};
