"use client";

<<<<<<< HEAD
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { getMatters } from "@/actions/matters"
import { getMattersDisplayName } from "@/utils/getMattersDisplayName"
import type { Task } from "@/types/task.type"
import type { Matter } from "@/types/matter.type"

interface TaskFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: Task) => void
  onSaveAndCreateAnother: (task: Task) => void
  initialTask?: Task
}

export function TaskForm({ open, onOpenChange, onSave, onSaveAndCreateAnother, initialTask }: TaskFormProps) {
=======
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

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Task) => void;
  onSaveAndCreateAnother: (task: Task) => void;
}

export function TaskForm({
  open,
  onOpenChange,
  onSave,
  onSaveAndCreateAnother,
}: TaskFormProps) {
>>>>>>> feature/matters-page
  const [task, setTask] = useState<Task>({
    task_id: "",
    name: "",
    description: "",
    due_date: undefined,
    priority: "low",
    status: "pending",
    matter_id: "",
    createdAt: new Date(),
  });

<<<<<<< HEAD
  const [matters, setMatters] = useState<Matter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [matterSearchQuery, setMatterSearchQuery] = useState("")
=======
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
>>>>>>> feature/matters-page

  useEffect(() => {
    async function fetchMatters() {
      try {
<<<<<<< HEAD
        setIsLoading(true)
        const matterData = await getMatters()
        // Ensure matters have unique IDs to prevent duplicate entries
        const uniqueMatters = matterData.filter(
          (matter, index, self) => index === self.findIndex((m) => m.id === matter.id),
        )
        setMatters(uniqueMatters)
=======
        setIsLoading(true);
        const matterData = await getMatters();
        setMatters(matterData);
>>>>>>> feature/matters-page
      } catch (error) {
        console.error("Error fetching matters:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMatters();
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    if (initialTask) {
      setTask(initialTask)
    }
  }, [initialTask])

  const handleChange = (field: keyof Task, value: string | Date | undefined) => {
=======
  const handleChange = (
    field: keyof Task,
    value: string | Date | undefined
  ) => {
>>>>>>> feature/matters-page
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (createAnother = false) => {
    if (createAnother) {
      onSaveAndCreateAnother(task);
    } else {
      onSave(task);
    }

    // Reset form if creating another
    if (createAnother) {
      setTask({
        task_id: "",
        name: "",
        description: "",
        due_date: undefined,
        priority: "low",
        status: "pending",
        matter_id: "",
        createdAt: new Date(),
      });
    }
  };

  const selectedMatterName = getMattersDisplayName(
    task.matter_id || "",
    matters
  );

  const filteredMatters = matters.filter((matter) =>
    matter.name.toLowerCase().includes(matterSearchQuery.toLowerCase()),
  )

  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
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
<<<<<<< HEAD
              <div className="relative">
                <Select
                  value={task.matter_id}
                  onValueChange={(value) => handleChange("matter_id", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={isLoading ? "Loading matters..." : selectedMatterName || "Select a matter"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1.5">
                      <Input
                        placeholder="Search matters..."
                        value={matterSearchQuery}
                        onChange={(e) => setMatterSearchQuery(e.target.value)}
                        className="h-8"
                      />
                    </div>
=======
              <Select
                value={task.matter_id}
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
>>>>>>> feature/matters-page
                    {isLoading ? (
                      <SelectItem key="loading" value="loading" disabled>
                        Loading matters...
                      </SelectItem>
<<<<<<< HEAD
                    ) : filteredMatters.length > 0 ? (
                      filteredMatters.map((matter: Matter) => (
                        <SelectItem key={matter.id} value={matter.id}>
=======
                    ) : matters.length > 0 ? (
                      matters.map((matter: Matter) => (
                        <SelectItem
                          key={matter.matter_id}
                          value={matter.matter_id}
                        >
>>>>>>> feature/matters-page
                          {matter.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem key="no-matters" value="no-matters" disabled>
                        {matterSearchQuery ? "No matching matters" : "No matters available"}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
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

            <div>
              <Label>Due date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "mt-1 w-full justify-start text-left font-normal",
<<<<<<< HEAD
                      !task.due_date && "text-muted-foreground",
=======
                      !task.dueDate && "text-muted-foreground"
>>>>>>> feature/matters-page
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
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              onClick={() => handleSubmit(false)}
            >
              Save task
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => handleSubmit(true)}
            >
              Save and create another
            </Button>
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
