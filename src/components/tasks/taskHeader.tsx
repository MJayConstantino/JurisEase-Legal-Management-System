"use client"

import { Plus, Search, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import type { Task } from "@/types/task.type"
import { createTask } from "@/actions/tasks"
import { TaskForm } from "./taskForm"
import { toast } from "sonner"

interface TasksHeaderProps {
  onSearch: (term: string) => void
  onStatusChange: (status: string) => void
  onViewChange: (view: "grid" | "table") => void
  view: "grid" | "table"
  onTaskCreated?: (task: Task) => void
}

export function TasksHeader({ onSearch, onStatusChange, onViewChange, view, onTaskCreated }: TasksHeaderProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

  const handleSaveTask = async (task: Task) => {
    try {
      const newTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
        matter_id: task.matter_id,
      } as Omit<Task, "id">

      setIsAddTaskOpen(false)

      const createdTask = await createTask(newTask)

      if (createdTask && onTaskCreated) {
        onTaskCreated(createdTask)
      }

    } catch (error) {
      console.error("Error creating task:", error)
      toast.error("Failed to create task")
    }
  }

  const handleSaveAndCreateAnother = async (task: Task) => {
    try {
      const newTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
        matter_id: task.matter_id,
      } as Omit<Task, "id">

      const createdTask = await createTask(newTask)

      if (createdTask && onTaskCreated) {
        onTaskCreated(createdTask)
      }
    } catch (error) {
      console.error("Error creating task:", error)
      toast.error("Failed to create task")
    }
  }

  return (
    <div className="w-full">
      {/* Top section with title and view toggle - stack on mobile, side by side on larger screens */}
      <div className=" flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6"></div>

      {/* Main controls section */}
      <div className="bg-white shadow dark:bg-gray-800 rounded-lg p-1 sm:p-4 border dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          {/* Mobile view toggle */}
          <div className="flex sm:hidden justify-between items-center">
            <div className="bg-muted rounded-lg p-1 flex">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-md p-2"
                onClick={() => onViewChange("grid")}
              >
                <Grid className="h-4 w-4" />
                <span className="sr-only">Grid View</span>
              </Button>
              <Button
                variant={view === "table" ? "default" : "ghost"}
                size="sm"
                className="rounded-md p-2"
                onClick={() => onViewChange("table")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">Table View</span>
              </Button>
            </div>

            <Button variant="default" size="sm" onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              <span className="dark:text-white">New</span>
            </Button>
          </div>

          {/* Desktop new task button */}
          <div className="hidden sm:block">
            <Button variant="default" onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              <span className="dark:text-grey-800">New Task</span>
            </Button>
          </div>

          {/* Tabs and search - stack on mobile */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Tabs defaultValue="all" className="w-full sm:w-fit" onValueChange={onStatusChange}>
              <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
                <TabsTrigger value="all">
                  <span className="dark:text-white">All</span>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  <span className="dark:text-white">Pending</span>
                </TabsTrigger>
                <TabsTrigger value="completed">
                  <span className="dark:text-white">Completed</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="w-full sm:w-[250px] pl-8 dark:text-gray-400"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <div className="hidden sm:flex sm:items-center sm:gap-2">
              <div className="bg-muted rounded-lg p-1 flex">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-md"
                  onClick={() => onViewChange("grid")}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  <span className="dark:text-grey-800">Grid View</span>
                </Button>
                <Button
                  variant={view === "table" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-md"
                  onClick={() => onViewChange("table")}
                >
                  <List className="h-4 w-4 mr-2" />
                  <span className="dark:text-grey-800">Table View</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <TaskForm
          open={isAddTaskOpen}
          onOpenChange={setIsAddTaskOpen}
          onSave={handleSaveTask}
          onSaveAndCreateAnother={handleSaveAndCreateAnother}
        />
      </div>
    </div>
  )
}

