import { Meta, Story } from "@storybook/react";
import WelcomeHeader from "@/components/homepage/loggedIn/welcomeHeader";

const meta: Meta<typeof WelcomeHeader> = {
  title: "Logged In/WelcomeHeader",
  component: WelcomeHeader,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

export default meta;

export const Default: Story = () => (
  <div className="text-center mb-8">
    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D336B] dark:text-[#8A91D9] mb-2 transition-colors duration-200">
      Welcome to{" "}
      <span className="text-[#1B1E4B] dark:text-[#A5ABEF] font-black transition-colors duration-200">
        JurisEase
      </span>
    </h1>
    <div className="h-1 w-24 bg-[#2D336B] dark:bg-[#8A91D9] mx-auto my-4 rounded-full transition-colors duration-200"></div>
    <p className="text-gray-600 dark:text-gray-300 max-w-sm mx-auto transition-colors duration-200">
      Your comprehensive legal management platform designed for modern law
      practices.
    </p>
  </div>
);

export const LongTitle: Story = () => (
  <div className="text-center mb-8">
    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D336B] dark:text-[#8A91D9] mb-2 transition-colors duration-200">
      Welcome to{" "}
      <span className="text-[#1B1E4B] dark:text-[#A5ABEF] font-black transition-colors duration-200">
        JurisEase, Your Ultimate Solution for Legal Case Management, Document Organization, and Workflow Automation
      </span>
    </h1>
    <div className="h-1 w-24 bg-[#2D336B] dark:bg-[#8A91D9] mx-auto my-4 rounded-full transition-colors duration-200"></div>
    <p className="text-gray-600 dark:text-gray-300 max-w-sm mx-auto transition-colors duration-200">
      Your comprehensive legal management platform designed for modern law
      practices.
    </p>
  </div>
);

export const LongDescription: Story = () => (
  <div className="text-center mb-8">
    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D336B] dark:text-[#8A91D9] mb-2 transition-colors duration-200">
      Welcome to{" "}
      <span className="text-[#1B1E4B] dark:text-[#A5ABEF] font-black transition-colors duration-200">
        JurisEase, Your Ultimate Solution for Legal Case Management, Document Organization, and Workflow Automation
      </span>
    </h1>
    <div className="h-1 w-24 bg-[#2D336B] dark:bg-[#8A91D9] mx-auto my-4 rounded-full transition-colors duration-200"></div>
    <p className="text-gray-600 dark:text-gray-300 max-w-sm mx-auto transition-colors duration-200">
      JurisEase is a comprehensive legal management platform designed to make the lives of legal professionals easier by offering tools for efficient case management, document storage, legal task tracking, time management, and more. Whether you&apos;re a solo practitioner or a large law firm, JurisEase helps you organize your legal practice with ease, speed, and accuracy. Save time, reduce errors, and keep your workflow smooth with JurisEase, a platform built for modern law practices.
    </p>
  </div>
);
