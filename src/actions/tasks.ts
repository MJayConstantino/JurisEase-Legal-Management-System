"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import type { Task } from "@/types/task.type";

export async function getTasksByMatterId(matterId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("matter_id", matterId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks for matter:", error);
    return [];
  }

  return data as Task[];
}

export async function createTasksbyMatterId(matterId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ matter_id: matterId })
    .select();

  if (error) {
    console.error("Error creating tasks for matter:", error);
    return null;
  }

  return data as Task[];
}

export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching task:", error);
    return [];
  }

  return data as Task[];
}

export async function getTaskById(task_id: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("task_id", task_id)
    .single();

  if (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }

  return data as Task;
}

export async function createTask(task: Omit<Task, "task_id">) {
  const { data, error } = await supabase.from("tasks").insert([task]).select();

  if (error) {
    console.error("Error creating task:", error.message, error.details);
    return null;
  }

  revalidatePath("/tasks");
  return data ? (data[0] as Task) : null;
}

export async function updateTask(task: Task) {
  const { data, error } = await supabase
    .from("tasks")
    .update(task)
    .eq("task_id", task.task_id)
    .select();

  if (error) {
    console.error("Error updating task:", error);
    return null;
  }

  revalidatePath("/tasks");
  return data ? (data[0] as Task) : null;
}

export async function deleteTask(task_id: string) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("task_id", task_id);

  if (error) {
    console.error("Error deleting task:", error);
  }

  revalidatePath("/tasks");
  return true;
}
