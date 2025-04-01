"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/types/task.type"
import { getTasks } from "@/actions/tasks"
import { TaskRow } from "./taskRow"
import { TaskCard } from "./taskCard"
import { TasksHeader } from "./taskHeader"

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [view, setView] = useState<"grid" | "table">("grid")

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        searchTerm === "" ||
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.task_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.matter_id?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "pending" && task.status === "pending") ||
        (statusFilter === "completed" && task.status === "completed")

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const dateA = a.due_date ? new Date(a.due_date).getTime() : 0
      const dateB = b.due_date ? new Date(b.due_date).getTime() : 0
      return dateA - dateB
    })

  const handleStatusChange = (status: string) => {
    setStatusFilter(status)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleViewChange = (newView: "grid" | "table") => {
    setView(newView)
  }

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [task, ...prevTasks])
  }

  return (
    <div className="container mx-auto py-2">
      <TasksHeader
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onViewChange={handleViewChange}
        view={view}
        onTaskCreated={addTask}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-muted-foreground">
          <p>No tasks found. Create a new task to get started.</p>
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
            <TaskRow key={task.task_id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

