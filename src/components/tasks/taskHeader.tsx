"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List, Menu } from "lucide-react";
import { TaskForm } from "./taskForm";
import type { Task } from "@/types/task.type";
import { Matter } from "@/types/matter.type";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TasksHeaderProps {
  onStatusChange: (status: string) => void;
  onViewChange: (view: "grid" | "table") => void;
  view: "grid" | "table";
  onTaskCreated?: (newTask: Task) => void;
  matters: Matter[];
  matterId?: string;
}

export function TasksHeader({
  onStatusChange,
  onViewChange,
  view,
  onTaskCreated,
  matters = [],
  matterId,
}: TasksHeaderProps) {
  
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLoadingMatters] = useState<boolean>(false);
  
  useEffect(() => {
    console.log('[TasksHeader] Component state:', { 
      isAddTaskOpen, 
      activeFilter, 
      isLoadingMatters 
    });
  }, [isAddTaskOpen, activeFilter, isLoadingMatters]);

  const handleFilterChange = useCallback((filter: string) => {
    console.log('[TasksHeader] Filter changed to:', filter);
    setActiveFilter(filter);
    onStatusChange(filter);
  }, [onStatusChange]);

  const handleViewToggle = useCallback((newView: "grid" | "table") => {
    console.log('[TasksHeader] View toggled to:', newView);
    onViewChange(newView);
  }, [onViewChange]);
  
  const handleOpenAddTask = useCallback(() => {
    console.log('[TasksHeader] Add Task button clicked');
    setIsAddTaskOpen(true);
  }, []);
  
  const handleAddTaskOpenChange = useCallback((open: boolean) => {
    console.log('[TasksHeader] TaskForm state changed to:', open);
    setIsAddTaskOpen(open);
  }, []);
  
  const handleTaskSaved = useCallback((newTask: Task) => {
    console.log('[TasksHeader] Task saved:', newTask);
    if (onTaskCreated) onTaskCreated(newTask);
    // Don't set isAddTaskOpen here - let the form component handle it
  }, [onTaskCreated]);
  
  const handleTaskSavedAndCreateAnother = useCallback((newTask: Task) => {
    console.log('[TasksHeader] Task saved and creating another:', newTask);
    if (onTaskCreated) onTaskCreated(newTask);
  }, [onTaskCreated]);

  return (
    <div className="px-4 py-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
      {/* Mobile/Tablet View - Change breakpoint from md to lg */}
      <div className="flex items-center justify-between lg:hidden mb-4">
        <Button
          variant="blue"
          size="sm"
          onClick={handleOpenAddTask}
        >
          <Plus className="h-3 w-3 mr-1" />
          <span className="text-xs">Add Task</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px] font-bold">
            <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={
                activeFilter === "all"
                  ? "bg-[#1B1E4B] text-white shadow-xs hover:bg-[#161943] dark:text-primary-foreground dark:bg-primary"
                  : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:cursor-pointer"
              }
              onClick={() => handleFilterChange("all")}
            >
              All Tasks
            </DropdownMenuItem>
            <DropdownMenuItem
              className={
                activeFilter === "in-progress"
                  ? "bg-[#1B1E4B] text-white shadow-xs hover:bg-[#161943] dark:text-primary-foreground dark:bg-primary hover:cursor-pointer"
                  : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:cursor-pointer"
              }
              onClick={() => handleFilterChange("in-progress")}
            >
              In-Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              className={
                activeFilter === "overdue"
                  ? "bg-[#1B1E4B] text-white shadow-xs hover:bg-[#161943] dark:text-primary-foreground dark:bg-primary hover:cursor-pointer"
                  : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:cursor-pointer"
              }
              onClick={() => handleFilterChange("overdue")}
            >
              Overdue
            </DropdownMenuItem>
            <DropdownMenuItem
              className={
                activeFilter === "completed"
                  ? "bg-[#1B1E4B] text-white shadow-xs hover:bg-[#161943] dark:text-primary-foreground dark:bg-primary hover:cursor-pointer"
                  : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:cursor-pointer"
              }
              onClick={() => handleFilterChange("completed")}
            >
              Completed
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={
                view === "grid"
                  ? "bg-[#1B1E4B] text-white shadow-xs hover:bg-[#161943] dark:text-primary-foreground dark:bg-primary hover:cursor-pointer"
                  : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:cursor-pointer"
              }
              onClick={() => handleViewToggle("grid")}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </DropdownMenuItem>
            <DropdownMenuItem
              className={
                view === "table"
                  ? "bg-[#1B1E4B] text-white shadow-xs hover:bg-[#161943] dark:text-primary-foreground dark:bg-primary hover:cursor-pointer"
                  : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:cursor-pointer"
              }
              onClick={() => handleViewToggle("table")}
            >
              <List className="h-4 w-4 mr-2" />
              Table
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop View - Change breakpoint from md to lg */}
      <div className="hidden lg:flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Button
          variant="blue"
          size="sm"
          className="sm:h-9"
          onClick={handleOpenAddTask}
        >
          <Plus className="h-3 w-3 mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm">Add Task</span>
        </Button>

        <div className="flex flex-wrap gap-2 bg-gray-100 shadow dark:bg-gray-700 rounded-md justify-center w-full lg:w-auto">
          <Button
            variant={activeFilter === "all" ? "blue" : "ghost"}
            size="sm"
            className="px-3 py-1 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-1 lg:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("all")}
          >
            All Tasks
          </Button>
          <Button
            variant={activeFilter === "in-progress" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-1 lg:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("in-progress")}
          >
            In-Progress
          </Button>
          <Button
            variant={activeFilter === "overdue" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-1 lg:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("overdue")}
          >
            Overdue
          </Button>
          <Button
            variant={activeFilter === "completed" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-1 lg:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </Button>
        </div>

        <div className="grid grid-cols-2 gap bg-gray-100 shadow dark:bg-gray-700 rounded-md w-full sm:w-auto">
          <Button
            variant={view === "grid" ? "blue" : "ghost"}
            size="sm"
            className="cursor-pointer px-3 h-9 text-xs font-semibold rounded-md"
            onClick={() => handleViewToggle("grid")}
          >
            <Grid className="h-5 w-5 mr-0 lg:mr-2" />
            <span className="hidden lg:inline">Grid</span>
          </Button>
          <Button
            variant={view === "table" ? "blue" : "ghost"}
            size="sm"
            className="cursor-pointer px-3 h-9 text-xs font-semibold rounded-md"
            onClick={() => handleViewToggle("table")}
          >
            <List className="h-5 w-5 mr-0 lg:mr-2" />
            <span className="hidden lg:inline">Table</span>
          </Button>
        </div>
      </div>

      {/* Only render TaskForm if it's open to prevent unnecessary renders */}
      {isAddTaskOpen && (
        <TaskForm
          open={isAddTaskOpen}
          onOpenChange={handleAddTaskOpenChange}
          onSave={handleTaskSaved}
          onSaveAndCreateAnother={handleTaskSavedAndCreateAnother}
          disableMatterSelect={!!matterId}
          matters={matters}
          isLoadingMatters={isLoadingMatters}
          getMatterNameDisplay={(matterId) =>
            getMattersDisplayName(matterId, matters)
          }
          matterId={matterId}
        />
      )}
    </div>
  );
}
