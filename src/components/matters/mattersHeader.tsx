"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddMatterDialog } from "./addMatterDialog";

interface MattersHeaderProps {
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
}

export function MattersHeader({
  onStatusChange,
  onSortChange,
}: MattersHeaderProps) {
  const [isAddMatterOpen, setIsAddMatterOpen] = useState(false);

  return (
    <div className="p-4 border-b">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Button onClick={() => setIsAddMatterOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Matter
          </Button>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Tabs
            defaultValue="all"
            className="w-full md:w-auto"
            onValueChange={onStatusChange}
          >
            <TabsList className="bg-gray-50 dark:bg-gray-800/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 
                  data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground
                  data-[state=active]:shadow-sm data-[state=active]:font-medium
                  dark:text-gray-300 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-primary"
              >
                All Matters
              </TabsTrigger>
              <TabsTrigger
                value="open"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 
                  data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400
                  data-[state=active]:shadow-sm data-[state=active]:font-medium
                  dark:text-gray-300 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-green-500"
              >
                Open
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 
                  data-[state=active]:text-yellow-600 dark:data-[state=active]:text-yellow-400
                  data-[state=active]:shadow-sm data-[state=active]:font-medium
                  dark:text-gray-300 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-yellow-500"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="closed"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 
                  data-[state=active]:text-gray-600 dark:data-[state=active]:text-gray-300
                  data-[state=active]:shadow-sm data-[state=active]:font-medium
                  dark:text-gray-300 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-gray-500"
              >
                Closed
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <AddMatterDialog
        open={isAddMatterOpen}
        onOpenChange={setIsAddMatterOpen}
      />
    </div>
  );
}
