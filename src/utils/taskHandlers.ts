import type { Status, Task } from "@/types/task.type";
import { handleUpdateTask, handleDeleteTask } from "@/action-handlers/tasks";
import { toast } from "sonner";
import { isBefore } from "date-fns";
import { handleCreateTask as createTask } from "@/action-handlers/tasks";

export const handleComplete = async (
_taskId: string,
  task: Task,
  setTask: (task: Task) => void,
  onTaskUpdated: (updatedTask: Task) => void,
  setIsProcessing: (isProcessing: boolean) => void
) => {
  if (task.status === "completed") return;

  try {
    setIsProcessing(true);

    let newStatus: Status;

    if (task.status === ("completed" as Status)) {
      if (task.due_date && isBefore(new Date(task.due_date), new Date())) {
        newStatus = "overdue";
      } else {
        newStatus = "in-progress";
      }
    } else {
      newStatus = "completed";
    }

    const updatedTask = { ...task, status: newStatus };
    setTask(updatedTask);

    const result = await handleUpdateTask(task.task_id, { status: newStatus });
    if (result.error) throw new Error(result.error);

    onTaskUpdated(updatedTask);
    toast.success(
      newStatus === "completed"
        ? "Task marked as completed"
        : `Task marked as ${newStatus}`
    );
  } catch (error) {
    console.error("Error updating task status:", error);
    toast.error("Failed to update task status");
  } finally {
    setIsProcessing(false);
  }
};

export const handleSaveTask = async (
  task: Task,
  updatedTask: Task,
  setTask: (task: Task) => void,
  onTaskUpdated: (updatedTask: Task) => void,
  setIsEditing: (isEditing: boolean) => void
) => {
  try {
    const optimisticTask = { ...task, ...updatedTask };
    setTask(optimisticTask);
    setIsEditing(false);

    const result = await handleUpdateTask(task.task_id, updatedTask);
    if (result.error) throw new Error(result.error);

    onTaskUpdated(optimisticTask);
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Failed to update task");
  }
};

export const handleDelete = async (
  taskId: string,
  onTaskDeleted: (taskId: string) => void,
  setIsProcessing: (isProcessing: boolean) => void
) => {
  try {
    setIsProcessing(true);

    const { error } = await handleDeleteTask(taskId);
    if (error) throw new Error(error);

    onTaskDeleted(taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Failed to delete task");
  } finally {
    setIsProcessing(false);
  }
};

const handleCreateTask = async (
  newTask: Task,
  options: {
    onSave?: (task: Task) => void;
    onSaveAndCreateAnother?: (task: Task) => void;
    resetTaskForm?: () => void;
    onOpenChange?: (open: boolean) => void;
    setIsSubmitting?: (isSubmitting: boolean) => void;
  }
) => {
  const {
    onSave,
    onSaveAndCreateAnother,
    resetTaskForm,
    onOpenChange,
    setIsSubmitting,
  } = options;

  if (!newTask.name.trim()) {
    toast.error("Task name is required");
    return;
  }

  if (setIsSubmitting) setIsSubmitting(true);

  try {
    const taskToCreate = {
      ...newTask,
      due_date: newTask.due_date ? new Date(newTask.due_date) : undefined,
      matter_id: newTask.matter_id || undefined,
    };

    const response = await createTask(taskToCreate);

    if (response && !response.error && response.task) {
      toast.success("Task created successfully");

      if (onSaveAndCreateAnother) {
        onSaveAndCreateAnother(response.task as Task);
        if (resetTaskForm) resetTaskForm();
      } else if (onSave) {
        onSave(response.task as Task);
      }

      if (onOpenChange) onOpenChange(false);
      if (resetTaskForm) resetTaskForm();
    } else {
      toast.error(response.error || "Failed to save task to the database.");
    }
  } catch (error) {
    console.error("Error saving task:", error);
    toast.error("Failed to save task to the database.");
  } finally {
    if (setIsSubmitting) setIsSubmitting(false);
  }
};

export const taskHandlers = {
  handleComplete,
  handleSaveTask,
  handleDelete,
  handleCreateTask,
};
