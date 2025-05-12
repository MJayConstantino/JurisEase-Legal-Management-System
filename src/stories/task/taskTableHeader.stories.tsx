import { Meta, StoryObj } from "@storybook/react";
import { TaskTableHeader } from "@/components/tasks/taskTableHeader";
import { Table } from "@/components/ui/table";

const meta: Meta<typeof TaskTableHeader> = {
  title: "Tasks/TaskTableHeader",
  component: TaskTableHeader,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="border rounded-md w-full max-w-4xl overflow-hidden">
        <Table>
          <Story />
        </Table>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TaskTableHeader>;

// Mock handler for sort function
const handleSort = (field: any) => {
  console.log(`Sorting by ${field}`);
};

export const Default: Story = {
  args: {
    sortField: "name",
    sortDirection: "asc",
    onSort: handleSort,
    hideMatterColumn: false,
  },
};

export const SortByDueDate: Story = {
  args: {
    sortField: "due_date",
    sortDirection: "asc",
    onSort: handleSort,
    hideMatterColumn: false,
  },
};

export const SortByPriority: Story = {
  args: {
    sortField: "priority",
    sortDirection: "desc",
    onSort: handleSort,
    hideMatterColumn: false,
  },
};

export const SortByMatter: Story = {
  args: {
    sortField: "matter_id",
    sortDirection: "asc",
    onSort: handleSort,
    hideMatterColumn: false,
  },
};

export const HiddenMatterColumn: Story = {
  args: {
    sortField: "name",
    sortDirection: "asc",
    onSort: handleSort,
    hideMatterColumn: true,
  },
  name: "Without Matter Column",
};

// Example showing desktop and mobile views together
export const ResponsiveLayout: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "100%",
          },
        },
      },
    },
  },
  args: {
    sortField: "name",
    sortDirection: "asc",
    onSort: handleSort,
    hideMatterColumn: false,
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Desktop View</h3>
          <div className="border rounded-md w-full overflow-hidden">
            <Table>
              <Story />
            </Table>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Mobile View</h3>
          <div className="border rounded-md w-[375px] overflow-hidden">
            <Table>
              <Story />
            </Table>
          </div>
        </div>
      </div>
    ),
  ],
};
