"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LayoutDashboard, CheckSquare, DollarSign } from "lucide-react";
import { MatterTaskPage } from "./matterTabsPage/matterTaskPage";
import { MatterBillingPage } from "./matterTabsPage/matterBillingPage";
import { getCookie, setCookie } from "@/utils/cookies";

interface MatterTabsProps {
  children: React.ReactNode;
  matterId: string;
}

export function MatterTabs({ children, matterId }: MatterTabsProps) {
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
  const cookieName = `matter-${matterId}-tab`;

  useEffect(() => {
    // Get tab from cookie or use default
    const savedTab = getCookie(cookieName) || "dashboard";
    setActiveTab(savedTab);
  }, [matterId, cookieName]);

  useEffect(() => {
    if (activeTab) {
      // Save tab to cookie
      setCookie(cookieName, activeTab);
    }
  }, [activeTab, matterId, cookieName]);

  if (!activeTab) {
    return null;
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mb-10"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow">
        <TabsList className="w-full border-t-accent-foreground justify-start border-b dark:border-gray-700 p-0 h-auto rounded-b-none bg-gray-50 dark:bg-gray-800">
          <TabsTrigger
            value="dashboard"
            className="flex items-center gap-2 py-3 px-4 rounded-none rounded-tl-lg
              transition-all duration-200 ease-in-out
              data-[state=active]:border-dark-foreground/20
              hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
              data-[state=active]:bg-primary/5 dark:data-[state=active]:bg-gray-900
              data-[state=active]:text-primary dark:data-[state=active]:text-white
              dark:text-gray-300"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="flex items-center gap-2 py-3 px-4 rounded-none
              transition-all duration-200 ease-in-out
              hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
              data-[state=active]:bg-primary/5 dark:data-[state=active]:bg-gray-900
              data-[state=active]:text-primary dark:data-[state=active]:text-white
              dark:text-gray-300"
          >
            <CheckSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Tasks</span>
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="flex items-center gap-2 py-3 px-4 rounded-none rounded-tr-lg
              transition-all duration-200 ease-in-out
              hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
              data-[state=active]:bg-primary/5 dark:data-[state=active]:bg-gray-900
              data-[state=active]:text-primary dark:data-[state=active]:text-white
              dark:text-gray-300"
          >
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="dashboard"
          className="p-6 m-0 animate-in fade-in-50 duration-300"
        >
          {children}
        </TabsContent>

        <TabsContent
          value="tasks"
          className="p-6 m-0 animate-in fade-in-50 duration-300"
        >
          <MatterTaskPage initialTasks={[]} />
        </TabsContent>

        <TabsContent
          value="billing"
          className="p-6 m-0 animate-in fade-in-50 duration-300"
        >
          <MatterBillingPage />
        </TabsContent>
      </div>
    </Tabs>
  );
}
