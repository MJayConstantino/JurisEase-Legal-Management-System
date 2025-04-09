"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Status, Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { format, isBefore } from "date-fns";
import { Calendar, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { updateTask, deleteTask } from "@/actions/tasks";
import { getMatters } from "@/actions/matters";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { useState, useEffect } from "react";
import { TaskForm } from "./taskForm";
import { getStatusColor } from "@/utils/getStatusColor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { TaskDeleteDialog } from "./taskDeleteDialog";
import { useParams } from "next/navigation";

interface TaskCardProps {
  task: Task;
  onTaskUpdated?: () => void;
}

export function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [localTask, setLocalTask] = useState<Task>(task);
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);
  const params = useParams();
  const matterId = params.matterId as string | undefined;

  const checkIsOverdue = (dueDate?: Date, status?: string) => {
    if (!dueDate || status === "completed") return false;
    return isBefore(new Date(dueDate), new Date());
  };

  useEffect(() => {
    const overdue = checkIsOverdue(localTask.due_date, localTask.status);
    setIsOverdue(overdue);

    if (overdue && localTask.status !== "overdue") {
      const updatedTask = {
        ...localTask,
        status: "overdue" as Status,
      };
      setLocalTask(updatedTask);
      updateTask(localTask.task_id, { status: localTask.status }, updatedTask)
        .then(() => {
          console.log("Priority updated to overdue in the database");
        })
        .catch((error) => {
          console.error(
            "Failed to update task priority in the database:",
            error
          );
          setLocalTask(task);
        });
    }
  }, [
    localTask,
    localTask.due_date,
    localTask.priority,
    localTask.status,
    task,
  ]);

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

      let newStatus: Status;

      if (localTask.status === "completed") {
        if (
          localTask.due_date &&
          isBefore(new Date(localTask.due_date), new Date())
        ) {
          newStatus = "overdue";
        } else {
          newStatus = "in-progress";
        }
      } else {
        newStatus = "completed";
      }

      setLocalTask({
        ...localTask,
        status: newStatus,
      });

      await updateTask(
        task.task_id,
        { status: newStatus },
        {
          ...task,
          status: newStatus,
        }
      );
      router.refresh();
      window.location.reload();
      toast.success(
        newStatus === "completed"
          ? "Task marked as completed"
          : `Task marked as ${newStatus}`
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      setLocalTask(task);
      toast.error("Failed to update task status");
    } finally {
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
        className={`border rounded-lg p-3 shadow-sm h-full flex flex-col ${
          isOverdue
            ? "border-red-500 bg-red-50 dark:bg-red-950"
            : localTask.status === "completed"
            ? "border-green-500 bg-green-50 dark:bg-green-950"
            : "bg-white dark:bg-gray-800 dark:border-gray-700"
        }`}
      >
        <div className="mb-2 flex justify-between items-start gap-2">
          <h3 className="font-medium text-sm sm:text-base line-clamp-2 dark:text-white">
            {localTask.name}
          </h3>
          {localTask.priority && (
            <Badge
              variant="outline"
              className={`text-xs whitespace-nowrap flex-shrink-0 ${getStatusColor(
                localTask.priority
              )}`}
            >
              {localTask.priority}
            </Badge>
          )}
        </div>

        {localTask.description && (
          <p className="text-xs sm:text-sm mb-2 line-clamp-2 overflow-y-auto text-muted-foreground dark:text-gray-400">
            {localTask.description}
          </p>
        )}

        {localTask.matter_id && (
          <div className="text-xs sm:text-sm font-medium mb-2 truncate dark:text-gray-300">
            Matter:{" "}
            <span className="font-normal">
              {isLoadingMatters ? (
                <Skeleton className="inline-block w-24 h-4 rounded" />
              ) : (
                matterName || "No matter assigned"
              )}
            </span>
          </div>
        )}

        <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-auto dark:text-gray-400">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="text-xs sm:text-sm line-clamp-1 ext-muted-foreground dark:text-gray-400">
            Due: {formatDate(localTask.due_date)}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-2 pt-2 border-t dark:border-gray-700 gap-y-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`text-xs ${getStatusColor(localTask.status)}`}
            >
              {localTask.status}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1">
            <div className="flex items-center">
              <label
              htmlFor={`task-complete-${task.task_id}`}
              className="text-xs cursor-pointer select-none mr-3 font-medium text-muted-foreground dark:text-gray-400"
              >
              Mark as Complete
              </label>
              <Checkbox
              checked={localTask.status === "completed"}
              onCheckedChange={handleComplete}
              disabled={isProcessing}
              id={`task-complete-${task.task_id}`}
              className={`mr-1 h-7 w-8 border-2 border-gray-300 rounded-md hover:cursor-pointer shadow ${
                localTask.status === "completed" ? "dark:bg-green-700" : "dark:bg-gray-800"
              }`}
              />
            </div>
            <Button
              variant="default"
              size="sm"
              className="hover:cursor-pointer bg-[#2D336B] hover:bg-[#1B1E4B} h-7 w-auto px-1.5 text-xs dark:bg-white"
              onClick={handleEdit}
              disabled={isProcessing}
            >
              <Pencil className="h-3 w-3 mr-1" />
              <span className="hidden xxs:inline">Edit</span>
            </Button>
            <TaskDeleteDialog
              taskName={localTask.name}
              isProcessing={isProcessing}
              onConfirm={handleDelete}
            />
          </div>
        </div>
      </div>

      <TaskForm
        open={isEditing}
        onOpenChange={setIsEditing}
        disableMatterSelect={!!matterId}
        onSave={handleSaveTask}
        onSaveAndCreateAnother={handleSaveAndCreateAnother}
        initialTask={localTask}
      />
    </>
  );
}
