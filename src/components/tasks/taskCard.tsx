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
import { TaskDetails } from "./taskDetails";
import {
  handleComplete,
  handleSaveTask,
  handleDelete,
  formatDate,
  isTaskOverdue,
} from "@/utils/taskHandlers";

interface TaskCardProps {
  task: Task;
  isLoadingMatters: boolean;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (deletedTaskId: string) => void;
  matters: Matter[];
  matterName?: string;
}

export function TaskCard({
  task: initialTask,
  onTaskUpdated,
  onTaskDeleted,
  matters = [],
  isLoadingMatters = false,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [task, setTask] = useState<Task>(initialTask);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const params = useParams();
  const matterId = params.matterId as string | undefined;

  const matterName = getMattersDisplayName(task.matter_id || "", matters);

  const isTaskOverdueFlag = isTaskOverdue(
    task.due_date ?? undefined,
    task.status
  );

  return (
    <div className="cursor-default">
      <div
        className={`border rounded-lg p-3 h-full flex flex-col ${
          isTaskOverdueFlag
            ? "border-red-500 bg-red-50 dark:bg-red-950"
            : task.status === "completed"
            ? "border-green-500 bg-green-50 dark:bg-green-950"
            : "bg-white dark:bg-gray-800 dark:border-gray-700"
        }`}
        onClick={() => setIsViewingDetails(true)}
      >
        <div
          className="mb-2 flex justify-between items-start gap-2 "
          title={`Task Name: ${task.name}`}
        >
          <h3 className="font-medium text-sm sm:text-base line-clamp-2 dark:text-white">
            {task.name}
          </h3>
          {task.priority && (
            <Badge
              variant="outline"
              className={`text-xs whitespace-nowrap flex-shrink-0 ${getStatusColor(
                task.priority
              )}`}
              title={`Priority: ${task.priority}`}
            >
              {task.priority}
            </Badge>
          )}
        </div>

        {task.description && (
          <p
            className="text-xs sm:text-sm mb-2 line-clamp-2 overflow-y-auto text-muted-foreground dark:text-gray-400"
            title={`Description: ${task.description}`}
          >
            {task.description}
          </p>
        )}

        {task.matter_id && !matterId && (
          <div
            className="text-xs sm:text-sm font-medium mb-2 truncate dark:text-gray-300"
            title={`Matter: ${matterName}`}
          >
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

        <div
          className="flex items-center text-xs sm:text-sm text-muted-foreground mb-auto dark:text-gray-400"
          title={`Due Date: ${formatDate(task.due_date)}`}
        >
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="text-xs sm:text-sm line-clamp-1 ext-muted-foreground dark:text-gray-400">
            Due: {formatDate(task.due_date)}
          </span>
        </div>

        <div
          className="flex flex-wrap items-center justify-between mt-2 pt-2 border-t dark:border-gray-700 gap-y-2"
          title={`Status: ${task.status}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`text-xs ${
                isTaskOverdueFlag
                  ? getStatusColor("overdue")
                  : getStatusColor(task.status)
              }`}
            >
              {isTaskOverdueFlag ? "overdue" : task.status}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1">
            <div className="flex items-center">
              <label
                htmlFor={`task-complete-${initialTask.task_id}`}
                className="text-xs cursor-pointer select-none mr-3 font-medium text-muted-foreground dark:text-gray-400"
              >
                {task.status === "completed"
                  ? "Unmark as Complete"
                  : "Mark as Complete"}
              </label>
              <Checkbox
                checked={task.status === "completed"}
                onCheckedChange={() => {
                  if (!isProcessing) {
                    handleComplete(
                      initialTask,
                      task,
                      setTask,
                      onTaskUpdated,
                      setIsProcessing,
                      isProcessing
                    );
                  }
                }}
                disabled={isProcessing}
                id={`task-complete-${initialTask.task_id}`}
                className={`mr-1 h-7 w-8 border-2 border-gray-300 rounded-md hover:cursor-pointer shadow ${
                  task.status === "completed"
                    ? "dark:bg-green-700"
                    : "dark:bg-gray-800"
                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 md:h-9 md:w-9 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              disabled={isProcessing}
            >
              <Edit className="h-3 w-3 md:h-4 md:w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 md:h-9 md:w-9 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteDialogOpen(true);
              }}
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
            initialTask,
            updatedTask,
            setTask,
            onTaskUpdated,
            setIsProcessing
          )
        }
        onSaveAndCreateAnother={(updatedTask) =>
          handleSaveTask(
            initialTask,
            updatedTask,
            setTask,
            onTaskUpdated,
            setIsProcessing
          )
        }
        initialTask={task}
        matters={matters}
        isLoadingMatters={isLoadingMatters}
        getMatterNameDisplay={(matterId) =>
          getMattersDisplayName(matterId, matters)
        }
      />

      <TaskDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        task={initialTask}
        onSuccess={() =>
          handleDelete(initialTask.task_id, onTaskDeleted, setIsProcessing)
        }
      />

      <TaskDetails
        open={isViewingDetails}
        onOpenChange={setIsViewingDetails}
        task={task}
        matters={matters}
        isLoadingMatters={isLoadingMatters}
        onTaskUpdated={(updatedTask) => {
          setTask(updatedTask);
          onTaskUpdated(updatedTask);
        }}
        onTaskDeleted={onTaskDeleted}
      />
    </div>
  );
}
