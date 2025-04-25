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
import { useEffect, useState } from "react";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { toast } from "sonner";
import { format } from "date-fns";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { handleCreateTask } from "@/action-handlers/tasks";
import { handleFetchMatters } from "@/action-handlers/matters";

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (newTask: Task) => void;
  initialTask?: Task;
  matters: Matter[];
  isLoadingMatters: boolean;
  getMatterNameDisplay: (matterId: string) => string;
}

export function AddTaskFormDialog({
  open,
  onOpenChange,
  onSave,
  initialTask,
  matterId,
}: TaskFormProps & { matterId?: string }) {
  const [task, setTask] = useState<Task>(
    () =>
      initialTask || {
        task_id: "",
        name: "",
        description: "",
        due_date: undefined,
        priority: "low",
        status: "in-progress",
        matter_id: matterId || "",
        created_at: new Date(),
      }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);
  const [matters, setMatters] = useState<Matter[]>([]);

  useEffect(() => {
    console.log("Fetching matters...");
    async function fetchMatters() {
      try {
        setIsLoadingMatters(true);
        const { matters: matterData }: { matters: Matter[] } =
          await handleFetchMatters();
        console.log("Fetched matters:", matterData);
        const uniqueMatters = matterData.filter(
          (matter, index, self) =>
            index === self.findIndex((m) => m.matter_id === matter.matter_id)
        );
        setMatters(uniqueMatters);
      } catch (error) {
        console.error("Error fetching matters:", error);
        toast.error("Failed to load matters");
      } finally {
        setIsLoadingMatters(false);
      }
    }
    fetchMatters();
  }, []);

  const resetTaskForm = () => {
    setTask({
      task_id: "",
      name: "",
      description: "",
      due_date: undefined,
      priority: "low",
      status: "in-progress",
      matter_id: matterId || "",
      created_at: new Date(),
    });
  };

  const handleChange = (
    field: keyof Task,
    value: string | Date | undefined
  ) => {
    console.log(`Field changed: ${field}, New value:`, value);
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    console.log("Validating form with task:", task);
    if (!task.name.trim()) {
      toast.error("Task name is required");
      return false;
    }
    return true;
  };

  const handleTaskCreated = async (
    newTask: Task,
    keepFormOpen: boolean = false
  ) => {
    if (isSubmitting) {
      console.log("Submission in progress, skipping...");
      return;
    }
    if (!validateForm()) {
      console.log("Form validation failed.");
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting task:", newTask);
    try {
      const taskToCreate = {
        ...newTask,
        due_date: newTask.due_date ? new Date(newTask.due_date) : undefined,
        matter_id: newTask.matter_id || undefined,
      };

      console.log("Task to create:", taskToCreate);
      const response = await handleCreateTask(taskToCreate);

      console.log("API response:", response);
      if (response && !response.error && response.task) {
        toast.success("Task created successfully");

        if (onSave) {
          console.log("Saving and closing form.");
          onSave(response.task as Task);
        }

        if (!keepFormOpen) {
          setTimeout(() => {
            onOpenChange(false);
            resetTaskForm();
          }, 0);
        }
      } else {
        console.error("Error response from API:", response.error);
        toast.error(response.error || "Failed to save task to the database.");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task to the database.");
    } finally {
      setIsSubmitting(false);
      console.log("Submission process completed.");
    }
  };

  return (
    <Dialog
      data-testid="task-form-dialog"
      open={open}
      onOpenChange={(newOpen) => {
        if (!isSubmitting) {
          onOpenChange(newOpen);
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700 p-6">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100">
            {task.task_id ? "Edit Task" : "New Task"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Task creation form
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
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
                  className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="assignedMatter" className="dark:text-gray-200">
                Assigned Matter
              </Label>
              <Select
                value={task.matter_id || ""}
                onValueChange={(value) => handleChange("matter_id", value)}
              >
                <SelectTrigger className="mt-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                  <SelectValue
                    placeholder={
                      isLoadingMatters
                        ? "Loading matters..."
                        : "Select a matter"
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
                <SelectTrigger className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectItem value="in-progress">In-Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <Label htmlFor="dueDate" className="dark:text-gray-200">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              value={
                task.due_date
                  ? format(new Date(task.due_date), "yyyy-MM-dd")
                  : ""
              }
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) =>
                handleChange(
                  "due_date",
                  e.target.value ? new Date(e.target.value) : undefined
                )
              }
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              type="submit"
              onClick={() => handleTaskCreated(task, false)}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : task.task_id
                ? "Update Task"
                : "Save Task"}
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
