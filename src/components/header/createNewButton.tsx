"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddMatterDialog } from "@/components/matters/addMatterDialog";
import { BillingsAddDialog } from "../billings/billingsAddDialog";
import { BillingStates } from "../billings/billingsStates";
import { BillingsActionHandlers } from "@/action-handlers/billings";
import { getMatters } from "@/actions/matters";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { Plus, FileText, Receipt, ClipboardList } from "lucide-react";
import { handleFetchMatters } from "@/action-handlers/matters";
import { TaskForm } from "../tasks/taskForm"; // Add this import
import { getMattersDisplayName } from "@/utils/getMattersDisplayName"; // Add this import if needed

interface CreateNewButtonProps {
  defaultOpen?: boolean;
  matters?: Matter[];
  matterId?: string;
  onTaskCreated?: (newTask: Task) => void;
}

export function CreateNewButton({
  defaultOpen = false,
  matterId,
  onTaskCreated,
}: CreateNewButtonProps) {
  const [isAddMatterOpen, setIsAddMatterOpen] = useState(false);
  const {
    matters: billingMatters,
    setIsLoading,
    setMatters: setBillingMatters,
    isNewBillDialogOpen,
    setIsNewBillDialogOpen,
  } = BillingStates();
  const { addBill } = BillingsActionHandlers();

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isLoadingMatters, setIsLoadingMatters] = useState(false);
  const [taskMatters, setTaskMatters] = useState<Matter[]>([]);

  useEffect(() => {
    const loadBillingData = async () => {
      setIsLoading(true);
      try {
        const mattersData = await getMatters();
        setBillingMatters(mattersData);
      } catch (error) {
        console.error("Failed to load billing matters data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadBillingData();
  }, [setIsLoading, setBillingMatters]);

  const loadMattersForTasks = useCallback(async () => {
    if (taskMatters.length > 0) return;

    setIsLoadingMatters(true);
    try {
      const result = await handleFetchMatters();
      if (result.error) {
        throw new Error(result.error);
      }
      setTaskMatters(result.matters);
    } catch (error) {
      console.error("Failed to load matters for task creation:", error);
    } finally {
      setIsLoadingMatters(false);
    }
  }, [taskMatters.length]);

  const handleOpenAddTask = useCallback(() => {
    setIsAddTaskOpen(true);
    loadMattersForTasks();
  }, [loadMattersForTasks]);

  const handleTaskSaved = useCallback(
    (newTask: Task) => {
      if (onTaskCreated) {
        onTaskCreated(newTask);
      }
      setIsAddTaskOpen(false);
    },
    [onTaskCreated]
  );

  const handleSaveAndCreateAnother = useCallback(
    (newTask: Task) => {
      if (onTaskCreated) {
        onTaskCreated(newTask);
      }
    },
    [onTaskCreated]
  );

  return (
    <>
      <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-[#1B1E4B] dark:bg-gray-700 text-white hover:bg-[#1B1E4B]/50 border-2 border-white dark:hover:bg-gray-600 gap-2 hidden md:flex">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline">Create New</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-gray-800" align="end">
          <DropdownMenuItem onClick={() => setIsAddMatterOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            New Matter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenAddTask}>
            <ClipboardList className="h-4 w-4 mr-2" />
            New Task
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsNewBillDialogOpen(true)}>
            <Receipt className="h-4 w-4 mr-2" />
            New Bill
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddMatterDialog
        open={isAddMatterOpen}
        onOpenChange={setIsAddMatterOpen}
      />
      <BillingsAddDialog
        open={isNewBillDialogOpen}
        onOpenChange={setIsNewBillDialogOpen}
        onSave={addBill}
        matters={billingMatters}
        matterBillingMatterId={""}
      />

      <TaskForm
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        onSave={handleTaskSaved}
        matters={taskMatters}
        isLoadingMatters={isLoadingMatters}
        matterId={matterId}
        getMatterNameDisplay={(matterId) =>
          getMattersDisplayName(matterId, taskMatters)
        }
        disableMatterSelect={!!matterId}
        onSaveAndCreateAnother={handleSaveAndCreateAnother}
      />
    </>
  );
}

export default CreateNewButton;
