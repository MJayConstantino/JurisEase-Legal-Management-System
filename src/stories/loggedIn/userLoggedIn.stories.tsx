import { Meta, Story } from "@storybook/react";
import UserLoggedIn from "@/components/homepage/loggedIn/userLoggedIn";
import { Loader2 } from "lucide-react";

const mockUserData = createMockUserData();

const meta: Meta<typeof UserLoggedIn> = {
  title: "Logged In/UserLoggedIn",
  component: UserLoggedIn,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

export default meta;

const Template: Story = (args) => <UserLoggedIn {...args} />;

export const Default = Template.bind({});
Default.args = {
  userData: mockUserData,
  loadingUser: false,
  dashboardLoading: false,
  signOutLoading: false,
};

export const LoadingUser = Template.bind({});
LoadingUser.args = {
  userData: null,
  loadingUser: true,
  dashboardLoading: false,
  signOutLoading: false,
};

export const SignOutLoading = Template.bind({});
SignOutLoading.args = {
  userData: mockUserData,
  loadingUser: false,
  signOutLoading: true,
  dashboardLoading: false,
};

export const DashboardLoading = Template.bind({});
DashboardLoading.args = {
  userData: mockUserData,
  loadingUser: false,
  signOutLoading: false,
  dashboardLoading: true,
};

export const BothLoading = Template.bind({});
BothLoading.args = {
  userData: mockUserData,
  loadingUser: true,
  signOutLoading: true,
  dashboardLoading: true,
};

export const NoUser = Template.bind({});
NoUser.args = {
  userData: null,
  loadingUser: false,
  signOutLoading: false,
  dashboardLoading: false,
};
