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

export function MattersHeader({ onStatusChange }: MattersHeaderProps) {
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
            <TabsList>
              <TabsTrigger value="all">All Matters</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
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
