import type { Meta, StoryObj } from "@storybook/react";
import UserProfile from "@/components/loggedIn/userProfile";

const mockUserData = {
  full_name: "John Doe",
  avatar_url: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
};

const meta: Meta<typeof UserProfile> = {
  title: "Logged In/UserProfile",
  component: UserProfile,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const LoadedUser: Story = {
  args: {
    userData: mockUserData,
    loadingUser: false,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const LoadingUser: Story = {
  args: {
    userData: null,
    loadingUser: true,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const NoAvatar: Story = {
  args: {
    userData: {
      full_name: "Jane Doe",
      avatar_url: "",
    },
    loadingUser: false,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const DarkMode: Story = {
  args: {
    userData: mockUserData,
    loadingUser: false,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

export const DarkModeLoading: Story = {
  args: {
    userData: null,
    loadingUser: true,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
