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

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTask, setLocalTask] = useState<Task>(task);
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);

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
    try {
      // Update local state immediately for optimistic UI
      setLocalTask({
        ...localTask,
        status: "completed",
      });

      // Update on server
      await updateTask(
        task.task_id,
        { status: "completed" },
        {
          ...task,
          status: "completed",
        }
      );
    } catch (error) {
      console.error("Error completing task:", error);
      // Revert optimistic update on error
      setLocalTask(task);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.task_id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveTask = async (updatedTask: Task) => {
    try {
      // Create a merged task for optimistic UI update
      const optimisticTask = {
        ...localTask,
        ...updatedTask,
      } as Task;

      // Update local state immediately
      setLocalTask(optimisticTask);

      // Close the form immediately for better UX
      setIsEditing(false);

      // Update the task on the server
      await updateTask(task.task_id, { status: task.status }, optimisticTask);
    } catch (error) {
      console.error("Error updating task:", error);
      // Revert optimistic update on error
      setLocalTask(task);
    }
  };

  const handleSaveAndCreateAnother = async (updatedTask: Task) => {
    // For editing, we don't need to implement "save and create another"
    // Just call the regular save function
    await handleSaveTask(updatedTask);
  };

  // Get matter name from matter ID
  const matterName = getMattersDisplayName(localTask.matter_id || "", matters);

  return (
    <>
      <div className="border rounded-lg p-3 sm:p-4 bg-white shadow-sm h-full flex flex-col">
        <div className="mb-2 flex justify-between items-start">
          <h3 className="font-medium text-base sm:text-lg line-clamp-2">
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
          <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-3">
            {localTask.description}
          </p>
        )}

        {localTask.matter_id && (
          <div className="text-xs sm:text-sm font-medium mb-2 truncate">
            Matter:{" "}
            {isLoadingMatters
              ? "Loading..."
              : matterName || "No matter assigned"}
          </div>
        )}

        <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-4">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span>Due: {formatDate(localTask.dueDate)}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t">
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
              disabled={localTask.status === "completed"}
            >
              <Check className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
              <span className="hidden sm:inline">Complete</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3 text-xs"
              onClick={handleEdit}
            >
              <Pencil className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
              <span className="hidden sm:inline">Edit</span>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="h-8 px-2 sm:px-3 text-xs"
              onClick={handleDelete}
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
      />
    </>
  );
}
