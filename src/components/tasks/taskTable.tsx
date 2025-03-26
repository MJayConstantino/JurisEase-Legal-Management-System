"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useTasks } from "./taskProvider"
import { format } from "date-fns"
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { TaskForm } from "./taskForm"
import { Task, Status } from "@/types/task.type"

export function TasksTable() {
  const { tasks, updateTaskStatus, updateTaskItem, removeTask, isLoading } = useTasks()
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

  const handleStatusChange = (task: Task, checked: boolean) => {
    const newStatus: Status = checked ? "completed" : "pending"
    updateTaskStatus(task.task_id, newStatus)
  }

  const handleSaveTask = async (updatedTask: Partial<Task>) => {
    if (taskToEdit) {
      await updateTaskItem(taskToEdit.task_id, updatedTask)
      setTaskToEdit(null)
    }
  }

  const handleSaveAndCreateAnother = async (updatedTask: Partial<Task>) => {
    if (taskToEdit) {
      await updateTaskItem(taskToEdit.task_id, updatedTask)
      setTaskToEdit(null)
    }
  }

  if (isLoading) {
    return <TasksTableSkeleton />
  }

  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No tasks found. Create a new task to get started.
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="w-12 px-4 py-3"></th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Actions</th>
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.task_id} className="border-b">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={(checked) => 
                      handleStatusChange(task, checked as boolean)
                    }
                  />
                </td>
                <td className="px-4 py-3">
                  {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "-"}
                </td>
                <td className="px-4 py-3">
                  <span className={task.status === "completed" ? "line-through text-muted-foreground" : ""}>
                    {task.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {task.description || "No description"}
                </td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTaskToEdit(task)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => removeTask(task.task_id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {taskToEdit && (
        <TaskForm 
          open={!!taskToEdit} 
          onOpenChange={(open) => !open && setTaskToEdit(null)}
          onSave={handleSaveTask}
          onSaveAndCreateAnother={handleSaveAndCreateAnother}
        />
      )}
    </>
  )
}

function PriorityBadge({ priority }: { priority: Task["priority"] }) {
  const variants = {
    low: "bg-green-100 text-green-800 hover:bg-green-100",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    high: "bg-red-100 text-red-800 hover:bg-red-100",
  }

  return (
    <Badge variant="outline" className={variants[priority]}>
      {priority}
    </Badge>
  )
}

function StatusBadge({ status }: { status: Task["status"] }) {
  const variants = {
    pending: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    completed: "bg-green-100 text-green-800 hover:bg-green-100",
  }

  return (
    <Badge variant="outline" className={variants[status]}>
      {status}
    </Badge>
  )
}

function TasksTableSkeleton() {
  return (
    <div className="p-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center space-x-4 py-3">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-48 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      ))}
    </div>
  )
}
