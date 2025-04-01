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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getMatters } from "@/actions/matters";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { useRouter } from "next/navigation";

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
    status: "pending",
    matter_id: "",
    created_at: new Date(),
  });

  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
          status: "pending",
          matter_id: "",
          created_at: new Date(),
        });
      }
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

  const handleSubmit = (createAnother = false) => {
    const taskToSave = {
      ...task,
      task_id: task.task_id,
      name: task.name.trim(),
      description: task.description?.trim() || "",
      due_date: task.due_date,
      priority: task.priority || "low",
      status: task.status || "pending",
      matter_id: task.matter_id,
      created_at: task.created_at || new Date(),
    };

    if (createAnother) {
      onSaveAndCreateAnother(taskToSave);
      setTask({
        task_id: "",
        name: "",
        description: "",
        due_date: undefined,
        priority: "low",
        status: "pending",
        matter_id: "",
        created_at: new Date(),
      });
    } else {
      onSave(taskToSave);
      onOpenChange(false);

      // Use Next.js router.refresh() instead of window.location.reload()
      // This will trigger a soft refresh without a full page reload
      router.refresh();
    }
  };

  const selectedMatterName = getMattersDisplayName(
    task.matter_id || "",
    matters
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task.task_id ? "Edit Task" : "New Task"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={task.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={task.priority}
                  onValueChange={(value) => handleChange("priority", value)}
                >
                  <SelectTrigger id="priority" className="mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="mt-1 resize-none"
                rows={3}
                value={task.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assigned-matter">Assigned Matter</Label>
              <Select
                value={task.matter_id || ""}
                onValueChange={(value) => handleChange("matter_id", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={selectedMatterName || "Select a matter"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Matters</SelectLabel>
                    {isLoading ? (
                      <SelectItem key="loading" value="loading" disabled>
                        Loading matters...
                      </SelectItem>
                    ) : matters.length > 0 ? (
                      matters.map((matter: Matter) => (
                        <SelectItem
                          key={matter.matter_id}
                          value={matter.matter_id}
                        >
                          {matter.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem key="no-matters" value="no-matters" disabled>
                        {"No matters available"}
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="taskStatus">Task status</Label>
              <Select
                value={task.status}
                onValueChange={(value: "pending" | "completed") =>
                  handleChange("status", value)
                }
              >
                <SelectTrigger id="taskStatus" className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Due date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "mt-1 w-full justify-start text-left font-normal",
                    !task.due_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {task.due_date ? format(task.due_date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={task.due_date}
                  onSelect={(date) => handleChange("due_date", date)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              onClick={() => handleSubmit(false)}
            >
              {task.task_id ? "Update task" : "Save task"}
            </Button>
            {!task.task_id && (
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => handleSubmit(true)}
              >
                Save and create another
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
