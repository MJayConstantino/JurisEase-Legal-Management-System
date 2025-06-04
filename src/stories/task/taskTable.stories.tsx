import { Meta, StoryObj } from "@storybook/react";
import { TaskTable } from "@/components/tasks/taskTable";
import { mockMatter } from "./mockMatter";
import mockTasks from "./mockTask";
import { userEvent, within } from "@storybook/testing-library";

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
export const LoadingTable: Story = {
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


export const AllSortingOptions: Story = {
  args: {
    tasks: [
      mockTasks.default,
      mockTasks.highPriority,
      mockTasks.overdue,
      mockTasks.complete,
      mockTasks.withoutDueDate,
      mockTasks.withoutMatter,
    ],
    matters: matters,
    isLoadingMatters: false,
    ...mockHandlers,
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all sorting options by cycling through each column header.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const taskNameSortButton = canvas.getByRole("button", {
      name: (text) => text.includes("Task Name"),
    });
    
    const prioritySortButton = canvas.getByRole("button", {
      name: (text) => text.includes("Priority"),
    });
    
    const dueDateSortButton = canvas.getByRole("button", {
      name: (text) => text.includes("Due Date"),
    });
    
    const matterSortButton = canvas.getByRole("button", {
      name: (text) => text.includes("Matter"),
    });
    
    // Task Name sorting
    await userEvent.click(taskNameSortButton);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await userEvent.click(taskNameSortButton); // Toggle to descending order
    
    // Matter sorting
    await userEvent.click(matterSortButton);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await userEvent.click(matterSortButton); // Toggle to descending order

    // Priority sorting
    await userEvent.click(prioritySortButton);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await userEvent.click(prioritySortButton); // Toggle to descending order
    
    // Due Date sorting
    await userEvent.click(dueDateSortButton);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await userEvent.click(dueDateSortButton); // Toggle to descending order
    
    console.log("Cycled through all column sorting options");
  },
};