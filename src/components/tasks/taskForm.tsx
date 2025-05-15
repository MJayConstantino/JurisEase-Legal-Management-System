"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { toast } from "sonner";
import { format } from "date-fns";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { handleCreateTask, handleUpdateTask } from "@/action-handlers/tasks";
import { z } from "zod";

const taskSchema = z.object({
  name: z
    .string()
    .min(1, "Task name is required")
    .max(100, "Task name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  due_date: z.coerce.date().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["in-progress", "completed"]),
  matter_id: z.string().optional().nullable(),
});

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (newTask: Task) => void;
  onSaveAndCreateAnother?: (newTask: Task) => void;
  disableMatterSelect: boolean;
  initialTask?: Task;
  matters: Matter[];
  isLoadingMatters: boolean;
  getMatterNameDisplay: (matterId: string) => string;
}

export function TaskForm({
  open,
  onOpenChange,
  onSave,
  onSaveAndCreateAnother,
  disableMatterSelect,
  initialTask,
  matters,
  isLoadingMatters,
  matterId,
}: TaskFormProps & { matterId?: string }) {
  // Prevent duplicate renders with a ref
  const initialRenderRef = useRef(true);
  
  console.log('[TaskForm] Rendering with:', { 
    open, 
    disableMatterSelect, 
    isLoadingMatters, 
    initialTaskId: initialTask?.task_id,
    matterId,
    isInitialRender: initialRenderRef.current
  });
  
  const defaultTask = useMemo<Task>(
    () => ({
      task_id: "",
      name: "",
      description: "",
      due_date: undefined,
      priority: "low" as "low" | "medium" | "high",
      status: "in-progress" as "in-progress" | "completed",
      matter_id: matterId || "",
      created_at: new Date(),
    }),
    [matterId]
  );

  const [task, setTask] = useState<Task>(() => initialTask || defaultTask);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only update task state when dialog opens (not on every render)
  useEffect(() => {
    if (open) {
      const newTaskState = initialTask
        ? { ...initialTask }
        : {
            ...defaultTask,
            matter_id: matterId || defaultTask.matter_id,
          };
      console.log('[TaskForm] Dialog opened, setting task state to:', newTaskState);
      setTask(newTaskState);
    }
  }, [open, initialTask, matterId, defaultTask]);
  
  // Mark initial render complete
  useEffect(() => {
    initialRenderRef.current = false;
  }, []);

  useEffect(() => {
    console.log('[TaskForm] Current task state:', task);
  }, [task]);

  const handleChange = useCallback(
    (field: keyof Task, value: string | Date | undefined) => {
      console.log(`[TaskForm] Field "${field}" changed:`, value);
      setTask((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const validateTask = useCallback((): boolean => {
    console.log('[TaskForm] Validating task:', task);
    try {
      const validationData = {
        ...task,
        due_date: task.due_date ? task.due_date : undefined,
      };

      taskSchema.parse(validationData);
      console.log('[TaskForm] Validation successful');
      return true;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.error('[TaskForm] Validation error:', error.errors[0]);
        toast.error(error.errors[0].message);
      } else {
        console.error('[TaskForm] Unknown validation error:', error);
        toast.error("Validation failed. Please check your input.");
      }
      return false;
    }
  }, [task]);

  const handleSubmit = useCallback(
    async (keepFormOpen: boolean = false) => {
      console.log('[TaskForm] handleSubmit called with keepFormOpen:', keepFormOpen);
      
      if (isSubmitting) {
        console.log('[TaskForm] Submission already in progress, ignoring');
        return;
      }
      
      if (!validateTask()) {
        console.log('[TaskForm] Validation failed, aborting submission');
        return;
      }

      console.log('[TaskForm] Submitting task...');
      setIsSubmitting(true);

      try {
        const taskToSubmit = {
          ...task,
          due_date: task.due_date ? new Date(task.due_date) : undefined,
          matter_id: task.matter_id || undefined,
        };
        console.log('[TaskForm] Prepared task for submission:', taskToSubmit);

        const isNewTask = !task.task_id;
        console.log(`[TaskForm] Performing ${isNewTask ? 'create' : 'update'} operation`);
        
        const response = isNewTask
          ? await handleCreateTask(taskToSubmit)
          : await handleUpdateTask(taskToSubmit);

        console.log('[TaskForm] API response:', response);

        if (response && !response.error && response.task) {
          const successMessage = isNewTask
            ? `Task "${response.task.name}" created successfully`
            : `Task "${response.task.name}" updated successfully`;
          console.log('[TaskForm]', successMessage);  
          toast.success(successMessage);

          if (isNewTask && keepFormOpen && onSaveAndCreateAnother) {
            console.log('[TaskForm] Calling onSaveAndCreateAnother and resetting form');
            onSaveAndCreateAnother(response.task as Task);
            // Reset form with same matter
            setTask({
              ...defaultTask,
              matter_id: matterId || task.matter_id,
            });
          } else if (onSave) {
            console.log('[TaskForm] Calling onSave callback');
            onSave(response.task as Task);
            if (!keepFormOpen) {
              console.log('[TaskForm] Closing form after save');
              onOpenChange(false);
            }
          }
        } else {
          console.error('[TaskForm] API returned error:', response?.error);
          toast.error(response?.error || "Failed to save task");
        }
      } catch (error) {
        console.error("[TaskForm] Error saving task:", error);
        toast.error(
          "Failed to save task: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
      } finally {
        console.log('[TaskForm] Submission completed, resetting isSubmitting state');
        setIsSubmitting(false);
      }
    },
    [
      isSubmitting,
      validateTask,
      task,
      defaultTask,
      matterId,
      onSaveAndCreateAnother,
      onSave,
      onOpenChange,
    ]
  );

  const formattedDueDate = useMemo(() => {
    return task.due_date ? format(new Date(task.due_date), "yyyy-MM-dd") : "";
  }, [task.due_date]);

  return (
    <Dialog
      data-testid="task-form-dialog"
      open={open}
      onOpenChange={(newOpen) => {
        console.log('[TaskForm] Dialog onOpenChange called with:', newOpen);
        if (!isSubmitting) {
          // Prevent unnecessary state updates
          if (open !== newOpen) {
            onOpenChange(newOpen);
          }
        } else {
          console.log('[TaskForm] Ignoring dialog close during submission');
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700 p-6">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100 font-semibold">
            {task.task_id ? "Edit Task" : "Add New Task"}
          </DialogTitle>
          <DialogDescription>
            {task.task_id
              ? "Edit the details below to update the task."
              : "Fill in the details below to create a new task."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Form content - unchanged */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2">
              <Label htmlFor="name" className="dark:text-gray-200">
                Name
              </Label>
              <Input
                placeholder="Task name"
                id="name"
                value={task.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="priority" className="dark:text-gray-200">
                Priority
              </Label>
              <Select
                value={task.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger
                  id="priority"
                  className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="dark:text-gray-200">
              Description
            </Label>
            <Textarea
              placeholder="Optional"
              id="description"
              className="mt-2 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              rows={3}
              value={task.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="assignedMatter" className="dark:text-gray-200">
              Assigned Matter
            </Label>
            <Select
              value={task.matter_id || ""}
              onValueChange={(value) => handleChange("matter_id", value)}
              disabled={disableMatterSelect || !!matterId || isLoadingMatters}
            >
              <SelectTrigger className="mt-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                <SelectValue
                  placeholder={
                    isLoadingMatters ? "Loading matters..." : "Select a matter"
                  }
                />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                {isLoadingMatters ? (
                  <SelectItem value="loading" disabled>
                    Loading matters...
                  </SelectItem>
                ) : matters.length > 0 ? (
                  matters.map((matter) => {
                    return (
                      <SelectItem
                        key={matter.matter_id}
                        value={matter.matter_id}
                      >
                        {getMattersDisplayName(matter.matter_id, matters)}
                      </SelectItem>
                    );
                  })
                ) : (
                  <SelectItem value="none" disabled>
                    No matters available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="dueDate" className="dark:text-gray-200">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
              value={formattedDueDate}
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) =>
                handleChange(
                  "due_date",
                  e.target.value ? new Date(e.target.value) : undefined
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="taskStatus" className="dark:text-gray-200">
              Task Status
            </Label>
            <Select
              value={task.status}
              onValueChange={(value: "in-progress" | "completed") =>
                handleChange("status", value)
              }
            >
              <SelectTrigger className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                <SelectItem value="in-progress">In-Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              type="submit"
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
              className={
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer"
              }
            >
              {isSubmitting
                ? "Saving..."
                : task.task_id
                ? "Update Task"
                : "Save Task"}
            </Button>
            {!task.task_id && (
              <Button
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
                className={
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer"
                }
              >
                {isSubmitting ? "Saving..." : "Save and Create Another"}
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="cursor-pointer w-full sm:w-auto"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
