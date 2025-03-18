"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  FileText,
  DollarSign,
} from "lucide-react";

interface MatterTabsProps {
  children: React.ReactNode;
  matterId: string;
}

export function MatterTabs({ children, matterId }: MatterTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // In a real app, you might want to navigate to different URLs for each tab
    // router.push(`/matters/${matterId}/${value}`);
  };

  return (
    <Tabs
      defaultValue="dashboard"
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow">
        <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
          <TabsTrigger
            value="dashboard"
            className="flex items-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="flex items-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            <CheckSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Tasks</span>
          </TabsTrigger>
          <TabsTrigger
            value="calendar"
            className="flex items-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar</span>
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="flex items-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="flex items-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="p-6 m-0">
          {children}
        </TabsContent>

        <TabsContent value="tasks" className="p-6 m-0">
          <div className="h-[400px] flex items-center justify-center border border-dashed rounded-lg">
            <p className="text-muted-foreground">
              Tasks content will be displayed here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="p-6 m-0">
          <div className="h-[400px] flex items-center justify-center border border-dashed rounded-lg">
            <p className="text-muted-foreground">
              Calendar content will be displayed here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="p-6 m-0">
          <div className="h-[400px] flex items-center justify-center border border-dashed rounded-lg">
            <p className="text-muted-foreground">
              Documents content will be displayed here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="p-6 m-0">
          <div className="h-[400px] flex items-center justify-center border border-dashed rounded-lg">
            <p className="text-muted-foreground">
              Billing content will be displayed here
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
