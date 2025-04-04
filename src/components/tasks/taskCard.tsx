"use client";

import { Button } from "@/components/ui/button";
import type { Priority, Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { format, isBefore } from "date-fns";
import { Calendar, Check, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { updateTask, deleteTask } from "@/actions/tasks";
import { getMatters } from "@/actions/matters";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { useState, useEffect } from "react";
import { TaskForm } from "./taskForm";
import { getStatusColor } from "@/utils/getStatusColor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [localTask, setLocalTask] = useState<Task>(task);
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);

  const checkIsOverdue = (dueDate?: Date, status?: string) => {
    if (!dueDate || status === "completed") return false;
    return isBefore(new Date(dueDate), new Date());
  };

  useEffect(() => {
    const overdue = checkIsOverdue(localTask.due_date, localTask.status);
    setIsOverdue(overdue);

    if (overdue && localTask.priority !== "overdue") {
      const updatedTask = {
        ...localTask,
        priority: "overdue" as Priority,
      };
      setLocalTask(updatedTask);
      updateTask(localTask.task_id, { status: localTask.status }, updatedTask)
        .then(() => {
          console.log("Priority updated to overdue in the database");
        })
        .catch((error) => {
          console.error("Failed to update task priority in the database:", error);
          setLocalTask(task);
        });
    }
  }, [localTask, localTask.due_date, localTask.priority, localTask.status, task]);

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  useEffect(() => {
    async function fetchMatters() {
      try {
        setIsLoadingMatters(true);
        const matterData = await getMatters();
        setMatters(matterData);
      } catch (error) {
        console.error("Error fetching matters:", error);
      } finally {
        setIsLoadingMatters(false);
      }
    }
    fetchMatters();
  }, []);

  const formatDate = (date?: Date) => {
    if (!date) return "No date";
    try {
      return format(date, "MMM dd, yyyy");
    } catch (error) {
      console.error(error);
      return "Invalid date";
    }
  };

  const handleComplete = async () => {
    if (isProcessing) return;

    try {
      setLocalTask({
        ...localTask,
        status: "completed",
      });

      await updateTask(
        task.task_id,
        { status: "completed" },
        {
          ...task,
          status: "completed",
        }
      );
      router.refresh();
      window.location.reload();
      toast.success("Task marked as completed");
    } catch (error) {
      console.error("Error completing task:", error);
      setLocalTask(task);
      toast.error("Failed to complete task");
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      await deleteTask(task.task_id);

      toast.success("Task deleted successfully");

      window.location.reload();
      router.refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
      setIsProcessing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveTask = async (updatedTask: Task) => {
    try {
      const optimisticTask = {
        ...updatedTask,
        task_id: task.task_id,
      } as Task;

      setLocalTask(optimisticTask);
      setIsEditing(false);
      await updateTask(task.task_id, updatedTask, optimisticTask);
    } catch (error) {
      console.error("Error updating task:", error);
      setLocalTask(task);
      toast.error("Failed to update task");
    }
  };

  const handleSaveAndCreateAnother = async (updatedTask: Task) => {
    await handleSaveTask(updatedTask);
  };

  const matterName = getMattersDisplayName(localTask.matter_id || "", matters);

  return (
    <>
      <div
        className={`border rounded-lg p-3 sm:p-4 shadow-sm h-full flex flex-col ${
          isOverdue
            ? "border-red-500 bg-red-50 dark:bg-red-950"
            : "bg-white dark:bg-gray-800 dark:border-gray-700"
        }`}
      >
        <div className="mb-2 flex justify-between items-start">
          <h3 className="font-medium text-base sm:text-lg line-clamp-2 dark:text-white">
            {localTask.name}
          </h3>
          {localTask.priority && (
            <Badge
              variant="outline"
              className={`ml-2 flex-shrink-0 text- ${
                isOverdue
                  ? "text-red-600 border-red-600"
                  : getStatusColor(localTask.priority)
              }`}
            >
              {isOverdue ? "overdue" : localTask.priority}
            </Badge>
          )}
        </div>

        {localTask.description && (
          <p className="text-xs sm:text-sm mb-3 line-clamp-3 overflow-y-auto text-muted-foreground dark:text-gray-400$">
            {localTask.description}
          </p>
        )}

        {localTask.matter_id && (
          <div className="text-xs sm:text-sm font-medium mb-2 truncate dark:text-gray-300">
            Matter:{" "}
            {isLoadingMatters
              ? "Loading..."
              : matterName || "No matter assigned"}
          </div>
        )}

        <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-4 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span
            className={`text-xs sm:text-sm line-clamp-3 overflow-y-auto ${
              isOverdue
                ? "text-red-600 font-medium dark:text-red-400"
                : "text-muted-foreground dark:text-gray-400"
            }`}
          >
            Due: {formatDate(localTask.due_date)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t dark:border-gray-700">
          <Badge
            variant="outline"
            className={`text-xs ${getStatusColor(localTask.status)}`}
          >
            {localTask.status}
          </Badge>

          <div className="flex gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3 text-xs"
              onClick={handleComplete}
              disabled={localTask.status === "completed" || isProcessing}
            >
              <Check className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
              <span className="hidden sm:inline">Complete</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3 text-xs"
              onClick={handleEdit}
              disabled={isProcessing}
            >
              <Pencil className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
              <span className="hidden sm:inline">Edit</span>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="h-8 px-2 sm:px-3 text-xs"
              onClick={handleDelete}
              disabled={isProcessing}
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </div>
      </div>

      <TaskForm
        open={isEditing}
        onOpenChange={setIsEditing}
        onSave={handleSaveTask}
        onSaveAndCreateAnother={handleSaveAndCreateAnother}
        initialTask={localTask}
      />
    </>
  );
}