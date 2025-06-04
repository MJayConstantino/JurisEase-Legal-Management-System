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
    if (!isAddTaskOpen) return;

    let isMounted = true;

    async function loadAllMatters() {
      console.log("Fetching all matters for task creation");
      setIsLoadingMatters(true);
      try {
        const result = await handleFetchMatters();
        if (!isMounted) return;

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
        if (isMounted) {
          setIsLoadingMatters(false);
        }
      }
    }

    loadAllMatters();

    return () => {
      isMounted = false;
    };
  }, [isAddTaskOpen]);

  const handleOpenAddTask = useCallback(() => {
    setIsAddTaskOpen(true);
  }, []);

  const handleTaskCreated = useCallback(
    (newTask: Task) => {
      if (onTaskCreated) {
        onTaskCreated(newTask);
      }

      setIsAddTaskOpen(false);
    },
    [onTaskCreated]
  );

  return (
    <>
      <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className={
              "bg-white text-[#181a40] hover:bg-gray-100 " +
              "dark:bg-gray-600/90 dark:text-white dark:hover:bg-gray-800 " +
              "border-1 border-grey-950 dark:border-grey-950 flex h-10 w-10 md:w-auto md:h-auto md:gap-2 cursor-pointer " +
              "justify-center md:justify-start items-center shadow-sm"
            }
          >
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

      {isAddTaskOpen && (
        <TaskForm
          open={isAddTaskOpen}
          onOpenChange={setIsAddTaskOpen}
          onSave={handleTaskCreated}
          onSaveAndCreateAnother={(newTask) => {
            if (onTaskCreated) onTaskCreated(newTask);
          }}
          disableMatterSelect={!!matterId}
          matters={taskMatters}
          isLoadingMatters={isLoadingMatters}
          getMatterNameDisplay={(matterId) =>
            getMattersDisplayName(matterId, taskMatters)
          }
          matterId={matterId}
        />
      )}
    </>
  );
}

export default CreateNewButton;
