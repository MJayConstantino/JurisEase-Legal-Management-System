import { Meta, StoryObj } from "@storybook/react";
import { TaskList } from "@/components/tasks/taskList";
import mockTasks from "./mockTask";
import userEvent from "@testing-library/user-event";
import { within } from "@storybook/testing-library";

const meta: Meta<typeof TaskList> = {
  title: "Tasks/TaskList",
  component: TaskList,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [],
};

export default meta;

type Story = StoryObj<typeof TaskList>;

const mockHandlers = {
  onTaskCreated: (task: any) => console.log("Task created:", task),
};

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

export const Default: Story = {
  args: {
    initialTasks: allTasks,
    ...mockHandlers,
  },
};

export const OverdueTasks: Story = {
  args: {
    initialTasks: [mockTasks.overdue],
    ...mockHandlers,
  },
};

export const CompletedTasks: Story = {
  args: {
    initialTasks: [mockTasks.complete],
    ...mockHandlers,
  },
};

export const HighPriorityTasks: Story = {
  args: {
    initialTasks: [mockTasks.highPriority],
    ...mockHandlers,
  },
};

export const GridView: Story = {
  args: {
    initialTasks: allTasks,
    ...mockHandlers,
  },
  render: (args) => <TaskList {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Simulates clicking the grid view button using the play function.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Adjust the selector below to match your grid view button
    const gridViewButton = await canvas.getByRole("button", { name: /Grid/i });
    await userEvent.click(gridViewButton);
  },
};

export const GridViewInDarkMode: Story = {
  args: {
    initialTasks: allTasks,
    ...mockHandlers,
  },
  render: (args) => (
    <div className="dark bg-gray-900 p-4">
      <TaskList {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Simulates clicking the grid view button using the play function.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Adjust the selector below to match your grid view button
    const gridViewButton = await canvas.getByRole("button", { name: /Grid/i });
    await userEvent.click(gridViewButton);
  },
};

export const DarkMode: Story = {
  args: {
    initialTasks: allTasks,
    ...mockHandlers,
  },
  render: (args) => (
    <div className="dark bg-gray-900 p-4">
      <TaskList {...args} />
    </div>
  ),
};

export const FilterStatusCycle: Story = {
  args: {
    initialTasks: allTasks,
    ...mockHandlers,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Simulates clicking through the In-Progress, Overdue, and Completed status filter buttons every 3 seconds.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const inProgressButton = canvas.getByText("In-Progress");
    const overdueButton = canvas.getByText("Overdue");
    const completedButton = canvas.getByText("Completed");

    await userEvent.click(inProgressButton);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await userEvent.click(overdueButton);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await userEvent.click(completedButton);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const allButton = canvas.getByText("All Tasks");
    await userEvent.click(allButton);
  },
};
