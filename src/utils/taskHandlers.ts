import type { Task, Status } from "@/types/task.type";
import { toast } from "sonner";
import { format, isBefore, parseISO } from "date-fns";
import {
  handleUpdateTask as serverUpdateTask,
  handleDeleteTask as serverDeleteTask,
} from "@/action-handlers/tasks";

export const handleComplete = async function (
  task: Task,
  localTask: Task,
  setLocalTask: (task: Task) => void,
  onTaskUpdated: (updatedTask: Task) => void,
  setIsProcessing: (isProcessing: boolean) => void,
  isProcessing: boolean
) {
  if (isProcessing) {
    toast.error("Please wait, task is being processed");
    return;
  }

  console.log("Toggling task completion for:", localTask);

  try {
    setIsProcessing(true);
    const newStatus: Status =
      localTask.status === "completed" ? "in-progress" : "completed";

    const updatedTask = {
      ...localTask,
      status: newStatus,
    };
    setLocalTask(updatedTask);
    onTaskUpdated(updatedTask);

    const { task: serverUpdatedTask, error } = await serverUpdateTask(
      updatedTask
    );
    if (error || !serverUpdatedTask)
      throw new Error(error || "Failed to update task on server");

    setLocalTask(serverUpdatedTask);
    onTaskUpdated(serverUpdatedTask);

    toast.success(
      newStatus === "completed"
        ? "Task marked as completed"
        : "Task marked as in-progress"
    );

  } catch (error) {
    console.error("Error updating task status:", error);
    setLocalTask(task);
    toast.error(
      "Failed to update task status: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
    setIsProcessing(false);
  }
  finally {
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);  }
    console.log("Task completion toggled for:", localTask);
};

export async function handleSaveTask(
  originalTask: Task,
  updatedTask: Task,
  setLocalTask: (task: Task) => void,
  onTaskUpdated: (task: Task) => void,
  setIsProcessing: (loading: boolean) => void,
  onDone?: () => void
) {
  try {
    setIsProcessing(true);

    const savedTask = { ...originalTask, ...updatedTask };
    const { task: serverUpdatedTask, error } = await serverUpdateTask(
      savedTask
    );

    if (error || !serverUpdatedTask)
      throw new Error(error || "Failed to save task");

    setLocalTask(serverUpdatedTask);
    onTaskUpdated(serverUpdatedTask);

    toast.success("Task saved successfully");

    onDone?.();
  } catch (error) {
    console.error("Failed to save task:", error);
    toast.error(
      "Failed to save task: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  } finally {
    setIsProcessing(false);
  }
}

export const handleDelete = async (
  taskId: string,
  onTaskDeleted: (deletedTaskId: string) => void,
  setIsProcessing: (isProcessing: boolean) => void
) => {
  console.log("Deleting task:", taskId);
  try {
    setIsProcessing(true);

    const { error } = await serverDeleteTask(taskId);
    if (error) throw new Error(error);

    onTaskDeleted(taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error(
      "Failed to delete task: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  } finally {
    setIsProcessing(false);
  }
};

export const formatDate = (date?: string | Date | null): string => {
  if (!date) return "No date";
  try {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return format(parsedDate, "MMM dd, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

export const isTaskOverdue = (
  dueDate?: string | Date,
  status?: string
): boolean => {
  if (!dueDate || status === "completed") return false;

  const parsedDueDate =
    typeof dueDate === "string" ? parseISO(dueDate) : dueDate;

  const endOfDueDate = new Date(parsedDueDate);
  endOfDueDate.setHours(23, 59, 59, 999);

  return isBefore(endOfDueDate, new Date());
};
