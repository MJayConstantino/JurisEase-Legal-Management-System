import { Meta, StoryObj, StoryContext, Decorator } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";

import DesktopSearch from "@/components/header/globalSearch/desktopSearch";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { expect } from "@storybook/jest";

const withTheme: Decorator = (Story, context: StoryContext) => {
  return (
    <ThemeProvider defaultTheme={context.globals.theme ?? "light"}>
      <Story />
    </ThemeProvider>
  );
};

export default {
  title: "globalSearch/DesktopSearch",
  component: DesktopSearch,
  decorators: [withTheme],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1B1E4B" },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile (375px)",
          styles: {
            width: "375px",
            height: "812px",
          },
        },
        desktop: {
          name: "Desktop (1280px)",
          styles: {
            width: "1280px",
            height: "800px",
          },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: ["light", "dark"],
      },
    },
  },
} as Meta<typeof DesktopSearch>;

const Template: StoryObj<typeof DesktopSearch> = {
  render: () => <DesktopSearch />,
};

export const LightMode: StoryObj<typeof DesktopSearch> = {
  ...Template,
  parameters: {
    backgrounds: { default: "light" },
    globals: { theme: "light" },
  },
};

export const DarkMode: StoryObj<typeof DesktopSearch> = {
  ...Template,
  parameters: {
    backgrounds: { default: "dark" },
    globals: { theme: "dark" },
  },
};

export const MobileViewClicked: StoryObj<typeof DesktopSearch> = {
  ...Template,
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
  play: async ({ canvasElement }) => {
    canvasElement.style.width = "375px";
    canvasElement.style.height = "812px";

    const canvas = within(canvasElement);

    const mobileSearchButton = canvas.getByRole("button", { name: /search/i });

    await userEvent.click(mobileSearchButton);
    await waitFor(() =>
      expect(document.querySelector('[role="dialog"]')).toBeInTheDocument()
    );
    const searchInputBox = document.querySelector(
      '[aria-label="DialogBoxSearch"]'
    ) as HTMLInputElement;

    await userEvent.click(searchInputBox);
    // await userEvent.clear(searchInputBox)
    // await userEvent.type(searchInputBox, 'Jose')

    // await waitFor(() => expect(searchInputBox).toHaveValue('Jose'))
  },
};

export const DesktopViewClicked: StoryObj<typeof DesktopSearch> = {
  ...Template,
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByLabelText("SearchInput");

    await userEvent.click(searchInput);
    await waitFor(() =>
      expect(document.querySelector('[role="dialog"]')).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        document.querySelector('[aria-label="DialogBoxSearch"]')
      ).toBeInTheDocument()
    );
    // use query selecors
    const searchInputBox = document.querySelector(
      '[aria-label="DialogBoxSearch"]'
    ) as HTMLInputElement;

    await userEvent.click(searchInputBox);
    // await userEvent.clear(searchInputBox)
    // await userEvent.type(searchInputBox, 'Jose')

    // await waitFor(() => expect(searchInputBox).toHaveValue('Jose'))
  },
};
