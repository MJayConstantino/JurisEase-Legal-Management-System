"use client";

import { DeleteConfirmationDialog } from "../deleteConfirmationDialog";
import { toast } from "sonner";
import { handleDeleteTask } from "@/action-handlers/tasks";
import type { Task } from "@/types/task.type";
import { useRouter } from "next/navigation";

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

  const handleDelete = async () => {
    try {
      const { error } = await handleDeleteTask(task.task_id);

      if (!error) {
        onOpenChange(false);

        if (typeof window !== "undefined") {
          toast.success(`"${task.name}" has been deleted successfully.`);
        }

        if (onSuccess) {
          onSuccess();
        }

        if (redirectToList) {
          router.push("/tasks");
        }

        router.refresh();
      } else {
        if (typeof window !== "undefined") {
          toast.error("Failed to delete the task. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error in delete handler:", error);
      if (typeof window !== "undefined") {
        toast.error("Failed to delete the task. Please try again.");
      }
    }
  };

  return (
    <DeleteConfirmationDialog
      isOpen={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
      }}
      onConfirm={async () => {
        await handleDelete();
      }}
      title="Delete Task"
      description={`Are you sure you want to delete the task "${task.name}"? This action cannot be undone.`}
      confirmText="Delete Task"
    />
  );
}
