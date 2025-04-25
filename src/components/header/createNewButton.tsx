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
import { TaskForm } from "@/components/tasks/taskForm";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";

interface CreateNewButtonProps {
  defaultOpen?: boolean;
  matters: Matter[]; 
  onTaskCreated?: (newTask: Task) => void; 
}

export function CreateNewButton({
  defaultOpen = false,
  matters = [],
  onTaskCreated,
}: CreateNewButtonProps) {
  const [isAddMatterOpen, setIsAddMatterOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleTaskCreated = (newTask: Task) => {
    if (onTaskCreated) {
      onTaskCreated(newTask); 
    }
    setIsAddTaskOpen(false); 
  };

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

      <TaskForm
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        onSave={handleTaskCreated}
        onSaveAndCreateAnother={handleTaskCreated}
        disableMatterSelect={false}
        initialTask={undefined}
        matters={matters}
        isLoadingMatters={false}
        getMatterNameDisplay={(matterId) =>
          matters.find((matter) => matter.matter_id === matterId)?.name || "Unknown"
        }
      />
    </>
  );
}

export default CreateNewButton;
