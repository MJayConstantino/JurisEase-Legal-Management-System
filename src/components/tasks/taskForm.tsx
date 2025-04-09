"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { getMatters } from "@/actions/matters";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Task) => void;
  onSaveAndCreateAnother: (task: Task) => void;
  initialTask?: Task | null;
}

export function TaskForm({
  open,
  onOpenChange,
  onSave,
  onSaveAndCreateAnother,
  initialTask,
}: TaskFormProps) {
  const router = useRouter();
  const [task, setTask] = useState<Task>({
    task_id: "",
    name: "",
    description: "",
    due_date: undefined,
    priority: "low",
    status: "in-progress",
    matter_id: "",
    created_at: new Date(),
  });

  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchMatters() {
      try {
        setIsLoading(true);
        const matterData = await getMatters();
        const uniqueMatters = matterData.filter(
          (matter, index, self) =>
            index === self.findIndex((m) => m.matter_id === matter.matter_id)
        );
        setMatters(uniqueMatters);
      } catch (error) {
        console.error("Error fetching matters:", error);
        toast.error("Failed to load matters");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMatters();
  }, []);

  useEffect(() => {
    if (open) {
      if (initialTask) {
        setTask({
          ...initialTask,
          task_id: initialTask.task_id || "",
          due_date: initialTask.due_date
            ? new Date(initialTask.due_date)
            : undefined,
        });
      } else {
        setTask({
          task_id: "",
          name: "",
          description: "",
          due_date: undefined,
          priority: "low",
          status: "in-progress",
          matter_id: "",
          created_at: new Date(),
        });
      }
      setIsSubmitting(false);
    }
  }, [open, initialTask]);

  const handleChange = (
    field: keyof Task,
    value: string | Date | undefined
  ) => {
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!task.name.trim()) {
      toast.error("Task name is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (createAnother = false) => {
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    const taskToSave = {
      ...task,
      task_id: task.task_id,
      name: task.name.trim(),
      description: task.description?.trim() || "",
      due_date: task.due_date,
      priority: task.priority || "low",
      status: task.status || "in-progess",
      matter_id: task.matter_id,
      created_at: task.created_at || new Date(),
    };

    try {
      if (createAnother) {
        await onSaveAndCreateAnother(taskToSave);
        toast.success(
          task.task_id
            ? "Task updated successfully"
            : "Task created successfully"
        );
        setTask({
          task_id: "",
          name: "",
          description: "",
          due_date: undefined,
          priority: "low",
          status: "in-progress",
          matter_id: "",
          created_at: new Date(),
        });
        setIsSubmitting(false);
      } else {
        await onSave(taskToSave);
        toast.success(
          task.task_id
            ? "Task updated successfully"
            : "Task created successfully"
        );
        onOpenChange(false);

        if (task.task_id) {
          router.refresh();
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task");
      setIsSubmitting(false);
    }
  };

  const selectedMatterName = getMattersDisplayName(
    task.matter_id || "",
    matters
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!isSubmitting) {
          onOpenChange(newOpen);
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100">
            {task.task_id ? "Edit Task" : "New Task"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="name" className="dark:text-gray-200">
                  Name
                </Label>
                <Input
                  placeholder="Task name"
                  id="name"
                  value={task.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
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
                    className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  >
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                    <SelectItem
                      value="low"
                      className="dark:text-gray-100 dark:focus:bg-gray-600"
                    >
                      Low
                    </SelectItem>
                    <SelectItem
                      value="medium"
                      className="dark:text-gray-100 dark:focus:bg-gray-600"
                    >
                      Medium
                    </SelectItem>
                    <SelectItem
                      value="high"
                      className="dark:text-gray-100 dark:focus:bg-gray-600"
                    >
                      High
                    </SelectItem>
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
                className="mt-1 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
                rows={3}
                value={task.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assigned-matter" className="dark:text-gray-200">
                Assigned Matter
              </Label>
              <Select
                value={task.matter_id || ""}
                onValueChange={(value) => handleChange("matter_id", value)}
              >
                <SelectTrigger className="w-full hover:cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                  <SelectValue
                    placeholder={selectedMatterName || "Select a matter"}
                  />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectGroup>
                    <SelectLabel className="dark:text-gray-300">
                      Matters
                    </SelectLabel>
                    {isLoading ? (
                      <SelectItem
                        key="loading"
                        value="loading"
                        disabled
                        className="dark:text-gray-400"
                      >
                        Loading matters...
                      </SelectItem>
                    ) : matters.length > 0 ? (
                      matters.map((matter: Matter) => (
                        <SelectItem
                          key={matter.matter_id}
                          value={matter.matter_id}
                          className="dark:text-gray-100 dark:focus:bg-gray-600"
                        >
                          {matter.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem
                        key="no-matters"
                        value="no-matters"
                        disabled
                        className="dark:text-gray-400"
                      >
                        {"No matters available"}
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="taskStatus" className="dark:text-gray-200">
                Task status
              </Label>
              <Select
                value={task.status}
                onValueChange={(value: "in-progess" | "completed") =>
                  handleChange("status", value)
                }
              >
                <SelectTrigger
                  id="taskStatus"
                  className="mt-1 hover:cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectItem
                    value="in-progress"
                    className="dark:text-gray-100 dark:focus:bg-gray-600"
                  >
                    In-Progress
                  </SelectItem>
                  <SelectItem
                    value="completed"
                    className="dark:text-gray-100 dark:focus:bg-gray-600"
                  >
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="dueDate" className="dark:text-gray-200">
              Due date
            </Label>
            <Input
              id="dueDate"
              type="date"
              className="mt-1 hover:cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              value={task.due_date ? format(task.due_date, "yyyy-MM-dd") : ""}
              onChange={(e) =>
                handleChange(
                  "due_date",
                  e.target.value ? new Date(e.target.value) : undefined
                )
              }
            />
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              type="submit"
              className="w-full sm:w-auto hover:cursor-pointer"
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : task.task_id
                ? "Update task"
                : "Save task"}
            </Button>
            {!task.task_id && (
              <Button
                variant="outline"
                className="w-full sm:w-auto hover:cursor-pointer dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save and create another"}
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            className="w-full sm:w-auto hover:cursor-pointer dark:text-gray-100 dark:hover:bg-gray-700"
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
