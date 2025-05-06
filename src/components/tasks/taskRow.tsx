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
import { TableCell, TableRow } from "@/components/ui/table";

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
    : "";

  return (
    <TableRow className={`${backgroundClasses}`}>
      {/* Checkbox Column */}
      <TableCell className="p-1 md:p-2 ">
        <Checkbox
          checked={task.status === "completed"}
          onCheckedChange={() => onStatusChange(task)}
          disabled={isProcessing}
          id={`task-complete-${task.task_id}`}
          className={`h-4 w-4 md:h-5 md:w-5 border-gray-300 hover:cursor-pointer shadow ${
            task.status === "completed"
              ? "dark:bg-green-700"
              : "dark:bg-gray-800"
          } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </TableCell>

      {/* Task Name */}
      <TableCell className="p-1 md:p-2">
        <div className="flex flex-col">
          <h3 className="font-medium text-xs sm:text-sm md:text-base truncate dark:text-white max-w-[80px] sm:max-w-[120px] md:max-w-full">
            {task.name}
          </h3>
        </div>
      </TableCell>

      {/* Matter */}
      <TableCell className="p-1 md:p-2">
        {task.matter_id ? (
          isLoadingMatters ? (
            <Skeleton className="inline-block w-12 sm:w-16 md:w-20 h-4 rounded" />
          ) : (
            <span className="text-xs md:text-sm dark:text-gray-300 truncate max-w-[40px] sm:max-w-[60px] md:max-w-full inline-block">
              {matterName || "None"}
            </span>
          )
        ) : (
          <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            None
          </span>
        )}
      </TableCell>

      {/* Status */}
      <TableCell className="p-1 md:p-2">
        <Badge
          variant="outline"
          className={`text-[10px] sm:text-xs w-auto inline-flex justify-center px-1 sm:px-2 ${
            isTaskOverdueFlag
              ? getStatusColor("overdue")
              : getStatusColor(task.status)
          }`}
        >
          {isTaskOverdueFlag ? "overdue" : task.status}
        </Badge>
      </TableCell>

      {/* Due Date */}
      <TableCell className="p-1 md:p-2">
        <span className="text-[10px] sm:text-xs md:text-sm inline-flex items-center gap-1 justify-center dark:text-gray-400 truncate">
          {formatDate(task.due_date)}
        </span>
      </TableCell>

      {/* Priority */}
      <TableCell className="p-1 md:p-2 ">
        <Badge
          variant="outline"
          className={`text-[10px] sm:text-xs w-auto inline-flex justify-center px-1 sm:px-2 ${getStatusColor(
            task.priority
          )}`}
        >
          {task.priority}
        </Badge>
      </TableCell>

      {/* Actions */}
      <TableCell className="p-1 md:p-2 text-right">
        <div className="flex justify-end gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 inline-flex justify-center items-center p-0"
            onClick={() => onEdit(task)}
            disabled={isProcessing}
          >
            <Edit className="h-2 w-2 sm:h-3 sm:w-3" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 inline-flex justify-center items-center p-0"
            onClick={() => onDelete(task)}
            disabled={isProcessing}
          >
            <Trash2Icon className="h-2 w-2 sm:h-3 sm:w-3" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
