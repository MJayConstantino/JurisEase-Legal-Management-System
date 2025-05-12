"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Matter } from "@/types/matter.type";
import { Edit, Eye, MoreHorizontal, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/types/task.type";
import { Skeleton } from "@/components/ui/skeleton";
import { isTaskOverdue, formatDate } from "@/utils/taskHandlers";
import { getStatusColor } from "@/utils/getStatusColor";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { TaskDetails } from "./taskDetails";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskRowProps {
  task: Task;
  matters: Matter[];
  isLoadingMatters: boolean;
  getMatterName: (matterId: string) => string;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task) => void;
  isProcessing: boolean;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (deletedTaskId: string) => void;
  hideMatterColumn?: boolean;
}

export function TaskRow({
  task,
  matters,
  isLoadingMatters,
  getMatterName,
  onEdit,
  onDelete,
  onStatusChange,
  isProcessing,
  onTaskUpdated,
  onTaskDeleted,
  hideMatterColumn = false,
}: TaskRowProps) {
  const [isViewingDetails, setIsViewingDetails] = useState(false);
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
    <>
      <TableRow
        className={`${backgroundClasses} hover:bg-gray-50/muted dark:hover:bg-gray-900/muted hover:cursor-pointer`}
        onClick={() => setIsViewingDetails(true)}
      >
        {/* Checkbox Column */}
        <TableCell className="p-1 md:p-2" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={task.status === "completed"}
            onCheckedChange={() => onStatusChange(task)}
            disabled={isProcessing}
            id={`task-complete-${task.task_id}`}
            className={`h-4 w-4 md:h-5 md:w-5 border-gray-300 hover:cursor-pointer ${
              task.status === "completed"
                ? "dark:bg-green-700"
                : "dark:bg-gray-800"
            } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </TableCell>

        {/* Task Name */}
        <TableCell className="p-1 md:p-2" title={`Task Name: ${task.name}`}>
          <div className="flex flex-col">
            <h3
              className={`font-medium text-xs sm:text-sm md:text-base truncate dark:text-white max-w-[80px] sm:max-w-[120px] md:max-w-full ${
                hideMatterColumn
                  ? "max-w-[150px] sm:max-w-[180px] md:max-w-[350px]"
                  : ""
              }`}
            >
              {task.name}
            </h3>
          </div>
        </TableCell>

        {/* Matter Column - Only show if not in a matter-specific page */}
        {!hideMatterColumn && (
          <TableCell className="p-1 md:p-2 w-32 md:w-40" title={`Matter: ${matterName}`}>
            {task.matter_id ? (
              isLoadingMatters ? (
                <Skeleton className="inline-block w-20 md:w-28 h-4 rounded" />
              ) : (
                <span className="font-medium text-xs sm:text-sm md:text-base truncate dark:text-white max-w-[80px] sm:max-w-[120px] md:max-w-full ">
                  {matterName || "None"}
                </span>
              )
            ) : (
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                None
              </span>
            )}
          </TableCell>
        )}

        {/* Status */}
        <TableCell className="p-1 md:p-2" title={`Status: ${task.status}`}>
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

        {/* Priority */}
        <TableCell className="p-1 md:p-2" title={`Priority: ${task.priority}`}>
          <Badge
            variant="outline"
            className={`text-[10px] sm:text-xs w-auto inline-flex justify-center px-1 sm:px-2 ${getStatusColor(
              task.priority
            )}`}
          >
            {task.priority}
          </Badge>
        </TableCell>

        {/* Due Date */}
        <TableCell
          className="p-1 md:p-2"
          title={`Due Date: ${formatDate(task.due_date)}`}
        >
          {task.due_date ? (
            <span className="text-xs sm:text-sm md:text-base truncate dark:text-white max-w-[80px] sm:max-w-[120px] md:max-w-full ">
              {formatDate(task.due_date)}
            </span>
          ) : (
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              No date
            </span>
          )}
        </TableCell>

        {/* Actions */}
        <TableCell
          className="p-1 md:p-2 text-right"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 md:h-8 md:w-8 hover:cursor-pointerB"
                disabled={isProcessing}
              >
                <MoreHorizontal className="h-3 w-3 md:h-4 md:w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsViewingDetails(true)}
                disabled={isProcessing}
                className="hover:cursor-pointer"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onEdit(task)}
                disabled={isProcessing}
                className="hover:cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusChange(task)}
                disabled={isProcessing}
                className="hover:cursor-pointer"
              >
                <Checkbox
                  className="mr-2 h-4 w-4"
                  checked={task.status === "completed"}
                />
                Mark as{" "}
                {task.status === "completed" ? "Incomplete" : "Complete"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(task)}
                disabled={isProcessing}
                className="text-red-600 focus:text-red-600 hover:cursor-pointer"
              >
                <Trash2Icon className="mr-2 h-4 w-4" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <TaskDetails
        open={isViewingDetails}
        onOpenChange={setIsViewingDetails}
        task={task}
        matters={matters}
        isLoadingMatters={isLoadingMatters}
        onTaskUpdated={onTaskUpdated}
        onTaskDeleted={onTaskDeleted}
      />
    </>
  );
}
