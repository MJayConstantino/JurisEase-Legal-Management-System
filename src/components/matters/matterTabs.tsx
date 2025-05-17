"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LayoutDashboard, CheckSquare, DollarSign } from "lucide-react";
import { MatterTaskPage } from "./matterTabsPage/matterTaskPage";
import { MatterBillingPage } from "./matterTabsPage/matterBillingPage";

interface MatterTabsProps {
  children: React.ReactNode;
  matterId: string;
}

export function MatterTabs({ children, matterId }: MatterTabsProps) {
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);

  useEffect(() => {
    const saved =
      window.localStorage.getItem(`matter-${matterId}-tab`) || "dashboard";
    setActiveTab(saved);
  }, [matterId]);

  useEffect(() => {
    if (activeTab) {
      window.localStorage.setItem(`matter-${matterId}-tab`, activeTab);
    }
  }, [activeTab, matterId]);

  if (!activeTab) {
    return null;
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow">
        <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent dark:bg-transparent">
          <TabsTrigger
            value="dashboard"
            className="flex items-center gap-2 py-3 px-4 rounded-none 
              data-[state=active]:border-b-2 data-[state=active]:border-primary 
              data-[state=active]:bg-primary/5 dark:data-[state=active]:bg-primary/10
              data-[state=active]:text-primary dark:data-[state=active]:text-white
              dark:text-gray-300"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="flex items-center gap-2 py-3 px-4 rounded-none 
              data-[state=active]:border-b-2 data-[state=active]:border-primary 
              data-[state=active]:bg-primary/5 dark:data-[state=active]:bg-primary/10
              data-[state=active]:text-primary dark:data-[state=active]:text-white
              dark:text-gray-300"
          >
            <CheckSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Tasks</span>
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="flex items-center gap-2 py-3 px-4 rounded-none 
              data-[state=active]:border-b-2 data-[state=active]:border-primary 
              data-[state=active]:bg-primary/5 dark:data-[state=active]:bg-primary/10
              data-[state=active]:text-primary dark:data-[state=active]:text-white
              dark:text-gray-300"
          >
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="p-6 m-0">
          {children}
        </TabsContent>

        <TabsContent value="tasks" className="p-6 m-0">
          <MatterTaskPage initialTasks={[]} />
        </TabsContent>

        <TabsContent value="billing" className="p-6 m-0">
          <div className="max-h-[400px] flex items-start justify-center border border-dashed overflow-hidden rounded-lg">
            <MatterBillingPage />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
