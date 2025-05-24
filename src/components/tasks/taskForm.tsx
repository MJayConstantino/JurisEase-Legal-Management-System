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
import { useEffect, useState, useMemo, useCallback } from "react";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { toast } from "sonner";
import { format } from "date-fns";
import { handleCreateTask, handleUpdateTask } from "@/action-handlers/tasks";
import { z } from "zod";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const mattersPerPage = 5;

  // Calculate total pages and visible matters
  const totalPages = useMemo(
    () => Math.ceil(matters.length / mattersPerPage),
    [matters.length]
  );
  const visibleMatters = useMemo(() => {
    const startIndex = (currentPage - 1) * mattersPerPage;
    return matters.slice(startIndex, startIndex + mattersPerPage);
  }, [matters, currentPage]);

  // Pagination handlers
  const goToNextPage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    [currentPage, totalPages]
  );

  const goToPrevPage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    },
    [currentPage]
  );

  // Selected matter details
  const selectedMatter = useMemo(() => {
    return matters.find((m) => m.matter_id === task.matter_id);
  }, [matters, task.matter_id]);

  // Only update task state when dialog opens (not on every render)
  useEffect(() => {
    if (open) {
      const newTaskState = initialTask
        ? { ...initialTask }
        : {
            ...defaultTask,
            matter_id: matterId || defaultTask.matter_id,
          };
      setTask(newTaskState);
    }
  }, [open, initialTask, matterId, defaultTask]);

  const handleChange = useCallback(
    (field: keyof Task, value: string | Date | undefined) => {
      setTask((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const validateTask = useCallback((): boolean => {
    try {
      const validationData = {
        ...task,
        due_date: task.due_date ? task.due_date : undefined,
      };

      taskSchema.parse(validationData);
      return true;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Validation failed. Please check your input.");
      }
      return false;
    }
  }, [task]);

  const handleSubmit = useCallback(
    async (keepFormOpen: boolean = false) => {
      if (isSubmitting) {
        return;
      }

      if (!validateTask()) {
        return;
      }

      setIsSubmitting(true);

      try {
        const taskToSubmit = {
          ...task,
          due_date: task.due_date ? new Date(task.due_date) : undefined,
          matter_id: task.matter_id || undefined,
        };

        const isNewTask = !task.task_id;

        const response = isNewTask
          ? await handleCreateTask(taskToSubmit)
          : await handleUpdateTask(taskToSubmit);

        if (response && !response.error && response.task) {
          const successMessage = isNewTask
            ? `Task "${response.task.name}" created successfully`
            : `Task "${response.task.name}" updated successfully`;
          toast.success(successMessage);

          if (isNewTask && keepFormOpen && onSaveAndCreateAnother) {
            onSaveAndCreateAnother(response.task as Task);
            // Reset form with same matter
            setTask({
              ...defaultTask,
              matter_id: matterId || task.matter_id,
            });
          } else if (onSave) {
            onSave(response.task as Task);
            if (!keepFormOpen) {
              onOpenChange(false);
            }
          }
        } else {
          toast.error(response?.error || "Failed to save task");
        }
      } catch (error) {
        toast.error(
          "Failed to save task: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
      } finally {
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
        if (!isSubmitting) {
          // Prevent unnecessary state updates
          if (open !== newOpen) {
            onOpenChange(newOpen);
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700 p-6 scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100 font-semibold text-base sm:text-lg">
            {task.task_id ? "Edit Task" : "Add New Task"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {task.task_id
              ? "Edit the details below to update the task."
              : "Fill in the details below to create a new task."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Form content */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2">
              <Label htmlFor="name" className="dark:text-gray-200 text-xs sm:text-sm">
                Name <sup className="text-red-500">*</sup>
              </Label>
              <Input
                placeholder="Task name"
                id="name"
                value={task.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400 text-xs sm:text-sm"
              />
            </div>
            <div>
              <Label htmlFor="priority" className="dark:text-gray-200 text-xs sm:text-sm">
                Priority
              </Label>
              <Select
                value={task.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger
                  id="priority"
                  className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full text-xs sm:text-sm"
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600 text-xs sm:text-sm">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="dark:text-gray-200 text-xs sm:text-sm">
              Description
            </Label>
            <Textarea
              placeholder="Optional"
              id="description"
              className="mt-2 resize-none w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400 text-xs sm:text-sm"
              rows={3}
              value={task.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="assignedMatter" className="dark:text-gray-200 text-xs sm:text-sm">
              Assigned Matter
            </Label>
            <Select
              value={task.matter_id || ""}
              onValueChange={(value) => handleChange("matter_id", value)}
              disabled={disableMatterSelect || !!matterId || isLoadingMatters}
            >
              <SelectTrigger className="mt-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 text-xs sm:text-sm">
                <SelectValue
                  placeholder={
                    isLoadingMatters ? "Loading matters..." : "Select a matter"
                  }
                >
                  {selectedMatter && (
                    <span
                      className="truncate inline-block max-w-[250px] text-xs sm:text-sm"
                      title={selectedMatter.name}
                    >
                      [{selectedMatter.case_number}] {selectedMatter.name}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600 w-full max-h-[350px]">
                <div className="flex flex-col">
                  {visibleMatters.map((matter) => (
                    <SelectItem
                      key={matter.matter_id}
                      value={matter.matter_id}
                      className="text-xs sm:text-sm"
                      title={matter.name}
                    >
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="ml-1 text-xs text-gray-500 whitespace-nowrap">
                          [{matter.case_number}]
                        </span>
                        <span className="truncate inline-block max-w-[150px] xs:max-w-[180px] sm:max-w-[250px] text-xs sm:text-sm">
                          {matter.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </div>

                {/* Pagination */}
                {matters.length > mattersPerPage && (
                  <div className="flex items-center justify-between sticky bottom-0 py-2 px-3 border-t bg-gray-50 dark:bg-gray-800 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="h-8 min-w-[60px] px-2 hover:cursor-pointer text-xs"
                    >
                      <ChevronLeftIcon className="h-4 w-4 mr-1" />
                      Prev
                    </Button>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mx-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="h-8 min-w-[60px] px-2 hover:cursor-pointer text-xs"
                    >
                      Next
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="dueDate" className="dark:text-gray-200 text-xs sm:text-sm">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full cursor-pointer dark:placeholder:text-gray-400 text-xs sm:text-sm"
              value={formattedDueDate}
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) =>
                handleChange(
                  "due_date",
                  e.target.value ? new Date(e.target.value) : undefined
                )
              }
              onClick={(e) => {
                (e.target as HTMLInputElement).showPicker?.();
              }}
            />
          </div>
          <div>
            <Label htmlFor="taskStatus" className="dark:text-gray-200 text-xs sm:text-sm">
              Task Status
            </Label>
            <Select
              value={task.status}
              onValueChange={(value: "in-progress" | "completed") =>
                handleChange("status", value)
              }
            >
              <SelectTrigger className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full text-xs sm:text-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600 text-xs sm:text-sm">
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
              className={`text-xs sm:text-sm ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
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
                className={`text-xs sm:text-sm ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isSubmitting ? "Saving..." : "Save and Create Another"}
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="cursor-pointer w-full sm:w-auto text-xs sm:text-sm"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
