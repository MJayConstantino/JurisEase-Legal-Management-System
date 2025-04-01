"use client";

import { Button } from "@/components/ui/button";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { format } from "date-fns";
import { Calendar, Check, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { updateTask, deleteTask } from "@/actions/tasks";
import { getMatters } from "@/actions/matters";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { useState, useEffect } from "react";
import { TaskForm } from "./taskForm";
import { getStatusColor } from "@/utils/getStatusColor";
import { toast } from "sonner";
interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTask, setLocalTask] = useState<Task>(task);
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

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
      setIsProcessing(true);
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

      toast.success("Task marked as completed");

      window.location.reload();
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

      // Show success toast
      toast.success("Task deleted successfully");

      // Reload the window
      window.location.reload();
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

      // Reload the window
      window.location.reload();
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
      <div className="border rounded-lg p-3 sm:p-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm h-full flex flex-col">
        <div className="mb-2 flex justify-between items-start">
          <h3 className="font-medium text-base sm:text-lg line-clamp-2 dark:text-white">
            {localTask.name}
          </h3>
          {localTask.priority && (
            <Badge
              variant="outline"
              className={`ml-2 flex-shrink-0 text-xs ${getStatusColor(
                localTask.priority
              )}`}
            >
              {localTask.priority}
            </Badge>
          )}
        </div>

        {localTask.description && (
          <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-3 dark:text-gray-400 overflow-y-auto">
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
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span>Due: {formatDate(localTask.due_date)}</span>
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
