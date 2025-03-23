// import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { TaskForm } from "@/components/tasks/task-form";
// import type { Task } from "@/app/(dashboard)/types";

export default {
  title: "Task/TaskForm",
  component: TaskForm,
  argTypes: {},
} as Meta;

type Story = StoryObj<typeof TaskForm>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: (open) => console.log("Dialog open state:", open),
    onSave: (task) => console.log("Task saved:", task),
    onSaveAndCreateAnother: (task) => console.log("Task saved and creating another:", task),
  },
};

export const WithInitialData: Story = {
  args: {
    open: true,
    initialData: {
      name: "Update documentation",
      description: "Revise the API documentation for the new release",
      priority: "high",
      status: "pending",
      dueDate: new Date()
    },
    onOpenChange: (open) => console.log("Dialog open state:", open),
    onSave: (task) => console.log("Task saved:", task),
    onSaveAndCreateAnother: (task) => console.log("Task saved and creating another:", task),
  },
};

export const OpenDialog: Story = {
  args: {
    open: true,
    onOpenChange: (open) => console.log("Dialog open state:", open),
    onSave: (task) => console.log("Task saved:", task),
    onSaveAndCreateAnother: (task) => console.log("Task saved and creating another:", task),
  },
};
