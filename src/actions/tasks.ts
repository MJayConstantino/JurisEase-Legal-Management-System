"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "@/lib/supabase"
import type { Status, Task } from "@/types/task.type"

export async function getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true })
    
  if (error) {
    console.error("Error fetching task:", error)
    return []
  }

  return data as Task[]
}

export async function getTaskById(task_id: string) {
  const { data, error } = await supabase.from("tasks").select("*").eq("task_id", task_id).single()

  if (error) {
    console.error("Error fetching tasks:", error)
    return null
  }

  return data as Task
}

export async function createTask(task: Omit<Task, "id">) {
  const { data, error } = await supabase.from("tasks").insert([task]).select() 

  if (error) {
    console.error("Error creating task:", error.message, error.details)
    return null
  }

  revalidatePath("/tasks")
  return data ? (data[0] as Task) : null
}

export async function updateTask(id: string, p0: { status: Status }, task: Task) {
  const { data, error } = await supabase.from("tasks").update(task).eq("task_id", task.task_id).select()

  if (error) {
    console.error("Error updating task:", error)
  }

  revalidatePath("/tasks")
  return data ? (data[0] as Task) : null
}

export async function deleteTask(task_id: string) {
  const { error } = await supabase.from("tasks").delete().eq("task_id", task_id)

  if (error) {
    console.error("Error deleting task:", error)
  }

  revalidatePath("/tasks")
  return true
}

