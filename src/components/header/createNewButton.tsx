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
import { AddTaskFormDialog } from "../addTaskDialog";
import { Plus, FileText, Receipt, ClipboardList } from "lucide-react";

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
    matters,
    setIsLoading,
    setMatters,
    isNewBillDialogOpen,
    setIsNewBillDialogOpen,
  } = BillingStates();
  const { addBill } = BillingsActionHandlers();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [mattersData] = await Promise.all([getMatters()]);
        setMatters(mattersData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [setIsLoading, setMatters]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isLoadingMatters] = useState(false);

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
          <DropdownMenuItem onClick={() => setIsAddTaskOpen(true)}>
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
        matters={matters}
        matterBillingMatterId={""}
      />

      <AddTaskFormDialog
        onSave={onTaskCreated}
        onOpenChange={setIsAddTaskOpen}
        matters={matters}
        matterId={matterId}
        isLoadingMatters={isLoadingMatters}
        open={isAddTaskOpen}
      />
    </>
  );
}

export default CreateNewButton;
