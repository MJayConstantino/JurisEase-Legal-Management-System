"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { Calendar, Edit, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { useState } from "react";
import { TaskForm } from "./taskForm";
import { getStatusColor } from "@/utils/getStatusColor";
import { Skeleton } from "../ui/skeleton";
import { TaskDeleteDialog } from "./taskDeleteDialog";
import { useParams } from "next/navigation";
import {
  handleComplete,
  handleSaveTask,
  handleDelete,
  formatDate,
} from "@/utils/taskHandlers";

interface TaskCardProps {
  task: Task;
  isLoadingMatters: boolean;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (deletedTaskId: string) => void;
  matters: Matter[];
  isOverdue?: boolean;
  setIsOverdue?: (isOverdue: boolean) => void;
  matterName?: string;
}

export function TaskCard({
  task,
  onTaskUpdated,
  onTaskDeleted,
  matters = [],
  isLoadingMatters = false,
  isOverdue = false,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTask, setLocalTask] = useState<Task>(task);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const params = useParams();
  const matterId = params.matterId as string | undefined;

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

        {localTask.matter_id && !matterId && (
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
                onCheckedChange={() =>
                  handleComplete(
                    task,
                    localTask,
                    setLocalTask,
                    onTaskUpdated,
                    setIsProcessing
                  )
                }
                disabled={isProcessing}
                id={`task-complete-${task.task_id}`}
                className={`mr-1 h-7 w-8 border-2 border-gray-300 rounded-md hover:cursor-pointer shadow ${
                  localTask.status === "completed"
                    ? "dark:bg-green-700"
                    : "dark:bg-gray-800"
                }`}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 md:h-9 md:w-9"
              onClick={() => setIsEditing(true)}
              disabled={isProcessing}
            >
              <Edit className="h-3 w-3 md:h-4 md:w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 md:h-9 md:w-9"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isProcessing}
            >
              <Trash2Icon className="h-3 w-3 md:h-4 md:w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </div>

      <TaskForm
        open={isEditing}
        onOpenChange={setIsEditing}
        disableMatterSelect={!!matterId}
        onSave={(updatedTask) =>
          handleSaveTask(
            task,
            updatedTask,
            setLocalTask,
            onTaskUpdated,
            setIsProcessing
          )
        }
        onSaveAndCreateAnother={(updatedTask) =>
          handleSaveTask(
            task,
            updatedTask,
            setLocalTask,
            onTaskUpdated,
            setIsProcessing
          )
        }
        initialTask={localTask}
        matters={matters}
        isLoadingMatters={isLoadingMatters}
        getMatterNameDisplay={(matterId) =>
          getMattersDisplayName(matterId, matters)
        }
      />

      <TaskDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        task={task}
        onSuccess={() =>
          handleDelete(task.task_id, onTaskDeleted, setIsProcessing)
        }
      />
    </>
  );
}
