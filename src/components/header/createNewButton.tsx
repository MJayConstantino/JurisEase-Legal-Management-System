"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddMatterDialog } from "@/components/matters/addMatterDialog";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { AddTaskFormDialog } from "../addTaskDialog";
import { getMattersDisplayNameByMatterId } from "@/utils/getMattersDisplayName";

interface CreateNewButtonProps {
  defaultOpen?: boolean;
  matters?: Matter[];
  matterId?: string;
  onTaskCreated?: (newTask: Task) => void;
}

export function CreateNewButton({
  defaultOpen = false,
  matters: initialMatters = [],
  matterId,
  onTaskCreated,
}: CreateNewButtonProps) {
  const [isAddMatterOpen, setIsAddMatterOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [matters] = useState<Matter[]>(initialMatters);
  const [isLoadingMatters] = useState(false);

  return (
    <>
      <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-[#1B1E4B] dark:bg-gray-700 text-white hover:bg-[#2D336B]/90 dark:hover:bg-gray-600 gap-2 hidden md:flex">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline">Create New</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsAddMatterOpen(true)}>
            New Matter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsAddTaskOpen(true)}>
            New Task
          </DropdownMenuItem>
          <DropdownMenuItem>New Bill</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddMatterDialog
        open={isAddMatterOpen}
        onOpenChange={setIsAddMatterOpen}
      />

      <AddTaskFormDialog
        onSave={onTaskCreated}
        onOpenChange={setIsAddTaskOpen}
        matters={matters}
        matterId={matterId}
        isLoadingMatters={isLoadingMatters}
        open={isAddTaskOpen}
        getMatterNameDisplay={(id) =>
          getMattersDisplayNameByMatterId(id, matters)
        }
      />
    </>
  );
}

export default CreateNewButton;
