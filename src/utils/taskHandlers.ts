import type { Task, Status } from "@/types/task.type";
import { toast } from "sonner";
import { format, isBefore, parseISO } from "date-fns";
import { updateTask, deleteTask } from "@/actions/tasks";

export const handleComplete = async (
  task: Task,
  localTask: Task,
  setLocalTask: (task: Task) => void,
  onTaskUpdated: (updatedTask: Task) => void,
  setIsProcessing: (isProcessing: boolean) => void
) => {
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

    const serverUpdatedTask = await updateTask(updatedTask);
    if (!serverUpdatedTask) throw new Error("Failed to update task on server");

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
    toast.error("Failed to update task status");
  } finally {
    setIsProcessing(false);
  }
};

export const handleSaveTask = async (
  task: Task,
  updatedTask: Task,
  setLocalTask: (task: Task) => void,
  onTaskUpdated: (updatedTask: Task) => void,
  setIsProcessing: (isProcessing: boolean) => void
) => {
  try {
    setIsProcessing(true);

    const optimisticTask = {
      ...task,
      ...updatedTask,
    };
    setLocalTask(optimisticTask);
    onTaskUpdated(optimisticTask);

      const serverUpdatedTask = await updateTask(optimisticTask);
    if (!serverUpdatedTask) throw new Error("Failed to update task on server");

    setLocalTask(serverUpdatedTask);
    onTaskUpdated(serverUpdatedTask);

  } catch (error) {
    console.error("Error updating task:", error);
    setLocalTask(task); 
    toast.error("Failed to update task");
  } finally {
    setIsProcessing(false);
  }
};

export const handleDelete = async (
  taskId: string,
  onTaskDeleted: (deletedTaskId: string) => void,
  setIsProcessing: (isProcessing: boolean) => void
) => {
  console.log("Deleting task:", taskId);
  try {
    setIsProcessing(true);
    onTaskDeleted(taskId);

    const success = await deleteTask(taskId);
    if (!success) throw new Error("Failed to delete task on server");

  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Failed to delete task");
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
