"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List } from "lucide-react";
import { TaskForm } from "./taskForm";
import type { Task } from "@/types/task.type";
import { Matter } from "@/types/matter.type";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";

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
  matters = []
}: TasksHeaderProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onStatusChange(filter);
  };
  const handleViewToggle = (newView: "grid" | "table") => {
    onViewChange(newView);
  };

  const handleTaskCreated = (newTask: Task) => {
    setIsAddTaskOpen(false);
    if (onTaskCreated) {
      onTaskCreated(newTask);
    }
  };

  return (
    <div className="p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Add Task Button */}
        <Button
          variant="blue"
          size="sm"
          className="sm:h-9"
          onClick={() => setIsAddTaskOpen(true)}
        >
          <Plus className="h-3 w-3 mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm">Add Task</span>
        </Button>

        {/* Filter Buttons */}
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

        {/* View Toggle Buttons */}
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
              onSave={handleTaskCreated}
              onSaveAndCreateAnother={handleTaskCreated}
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
