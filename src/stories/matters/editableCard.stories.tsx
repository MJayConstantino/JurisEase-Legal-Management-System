import type { Meta, StoryObj } from "@storybook/react";
import { EditableCard } from "@/components/matters/editableCard";
import { userEvent, within } from "@storybook/testing-library";
import { action } from "@storybook/addon-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

// Helper functions
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const meta: Meta<typeof EditableCard> = {
  title: "Matters/EditableCard",
  component: EditableCard,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
      },
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen w-screen p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EditableCard>;

// Base template for form fields
const BaseFormTemplate = (isEditing: boolean) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="matter-name">Matter Name *</Label>
      <Input
        id="matter-name"
        defaultValue="Smith vs. Johnson"
        disabled={!isEditing}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="case-number">Case Number</Label>
      <Input id="case-number" defaultValue="2024-001" disabled={!isEditing} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        defaultValue="Legal proceedings regarding..."
        disabled={!isEditing}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="status">Status</Label>
      <Select disabled={!isEditing} defaultValue="active">
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    title: "Matter Details",
    children: BaseFormTemplate,
    onSave: action("onSave"),
    onCancel: action("onCancel"),
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
    title: "Dark Mode Matter Details",
  },
  parameters: {
    themes: { current: "dark" },
  },
};

export const MobileView: Story = {
  args: {
    ...Default.args,
    title: "Mobile Matter Details",
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Enter edit mode with delay
    await delay(1000);
    const editButton = await canvas.findByRole("button", { name: /edit/i });
    await userEvent.click(editButton);

    // Fill in form fields with delays
    const matterNameInput = canvas.getByLabelText(/matter name/i);
    await delay(1000);
    await userEvent.clear(matterNameInput);
    await delay(500);
    await userEvent.type(matterNameInput, "Mobile Test Case", { delay: 100 });

    // Save changes with delay
    await delay(1000);
    const saveButton = await canvas.findByRole("button", { name: /check/i });
    await userEvent.click(saveButton);
  },
};

export const WithValidation: Story = {
  args: {
    ...Default.args,
    title: "Validation Example",
    onSave: async () => {
      await delay(1000);
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Enter edit mode
    await delay(1000);
    const editButton = await canvas.findByRole("button", { name: /edit/i });
    await userEvent.click(editButton);

    // Clear required field
    const matterNameInput = canvas.getByLabelText(/matter name/i);
    await delay(500);
    await userEvent.clear(matterNameInput);

    // Try to save (should show error)
    await delay(1000);
    const saveButton = await canvas.findByRole("button", { name: /check/i });
    await userEvent.click(saveButton);
  },
};
