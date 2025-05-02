"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/tasks/taskForm";
import { z } from "zod";
import { toast } from "sonner";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";

const taskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().optional(),
  due_date: z.date().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["in-progress", "completed"]),
  matter_id: z.string().optional(),
  created_at: z.date(),
});

interface AddTaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (newTask: Task) => void;
  initialTask?: Task;
  matters: Matter[];
  isLoadingMatters: boolean;
  matterId?: string;
}

export function AddTaskFormDialog({
  open,
  onOpenChange,
  onSave,
  initialTask,
  matters,
  isLoadingMatters,
  matterId,
}: AddTaskFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateTask = (task: Task) => {
    try {
      taskSchema.parse(task);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0]?.message || "Validation failed";
        toast.error(firstError);
      }
      return false;
    }
  };

  const handleSave = async (task: Task) => {
    if (isSubmitting) return;
    if (!validateTask(task)) return;

    setIsSubmitting(true);
    try {
      if (onSave) {
        onSave(task);
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700 p-6">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100">
            {initialTask?.task_id ? "Edit Task" : "New Task"}
          </DialogTitle>
        </DialogHeader>
        <TaskForm
          initialTask={initialTask}
          onSave={handleSave}
          disableMatterSelect={!!matterId}
          matters={matters}
          isLoadingMatters={isLoadingMatters}
          matterId={matterId}
          open={open}
          onOpenChange={onOpenChange}
          getMatterNameDisplay={(matterId) =>
            matters.find((matter) => matter.matter_id === matterId)?.name ||
            "Unknown"
          }
        />
        <DialogFooter>
          <button
            className="btn btn-secondary"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
