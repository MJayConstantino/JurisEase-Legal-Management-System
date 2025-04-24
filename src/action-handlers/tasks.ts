"use server";

import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import type { Priority, Task } from "@/types/task.type";
import {
  createTask,
  deleteTask,
  updateTask,
  getTasks,
  getTasksByMatterId,
} from "@/actions/tasks";
import { TaskStatus } from "@/components/header/globalSearch/types";

interface CreateTaskInput {
  name: string;
  description?: string | null | ""
  due_date?: Date;
  matter_id?: string;
  status: TaskStatus;
  priority: Priority;
}

export const handleCreateTask = async (
  taskData: CreateTaskInput
): Promise<{ task?: Task; error: string | null }> => {
  if (!taskData.name?.trim()) {
    return { error: "Task name is required" };
  }

  try {
    const newTask = await createTask({
      name: taskData.name,
      due_date: taskData.due_date,
      matter_id: taskData.matter_id,
      status: taskData.status || "in-progress",
      priority: taskData.priority || "low",
      description: "",
      created_at: new Date(),
    });

    if (!newTask) throw new Error("Failed to create task");

    revalidatePath("/tasks");
    return { task: newTask, error: null };
  } catch (error: any) {
    console.error("Error in handleCreateTask:", error);
    return { error: "Failed to create task." };
  }
};

export const handleUpdateTask = async (
  taskId: string,
  updateData: Partial<Task>,
  optimisticTask?: Task
): Promise<{ task?: Task; error: string | null }> => {
  try {
    const result = await updateTask(
      taskId,
      { status: updateData.status || "in-progress" },
      {
        ...updateData,
        task_id: taskId,
      } as Task
    );

    if (!result) {
      throw new Error("Failed to update task in database");
    }

    revalidatePath("/tasks");
    return { task: result, error: null };
  } catch (error: unknown) {
    console.error("Error updating task:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to update task",
      task: optimisticTask,
    };
  }
};

export const handleDeleteTask = async (
  taskId: string
): Promise<{ error: string | null }> => {
  try {
    const success = await deleteTask(taskId);

    if (!success) throw new Error("Failed to delete task");

    toast.success("Task deleted successfully.");
    revalidatePath("/tasks");
    return { error: null };
  } catch (error: any) {
    console.error("Error in handleDeleteTask:", error);
    toast.error("Failed to delete task. Please try again.");
    return { error: "Failed to delete task." };
  }
};

export const handleFetchTasks = async (): Promise<{
  tasks: Task[];
  error: string | null;
}> => {
  try {
    const tasks = await getTasks();
    return { tasks, error: null };
  } catch (error: any) {
    console.error("Error in handleFetchTasks:", error);
    toast.error("Failed to fetch tasks. Please try again.");
    return { tasks: [], error: "Failed to fetch tasks." };
  }
};

export const handleFetchTasksByMatterId = async (
  matterId: string
): Promise<{ tasks: Task[]; error: string | null }> => {
  try {
    const tasks = await getTasksByMatterId(matterId);

    if (!tasks) throw new Error("Failed to fetch tasks for the matter");

    return { tasks, error: null };
  } catch (error: any) {
    console.error("Error in handleFetchTasksByMatterId:", error);
    toast.error("Failed to fetch tasks for the matter. Please try again.");
    return { tasks: [], error: "Failed to fetch tasks for the matter." };
  }
};
