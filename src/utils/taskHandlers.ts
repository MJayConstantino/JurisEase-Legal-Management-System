import type { Task, Status } from "@/types/task.type";
import { toast } from "sonner";
import { format, isBefore, parseISO } from "date-fns";
import {
  handleUpdateTask as serverUpdateTask,
  handleDeleteTask as serverDeleteTask,
} from "@/action-handlers/tasks";

// Use a debounce mechanism to prevent multiple rapid calls
const taskProcessingMap = new Map<string, boolean>();
const DEBOUNCE_TIME = 1000; // 1 second

export const handleComplete = async function (
  task: Task,
  localTask: Task,
  setLocalTask: (task: Task) => void,
  onTaskUpdated: (updatedTask: Task) => void,
  setIsProcessing: (isProcessing: boolean) => void,
  isProcessing: boolean
) {
  // Check if already processing this task
  if (isProcessing || taskProcessingMap.get(task.task_id)) {
    toast.error("Please wait, task is being processed");
    return;
  }

  try {
    // Set the task as processing in our map and UI
    taskProcessingMap.set(task.task_id, true);
    setIsProcessing(true);

    const newStatus: Status =
      localTask.status === "completed" ? "in-progress" : "completed";

    // Optimistically update UI
    const updatedTask = {
      ...localTask,
      status: newStatus,
    };
    setLocalTask(updatedTask);
    onTaskUpdated(updatedTask);

    // Send update to server
    const { task: serverUpdatedTask, error } = await serverUpdateTask(
      updatedTask
    );

    if (error || !serverUpdatedTask) {
      throw new Error(error || "Failed to update task on server");
    }

    // Apply server response
    setLocalTask(serverUpdatedTask);
    onTaskUpdated(serverUpdatedTask);

    toast.success(
      newStatus === "completed"
        ? `Task "${serverUpdatedTask.name}" marked as complete`
        : `Task "${serverUpdatedTask.name}" unmarked as complete`
    );
  } catch (error) {
    console.error("Error updating task status:", error);
    // Revert to original state on error
    setLocalTask(task);
    onTaskUpdated(task);

    toast.error(
      "Failed to update task status: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  } finally {
    // Clear processing state with a delay to prevent rapid clicking
    setTimeout(() => {
      taskProcessingMap.delete(task.task_id);
      setIsProcessing(false);
    }, DEBOUNCE_TIME);
  }
};

export async function handleSaveTask(
  originalTask: Task,
  updatedTask: Task,
  setLocalTask: (task: Task) => void,
  onTaskUpdated: (task: Task) => void,
  setIsProcessing: (loading: boolean) => void,
  onDone?: () => void
) {
  if (taskProcessingMap.get(originalTask.task_id)) {
    toast.error("Please wait, task is being processed");
    return;
  }

  try {
    taskProcessingMap.set(originalTask.task_id, true);
    setIsProcessing(true);

    // Optimistically update UI
    const savedTask = { ...originalTask, ...updatedTask };
    setLocalTask(savedTask);
    onTaskUpdated(savedTask);

    // Send update to server
    const { task: serverUpdatedTask, error } = await serverUpdateTask(
      savedTask
    );

    if (error || !serverUpdatedTask) {
      throw new Error(error || "Failed to save task");
    }

    // Apply server response
    setLocalTask(serverUpdatedTask);
    onTaskUpdated(serverUpdatedTask);

    onDone?.();
  } catch (error) {
    console.error("Failed to save task:", error);
    // Revert on error
    setLocalTask(originalTask);
    onTaskUpdated(originalTask);

    toast.error(
      "Failed to save task: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  } finally {
    setTimeout(() => {
      taskProcessingMap.delete(originalTask.task_id);
      setIsProcessing(false);
    }, DEBOUNCE_TIME);
  }
}

export const handleDelete = async (
  taskId: string,
  onTaskDeleted: (deletedTaskId: string) => void,
  setIsProcessing: (isProcessing: boolean) => void
) => {
  if (taskProcessingMap.get(taskId)) {
    toast.error("Please wait, task is being processed");
    return;
  }

  try {
    taskProcessingMap.set(taskId, true);
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
    setTimeout(() => {
      taskProcessingMap.delete(taskId);
      setIsProcessing(false);
    }, DEBOUNCE_TIME);
  }
};

// Memoize formatted dates
const dateCache = new Map<string, string>();

export const formatDate = (date?: string | Date | null): string => {
  if (!date) return "No date";

  try {
    const dateString = date instanceof Date ? date.toISOString() : String(date);

    // Check cache first
    if (dateCache.has(dateString)) {
      return dateCache.get(dateString)!;
    }

    const parsedDate = typeof date === "string" ? new Date(date) : date;
    const formatted = format(parsedDate, "MMM dd, yyyy");

    // Store in cache
    dateCache.set(dateString, formatted);
    return formatted;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

// Memoize overdue calculations
const overdueCache = new Map<string, boolean>();

export const isTaskOverdue = (
  dueDate?: string | Date,
  status?: string
): boolean => {
  if (!dueDate || status === "completed") return false;

  const dueDateString =
    dueDate instanceof Date ? dueDate.toISOString() : String(dueDate);
  const cacheKey = `${dueDateString}-${status}`;

  // Check cache first
  if (overdueCache.has(cacheKey)) {
    return overdueCache.get(cacheKey)!;
  }

  const parsedDueDate =
    typeof dueDate === "string" ? parseISO(dueDate) : dueDate;

  const endOfDueDate = new Date(parsedDueDate);
  endOfDueDate.setHours(23, 59, 59, 999);

  const result = isBefore(endOfDueDate, new Date());

  // Store in cache
  overdueCache.set(cacheKey, result);
  return result;
};

// Clear caches periodically to avoid memory issues
setInterval(() => {
  dateCache.clear();
  overdueCache.clear();
}, 5 * 60 * 1000); // Every 5 minutes
