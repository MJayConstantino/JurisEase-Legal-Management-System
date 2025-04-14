import type { Meta, StoryObj } from "@storybook/react";
import UserLoggedIn from "@/components/homepage/loggedIn/userLoggedIn";
import React, { useState, useEffect } from "react";

const mockUserData = {
  full_name: "Jane Doe",
  avatar_url:
    "https://png.pngtree.com/png-clipart/20240702/original/pngtree-office-girl-wearing-formal-dress-with-brown-long-hair-style-png-image_15465262.png",
};

const mockSuccessfulFetch = async () => {
  return mockUserData;
};

const mockLoadingFetch = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000000000)); 
  return mockUserData;
};

const meta: Meta<typeof UserLoggedIn> = {
  title: "Logged In/UserLoggedIn",
  component: UserLoggedIn,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="sb-decorator">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof UserLoggedIn>;

export const Default: Story = {
  decorators: [
    (Story) => {
      (global as any).fetchUserInfoAction = mockSuccessfulFetch;
      return <Story />;
    },
  ],
};

export const Loading: Story = {
  decorators: [
    (Story) => {
      (global as any).fetchUserInfoAction = mockLoadingFetch;
      return <Story />;
    },
  ],
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [
    (Story) => {
      (global as any).fetchUserInfoAction = mockSuccessfulFetch;
      return (
        <div className="dark bg-gray-900 min-h-screen">
          <Story />
        </div>
      );
    },
  ],
};

export const SignOutLoading: Story = {
  decorators: [
    () => {
      (global as any).fetchUserInfoAction = mockSuccessfulFetch;

      const MockUserLoggedInWithLoading = () => {
        const [UserLoggedInComponent, setLoaded] = useState<React.ReactNode>(null);

        useEffect(() => {
          import("@/components/homepage/loggedIn/userLoggedIn").then(({ default: Component }) => {
            setLoaded(
              <ComponentOverride
                Component={Component}
                mockUserData={mockUserData}
                signOutLoading={true}
                dashboardLoading={false}
              />
            );
          });
        }, []);

        return <>{UserLoggedInComponent}</>;
      };

      return <MockUserLoggedInWithLoading />;
    },
  ],
};

export const DashboardLoading: Story = {
  decorators: [
    () => {
      (global as any).fetchUserInfoAction = mockSuccessfulFetch;

      const MockUserLoggedInWithLoading = () => {
        const [UserLoggedInComponent, setLoaded] = useState<React.ReactNode>(null);

        useEffect(() => {
          import("@/components/homepage/loggedIn/userLoggedIn").then(({ default: Component }) => {
            setLoaded(
              <ComponentOverride
                Component={Component}
                mockUserData={mockUserData}
                signOutLoading={false}
                dashboardLoading={true}
              />
            );
          });
        }, []);

        return <>{UserLoggedInComponent}</>;
      };

      return <MockUserLoggedInWithLoading />;
    },
  ],
};

const ComponentOverride = ({
  Component,
  mockUserData,
  signOutLoading,
  dashboardLoading,
}: {
  Component: any;
  mockUserData: any;
  signOutLoading: boolean;
  dashboardLoading: boolean;
}) => {
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    (async () => {
      setUserData(mockUserData);
      setLoadingUser(false);
    })();
  }, [mockUserData]);

  return (
    <Component
      __storybookMockOverride={{
        signOutLoading,
        dashboardLoading,
        userData,
        loadingUser,
      }}
    />
  );
};
