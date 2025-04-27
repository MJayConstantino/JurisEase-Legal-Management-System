"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Matter } from "@/types/matter.type";
import { Edit, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { TaskForm } from "./taskForm";
import { getStatusColor } from "@/utils/getStatusColor";
import type { Task } from "@/types/task.type";
import { Skeleton } from "../ui/skeleton";
import { TaskDeleteDialog } from "./taskDeleteDialog";
import { useParams } from "next/navigation";
import {
  handleComplete,
  handleSaveTask,
  handleDelete,
  isTaskOverdue,
  formatDate,
} from "@/utils/taskHandlers";

interface TaskRowProps {
  task: Task;
  matters: Matter[];
  isLoadingMatters: boolean;
  isOverdue: boolean;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (deletedTaskId: string) => void;
}

export function TaskRow({
  task,
  matters,
  isLoadingMatters,
  onTaskUpdated,
  onTaskDeleted,
}: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTask, setLocalTask] = useState<Task>(task);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const params = useParams();
  const matterId = params.matterId as string | undefined;

  const isTaskOverdueFlag = isTaskOverdue(localTask.due_date ?? undefined, localTask.status);
  
    if (isTaskOverdueFlag && localTask.status !== "overdue") {
      setLocalTask((prevTask) => ({ ...prevTask, status: "overdue" }));
    }

  const matterName = getMattersDisplayName(localTask.matter_id || "", matters);

  return (
    <>
      <div
        className={`flex items-center my-2 rounded-lg justify-between p-3 sm:p-4 border ${
          isTaskOverdueFlag
            ? "border-red-500 bg-red-50 dark:bg-red-950"
            : localTask.status === "completed"
            ? "border-green-500 bg-green-50 dark:bg-green-950"
            : "bg-white dark:bg-gray-800 dark:border-gray-700"
        }`}
      >
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
          className={`mr-3 h-4 w-4 border-2 border-gray-300 rounded hover:cursor-pointer shadow ${
            localTask.status === "completed"
              ? "dark:bg-green-700"
              : "dark:bg-gray-800"
          }`}
        />
        <div className="flex-1 min-w-0 mr-2 ">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium text-sm sm:text-base line-clamp-2 dark:text-white">
              {localTask.name}
            </h3>
            {localTask.priority && (
              <Badge
                variant="outline"
                className={`text-xs ${getStatusColor(localTask.priority)}`}
              >
                {localTask.priority}
              </Badge>
            )}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground truncate">
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
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 dark:text-gray-400">
          <div className="text-xs sm:text-sm hidden sm:block">
            <span className="text-xs sm:text-sm line-clamp-1 ext-muted-foreground dark:text-gray-400">
              {formatDate(localTask.due_date)}
            </span>
          </div>

          <div className="w-16 sm:w-24">
            <Badge
              variant="outline"
              className={`text-xs ${getStatusColor(localTask.status)}`}
            >
              {localTask.status}
            </Badge>
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
