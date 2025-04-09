"use client"

import { useState, useEffect, useCallback } from "react"
import type { Task } from "@/types/task.type"
import { getTasks } from "@/actions/tasks"
import { getTasksByMatterId } from "@/actions/tasks"
import { TaskRow } from "./taskRow"
import { TaskCard } from "./taskCard"
import { TasksHeader } from "./taskHeader"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface TaskListProps {
  matterId?: string
}

export function TaskList({ matterId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [view, setView] = useState<"grid" | "table">("grid")

  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = matterId ? await getTasksByMatterId(matterId) : await getTasks()
      setTasks(data ?? [])
    } catch (error) {
      console.error("Error fetching tasks:", error)
      toast.error("Failed to load tasks")
    } finally {
      setIsLoading(false)
    }
  }, [matterId])

  useEffect(() => {
    fetchTasks()

    const channel = supabase
      .channel(`tasks-changes-${matterId || "all"}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          ...(matterId ? { filter: `matter_id=eq.${matterId}` } : {}),
        },
        (payload) => {
          console.log("Change received!", payload)
          fetchTasks()

          if (payload.eventType === "INSERT") {
            toast.success("New task added")
          } else if (payload.eventType === "UPDATE") {
            toast.success("Task updated")
          } else if (payload.eventType === "DELETE") {
            toast.success("Task deleted")
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchTasks, matterId])

  const filteredTasks = tasks
    .filter((task) => {

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "in-progress" && task.status === "in-progress") ||
        (statusFilter === "overdue" && task.status === "overdue") ||
        (statusFilter === "completed" && task.status === "completed")

      return matchesStatus
    })
    .sort((a, b) => {
      if (a.status === "overdue" && b.status !== "overdue") return -1
      if (a.status !== "overdue" && b.status === "overdue") return 1

      if (a.status === "completed" && b.status !== "completed") return 1
      if (a.status !== "completed" && b.status === "completed") return -1

      const dateA = a.due_date ? new Date(a.due_date).getTime() : 0
      const dateB = b.due_date ? new Date(b.due_date).getTime() : 0
      return dateA - dateB
    })

  const handleStatusChange = (status: string) => {
    setStatusFilter(status)
  }


  const handleViewChange = (newView: "grid" | "table") => {
    setView(newView)
  }

  const handleTaskCreated = (task: Task) => {
    if (!matterId || task.matter_id === matterId) {
      setTasks((prevTasks) => [task, ...prevTasks])
    }
  }

  return (
    <div className="container mx-auto py-2 w-full">
      <TasksHeader
        onStatusChange={handleStatusChange}
        onViewChange={handleViewChange}
        view={view}
        onTaskCreated={handleTaskCreated}
        matter_id={matterId} // Pass the matter_id to pre-fill in new tasks
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-muted-foreground">
          <p>
            {matterId
              ? "No tasks found for this matter. Create a new task to get started."
              : "No tasks found. Create a new task to get started."}
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.task_id} task={task} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          {filteredTasks.map((task) => (
            <TaskRow key={task.task_id} task={task} onTaskUpdated={fetchTasks} />
          ))}
        </div>
      )}
    </div>
  )
}

