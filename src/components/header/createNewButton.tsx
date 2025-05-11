"use client";

import React, { useEffect, useState } from "react";
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
import { TaskForm } from "@/components/tasks/taskForm";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";

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

  // Load matters for billing
  useEffect(() => {
    async function loadBillingData() {
      setIsLoading(true);
      try {
        const [mattersData] = await Promise.all([getMatters()]);
        setBillingMatters(mattersData);
      } catch (error) {
        console.error("Failed to load billing matters data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadBillingData();
  }, [setIsLoading, setBillingMatters]);

  useEffect(() => {
    async function loadAllMatters() {
      if (!isAddTaskOpen) return;
      console.log("Fetching all matters for task creation");
      setIsLoadingMatters(true);
      try {
        const result = await handleFetchMatters();
        if (result.error) {
          throw new Error(result.error);
        }
        console.log(
          `Fetched ${result.matters.length} matters for task creation`
        );
        setTaskMatters(result.matters);
      } catch (error) {
        console.error("Failed to load matters for task creation:", error);
      } finally {
        setIsLoadingMatters(false);
      }
    }

    loadAllMatters();
  }, [isAddTaskOpen]);

  const handleOpenAddTask = () => {
    setIsAddTaskOpen(true);
  };

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
        onSave={(newTask) => {
          if (onTaskCreated) onTaskCreated(newTask);
          setIsAddTaskOpen(false);
        }}
        onSaveAndCreateAnother={onTaskCreated}
        disableMatterSelect={!!matterId}
        matters={taskMatters}
        isLoadingMatters={isLoadingMatters}
        getMatterNameDisplay={(matterId) =>
          getMattersDisplayName(matterId, taskMatters)
        }
        matterId={matterId}
      />
    </>
  );
}

export default CreateNewButton;
