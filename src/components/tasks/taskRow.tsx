"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Matter } from "@/types/matter.type";
import { Edit, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/types/task.type";
import { Skeleton } from "@/components/ui/skeleton";
import { isTaskOverdue, formatDate } from "@/utils/taskHandlers";
import { getStatusColor } from "@/utils/getStatusColor";

interface TaskRowProps {
  task: Task;
  matters: Matter[];
  isLoadingMatters: boolean;
  getMatterName: (matterId: string) => string;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task) => void;
  isProcessing: boolean;
}

export function TaskRow({
  task,
  isLoadingMatters,
  getMatterName,
  onEdit,
  onDelete,
  onStatusChange,
  isProcessing,
}: TaskRowProps) {
  const isTaskOverdueFlag = isTaskOverdue(
    task.due_date ?? undefined,
    task.status
  );
  const matterName = getMatterName(task.matter_id || "");

  const backgroundClasses = isTaskOverdueFlag
    ? "bg-red-50 dark:bg-red-950"
    : task.status === "completed"
    ? "bg-green-50 dark:bg-green-950"
    : "bg-white dark:bg-gray-800";

  return (
    <div className={`${backgroundClasses} w-full`}>
      <div className="grid grid-cols-12 gap-2 px-2 py-2 items-center sm:gap-4 sm:px-4 w-full">
        {/* Checkbox Column - Always visible */}
        <div className="col-span-1 flex justify-center">
          <Checkbox
            checked={task.status === "completed"}
            onCheckedChange={() => onStatusChange(task)}
            disabled={isProcessing}
            id={`task-complete-${task.task_id}`}
            className={`h-5 w-5 border-gray-300 rounded hover:cursor-pointer shadow ${
              task.status === "completed"
                ? "dark:bg-green-700"
                : "dark:bg-gray-800"
            } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>

        {/* Task Name - Takes more space on mobile */}
        <div className="col-span-5 sm:col-span-3">
          <div className="flex flex-col">
            <h3 className="font-medium text-sm sm:text-base line-clamp-1 dark:text-white">
              {task.name}
            </h3>
          </div>
        </div>

        {/* Matter - Hidden on small screens unless hovered */}
        <div className="hidden sm:block col-span-2">
          {task.matter_id ? (
            isLoadingMatters ? (
              <Skeleton className="inline-block w-24 h-4 rounded" />
            ) : (
              <span className="text-sm dark:text-gray-300 truncate">
                {matterName || "No matter assigned"}
              </span>
            )
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              None
            </span>
          )}
        </div>

        {/* Status - Always visible */}
        <div className="col-span-3 sm:col-span-2 flex justify-center">
          <Badge
            variant="outline"
            className={`text-xs w-auto text-center ${
              isTaskOverdueFlag
                ? getStatusColor("overdue")
                : getStatusColor(task.status)
            }`}
          >
            {isTaskOverdueFlag ? "overdue" : task.status}
          </Badge>
        </div>

        {/* Due Date - Always visible */}
        <div className="col-span-3 sm:col-span-2">
          <span className="text-xs sm:text-sm line-clamp-1 dark:text-gray-400">
            {formatDate(task.due_date)}
          </span>
        </div>

        {/* Priority - Hidden on small screens */}
        <div className="hidden sm:flex sm:col-span-1 justify-center">
          <Badge
            variant="outline"
            className={`text-xs w-auto text-center ${getStatusColor(
              task.priority
            )}`}
          >
            {task.priority}
          </Badge>
        </div>

        {/* Actions - Always visible but smaller on mobile */}
        <div className="col-span-3 sm:col-span-1 flex justify-end items-center">
          <div className="flex items-center gap-1 sm:gap-2 justify-end">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 sm:h-7 sm:w-7 flex justify-center items-center"
              onClick={() => onEdit(task)}
              disabled={isProcessing}
            >
              <Edit className="h-3 w-3" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 sm:h-7 sm:w-7 flex justify-center items-center"
              onClick={() => onDelete(task)}
              disabled={isProcessing}
            >
              <Trash2Icon className="h-3 w-3" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
