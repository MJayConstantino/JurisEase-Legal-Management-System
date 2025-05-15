"use client";

import { DeleteConfirmationDialog } from "../deleteConfirmationDialog";
import { toast } from "sonner";
import { handleDeleteTask } from "@/action-handlers/tasks";
import type { Task } from "@/types/task.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface TaskDeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  onSuccess?: () => void;
  redirectToList?: boolean;
}

export function TaskDeleteDialog({
  isOpen,
  onOpenChange,
  task,
  onSuccess,
  redirectToList = false,
}: TaskDeleteDialogProps) {

  
  const router = useRouter();
  
  useEffect(() => {
    if (isOpen) {
      console.log('[TaskDeleteDialog] Dialog opened for task:', task);
    }
  }, [isOpen, task]);

  const handleDelete = async () => {
    console.log('[TaskDeleteDialog] Attempting to delete task:', task.task_id);
    try {
      console.log('[TaskDeleteDialog] Calling handleDeleteTask API');
      const { error } = await handleDeleteTask(task.task_id);
      console.log('[TaskDeleteDialog] Delete result:', error ? error : "Success");

      if (!error) {
        onOpenChange(false);

        if (typeof window !== "undefined") {
          console.log('[TaskDeleteDialog] Showing success toast');
          toast.success(`"${task.name}" has been deleted successfully.`);
        }

        if (onSuccess) {
          console.log('[TaskDeleteDialog] Executing onSuccess callback');
          onSuccess();
        }

        if (redirectToList) {
          console.log('[TaskDeleteDialog] Redirecting to task list');
          router.push("/tasks");
        }

        console.log('[TaskDeleteDialog] Calling router.refresh()');
        router.refresh();
      } else {
        console.error('[TaskDeleteDialog] Error from API:', error);
        if (typeof window !== "undefined") {
          toast.error("Failed to delete the task. Please try again.");
        }
      }
    } catch (error) {
      console.error("[TaskDeleteDialog] Error in delete handler:", error);
      if (typeof window !== "undefined") {
        toast.error("Failed to delete the task. Please try again.");
      }
    }
  };

  return (
    <DeleteConfirmationDialog
      isOpen={isOpen}
      onOpenChange={(open) => {
        console.log('[TaskDeleteDialog] Dialog state changed to:', open);
        onOpenChange(open);
      }}
      onConfirm={async () => {
        console.log('[TaskDeleteDialog] Delete confirmed for task:', task.task_id);
        await handleDelete();
      }}
      title="Delete Task"
      description={`Are you sure you want to delete the task "${task.name}"? This action cannot be undone.`}
      confirmText="Delete Task"
    />
  );
}
