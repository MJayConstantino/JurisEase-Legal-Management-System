"use client"

import { Button } from "@/components/ui/button"
import type { Task } from "@/types/task.type"
import type { Matter } from "@/types/matter.type"
import { format } from "date-fns"
import { Check, Pencil, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { updateTask, deleteTask } from "@/actions/tasks"
import { getMatters } from "@/actions/matters"
import { getMattersDisplayName } from "@/utils/getMattersDisplayName"
import { TaskForm } from "./taskForm"
import { getStatusColor } from "@/utils/getStatusColor"
interface TaskRowProps {
  task: Task
}

export function TaskRow({ task }: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localTask, setLocalTask] = useState<Task>(task)
  const [matters, setMatters] = useState<Matter[]>([])
  const [isLoadingMatters, setIsLoadingMatters] = useState(true)

  useEffect(() => {
    async function fetchMatters() {
      try {
        setIsLoadingMatters(true)
        const matterData = await getMatters()
        setMatters(matterData)
      } catch (error) {
        console.error("Error fetching matters:", error)
      } finally {
        setIsLoadingMatters(false)
      }
    }
    fetchMatters()
  }, [])

  const formatDate = (date?: Date) => {
    if (!date) return "No date"
    try {
      return format(date, "MMM dd, yyyy")
    } catch (error) {
      return "Invalid date"
    }
  }

  const handleComplete = async () => {
    try {
      // Update local state immediately for optimistic UI
      setLocalTask({
        ...localTask,
        status: "completed",
      })

      // Update on server
      await updateTask(
        task.task_id,
        { status: "completed" },
        {
          ...task,
          status: "completed",
        },
      )
    } catch (error) {
      console.error("Error completing task:", error)
      // Revert optimistic update on error
      setLocalTask(task)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask(task.task_id)
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveTask = async (updatedTask: Task) => {
    try {
      // Create a merged task for optimistic UI update
      const optimisticTask = {
        ...localTask,
        ...updatedTask,
      } as Task

      // Update local state immediately
      setLocalTask(optimisticTask)

      // Close the form immediately for better UX
      setIsEditing(false)

      // Update the task on the server
      await updateTask(task.task_id, { status: task.status }, optimisticTask)
    } catch (error) {
      console.error("Error updating task:", error)
      // Revert optimistic update on error
      setLocalTask(task)
    }
  }

  const handleSaveAndCreateAnother = async (updatedTask: Task) => {
    // For editing, we don't need to implement "save and create another"
    // Just call the regular save function
    await handleSaveTask(updatedTask)
  }

  // Get matter name from matter ID
  const matterName = getMattersDisplayName(localTask.matter_id || "", matters)

  return (
    <>
      <div className="flex items-center justify-between p-3 sm:p-4 border-b hover:bg-muted/20">
        <div className="flex-1 min-w-0 mr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium truncate">{localTask.name}</h3>
            {localTask.priority && (
              <Badge variant="outline" className={`text-xs ${getStatusColor(localTask.priority)}`}>
                {localTask.priority}
              </Badge>
            )}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground truncate">
            {isLoadingMatters ? "Loading matter..." : matterName || "No matter assigned"}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="text-xs sm:text-sm hidden sm:block">{formatDate(localTask.dueDate)}</div>

          <div className="w-16 sm:w-24">
            <Badge variant="outline" className={`text-xs ${getStatusColor(localTask.status)}`}>
              {localTask.status}
            </Badge>
          </div>

          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleComplete} disabled={localTask.status === "completed"}>
              <Check className="h-4 w-4" />
              <span className="sr-only">Complete</span>
            </Button>

            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </div>

      <TaskForm
        open={isEditing}
        onOpenChange={setIsEditing}
        onSave={handleSaveTask}
        onSaveAndCreateAnother={handleSaveAndCreateAnother}
      />
    </>
  )
}

