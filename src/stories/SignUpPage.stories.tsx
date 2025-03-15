import { Meta, StoryObj } from "@storybook/react";
import SignUpPage from "@/app/(auth)/signup/page";

const meta: Meta<typeof SignUpPage> = {
  title: "Auth/SignUpPage",
  component: SignUpPage,
};

export default meta;
type Story = StoryObj<typeof SignUpPage>;

export const Default: Story = {};
