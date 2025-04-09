import { Meta, Story } from "@storybook/react";
import UserProfile from "@/components/homepage/loggedIn/userProfile";
import UserProfileProps from "@/components/homepage/loggedIn/userProfile"

const mockUserData = {
  full_name: "John Doe",
  avatar_url: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
};

const meta: Meta<typeof UserProfile> = {
  title: "Logged In/UserProfile",
  component: UserProfile,
};

export default meta;

const Template: Story<UserProfileProps> = (args) => <UserProfile {...args} />;

export const LoadedUser = Template.bind({});
LoadedUser.args = {
  userData: mockUserData,
  loadingUser: false,
};

export const LoadingUser = Template.bind({});
LoadingUser.args = {
  userData: null,
  loadingUser: true,
};

export const NoAvatar = Template.bind({});
NoAvatar.args = {
  userData: {
    full_name: "Jane Doe",
    avatar_url: "",
  },
  loadingUser: false,
};
