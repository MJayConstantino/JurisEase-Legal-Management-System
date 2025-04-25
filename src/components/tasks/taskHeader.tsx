"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List } from "lucide-react";
import { TaskForm } from "./taskForm";
import type { Task } from "@/types/task.type";
import { Matter } from "@/types/matter.type";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { handleCreateTask } from "@/action-handlers/tasks";
import { toast } from "sonner";

interface TasksHeaderProps {
  onStatusChange: (status: string) => void;
  onViewChange: (view: "grid" | "table") => void;
  view: "grid" | "table";
  onTaskCreated?: (newTask: Task) => void;
  matters: Matter[];
}

export function TasksHeader({
  onStatusChange,
  onViewChange,
  view,
  onTaskCreated,
  matters = [],
}: TasksHeaderProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleFilterChange = (filter: string) => {
    console.log("Filter changed to:", filter);
    setActiveFilter(filter);
    onStatusChange(filter);
  };

  const handleViewToggle = (newView: "grid" | "table") => {
    console.log("View toggled to:", newView);
    onViewChange(newView);
  };

  const handleTaskCreated = async (
    newTask: Task,
    keepFormOpen: boolean = false
  ) => {
    console.log("Creating task:", newTask);
    try {
      const response = await handleCreateTask({
        ...newTask,
        due_date: newTask.due_date ? new Date(newTask.due_date) : undefined,
      });

      console.log("Create task response:", response);

      if (response && !response.error && response.task) {
        toast.success("Task created successfully");

        if (onTaskCreated) {
          onTaskCreated(response.task as Task);
        }

        if (!keepFormOpen) {
          setIsAddTaskOpen(false);
        }
      } else {
        toast.error(response.error || "Failed to save task to the database.");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task to the database.");
    }
  };

  return (
    <div className="p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Button
          variant="blue"
          size="sm"
          className="sm:h-9"
          onClick={() => setIsAddTaskOpen(true)}
        >
          <Plus className="h-3 w-3 mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm">Add Task</span>
        </Button>

        <div className="flex flex-wrap gap-2 bg-gray-100 shadow dark:bg-gray-700 rounded-md justify-center sm:justify-start">
          <Button
            variant={activeFilter === "all" ? "blue" : "ghost"}
            size="sm"
            className="px-3 py-1 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("all")}
          >
            All Tasks
          </Button>
          <Button
            variant={activeFilter === "in-progress" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("in-progress")}
          >
            In-Progress
          </Button>
          <Button
            variant={activeFilter === "overdue" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("overdue")}
          >
            Overdue
          </Button>
          <Button
            variant={activeFilter === "completed" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </Button>
        </div>

        <div className="grid grid-cols-2 gap bg-gray-100 shadow dark:bg-gray-700 rounded-md w-full sm:flex sm:gap-3 sm:w-auto">
          <Button
            variant={view === "grid" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-medium rounded-md"
            onClick={() => handleViewToggle("grid")}
          >
            <Grid className="h-5 w-5 mr-2" />
            <span>Grid</span>
          </Button>
          <Button
            variant={view === "table" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-medium rounded-md"
            onClick={() => handleViewToggle("table")}
          >
            <List className="h-5 w-5 mr-2" />
            <span>Table</span>
          </Button>
        </div>
      </div>

      <TaskForm
        open={isAddTaskOpen}
        onSave={(newTask) => handleTaskCreated(newTask, false)} // Close form after saving
        onSaveAndCreateAnother={(newTask) => handleTaskCreated(newTask, true)} // Keep form open after saving
        onOpenChange={setIsAddTaskOpen}
        disableMatterSelect={false}
        initialTask={undefined}
        matters={matters}
        isLoadingMatters={false}
        getMatterNameDisplay={(matterId) =>
          getMattersDisplayName(matterId, matters)
        }
      />
    </div>
  );
}
