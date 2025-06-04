import type { Meta, StoryObj } from "@storybook/react";
import { TaskForm } from "@/components/tasks/taskForm";
import { userEvent } from "@storybook/test";
import { Toaster } from "@/components/ui/sonner";
import { Matter } from "@/types/matter.type";
import { Task } from "@/types/task.type";

const meta: Meta<typeof TaskForm> = {
  title: "Tasks/TaskForm",
  component: TaskForm,
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position="top-right" />
      </>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TaskForm>;

const mockMatters: Matter[] = [
  {
    matter_id: "1",
    name: "Smith v. Jones",
    description: "Personal injury case",
    status: "pending",
    created_at: new Date(),
    client: "Jay Jones",
    case_number: "CV-001",
  },
  {
    matter_id: "2",
    name: "Doe Corporation",
    description: "Corporate merger",
    status: "pending",
    created_at: new Date(),
    client: "John Doe",
    case_number: "CV-002",
  },
];

const mockTask: Task = {
  task_id: "task-1",
  name: "Draft motion to dismiss",
  description: "Prepare initial draft of the motion to dismiss",
  due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  priority: "high",
  status: "in-progress",
  matter_id: "1",
  created_at: new Date(),
};

// Mock functions
const mockOnSave = async (task: Task) => {
  console.log("Task saved:", task);
  return Promise.resolve();
};

const mockOnSaveAndCreateAnother = async (task: Task) => {
  console.log("Task saved and create another:", task);
  return Promise.resolve();
};

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: (open) => console.log("Open state:", open),
    onSave: mockOnSave,
    onSaveAndCreateAnother: mockOnSaveAndCreateAnother,
    matters: mockMatters,
  },
};

export const EditTask: Story = {
  args: {
    open: true,
    onOpenChange: (open) => console.log("Open state:", open),
    onSave: mockOnSave,
    onSaveAndCreateAnother: mockOnSaveAndCreateAnother,
    initialTask: mockTask,
    matters: mockMatters,
  },
};

export const WithMatterDisabled: Story = {
  args: {
    open: true,
    onOpenChange: (open) => console.log("Open state:", open),
    onSave: mockOnSave,
    onSaveAndCreateAnother: mockOnSaveAndCreateAnother,
    initialTask: mockTask,
    matters: mockMatters,
    disableMatterSelect: true,
  },
};

export const AddNewTaskPlay: Story = {
  args: {
    open: true,
    matters: mockMatters,
    onSave: (task) => console.log("Task saved:", task),
    onOpenChange: (open) => console.log("Dialog open state:", open),
  },
  play: async ({ step }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Enter task name", async () => {
      const nameInput =
        document.querySelector('input[placeholder="Task name"]') ||
        document.querySelector('input[id="task-name"]');

      if (nameInput) {
        await userEvent.type(nameInput, "Prepare deposition questions", {
          delay: 100,
        });
        await userEvent.tab();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Enter task description", async () => {
      const descriptionInput =
        document.querySelector('textarea[placeholder="Optional"]') ||
        document.querySelector('textarea[id="task-description"]');

      if (descriptionInput) {
        await userEvent.type(
          descriptionInput,
          "Questions for witness testimony",
          { delay: 100 }
        );
        await userEvent.tab();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Select priority", async () => {
      const prioritySelect =
        document.querySelector('select[id="priority"]') ||
        document.querySelector('[role="combobox"][name="priority"]');

      if (prioritySelect) {
        await userEvent.selectOptions(prioritySelect, "medium"); // Select "medium" priority
        await userEvent.tab();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Select a matter", async () => {
      const matterSelect =
        document.querySelector('select[id="matter"]') ||
        document.querySelector('[role="combobox"][name="assigned matter"]');

      if (matterSelect) {
        await userEvent.selectOptions(matterSelect, mockMatters[1].matter_id); // Select the second matter
        await userEvent.tab();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Set due date", async () => {
      const dueDateInput =
        document.querySelector('input[id="due-date"]') ||
        document.querySelector('input[aria-label="Due date"]');

      if (dueDateInput) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 14);
        const dateString = futureDate.toISOString().split("T")[0];

        await userEvent.clear(dueDateInput);
        await userEvent.type(dueDateInput, dateString, { delay: 100 });
        await userEvent.tab();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Submit the form", async () => {
      const submitButton =
        document.querySelector('button[type="submit"]') ||
        document.querySelector('button[aria-label="Save task"]');

      if (submitButton) {
        await userEvent.click(submitButton);
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));
  },
};

export const EditTaskFormPlay: Story = {
  args: {
    open: true,
    initialTask: mockTask,
    matters: mockMatters,
    onSave: (task) => console.log("Task saved:", task),
    onOpenChange: (open) => console.log("Dialog open state:", open),
  },
  play: async ({ step }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Edit task name", async () => {
      const nameInput =
        document.querySelector('input[id="task-name"]') ||
        document.querySelector('input[placeholder="Task name"]');

      if (nameInput) {
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, "Edited Task Name", { delay: 100 });
        await userEvent.tab();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Edit task description", async () => {
      const descriptionInput =
        document.querySelector('textarea[id="task-description"]') ||
        document.querySelector('textarea[placeholder="Optional"]');

      if (descriptionInput) {
        await userEvent.clear(descriptionInput);
        await userEvent.type(
          descriptionInput,
          "Edited description for the task.",
          { delay: 100 }
        );
        await userEvent.tab();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Edit priority", async () => {
      const prioritySelect =
        document.querySelector('select[id="priority"]') ||
        document.querySelector('[role="combobox"][name="priority"]');

      if (prioritySelect) {
        await userEvent.click(prioritySelect);
        await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}", {
          delay: 300,
        });
        await userEvent.tab();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Edit matter", async () => {
      const matterSelect =
        document.querySelector('select[id="matter"]') ||
        document.querySelector('[role="combobox"][name="assigned matter"]');

      if (matterSelect) {
        await userEvent.click(matterSelect);
        await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}", {
          delay: 300,
        });
        await userEvent.tab();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Edit due date", async () => {
      const dueDateInput =
        document.querySelector('input[id="due-date"]') ||
        document.querySelector('input[aria-label="Due date"]');

      if (dueDateInput) {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 21);
        const dateString = newDate.toISOString().split("T")[0];

        await userEvent.clear(dueDateInput);
        await userEvent.type(dueDateInput, dateString, { delay: 100 });
        await userEvent.tab();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("Submit the form", async () => {
      const submitButton =
        document.querySelector('button[type="submit"]') ||
        document.querySelector('button[aria-label="Save task"]');

      if (submitButton) {
        await userEvent.click(submitButton);
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));
  },
};
