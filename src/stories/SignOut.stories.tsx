import { Meta, StoryObj } from "@storybook/react";
import { Signout } from "../components/header/signout";
import { within, userEvent } from "@storybook/testing-library";
import { toast, Toaster } from "sonner"; // Import Toaster
import { action } from "@storybook/addon-actions";

// Mock functions for sign-out scenarios
const mockSignOutSuccess = async () => {
  toast.success("Sign out Success!"); // Trigger success toast
  action("Sign Out Success")(); // Log to Storybook actions
};

const mockSignOutError = async () => {
  toast.error("Error Signing Out"); // Trigger error toast
  action("Sign Out Error")(); // Log to Storybook actions
};

// Define meta for Storybook
const meta: Meta<typeof Signout> = {
  title: "Header/Signout",
  component: Signout,
  parameters: {
    actions: { argTypesRegex: "^on.*" }, // Automatically capture "on*" props in Storybook actions
  },
  decorators: [
    (Story) => (
      <>
        <Toaster position="top-center" /> {/* Add Toaster to render toasts */}
        <Story />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Signout>;

// Default story (idle state)
export const Default: Story = {
  args: {
    signOutfn: mockSignOutSuccess,
  },
};

// Story for success scenario
export const Success: Story = {
  args: {
    signOutfn: mockSignOutSuccess, // Mock function for success
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /sign out/i });
    await userEvent.click(button); // Simulate success button click
    action("Success Button Clicked")(); // Log success click
  },
};

// Story for error scenario
export const Error: Story = {
  args: {
    signOutfn: mockSignOutError, // Mock function for error
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /sign out/i });
    await userEvent.click(button); // Simulate error button click
    action("Error Button Clicked")(); // Log error click
  },
};
