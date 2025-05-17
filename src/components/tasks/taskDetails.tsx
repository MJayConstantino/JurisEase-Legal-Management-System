"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Edit, Trash2Icon } from "lucide-react";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { formatDate, isTaskOverdue } from "@/utils/taskHandlers";
import { getStatusColor } from "@/utils/getStatusColor";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { TaskForm } from "./taskForm";
import { TaskDeleteDialog } from "./taskDeleteDialog";

interface TaskDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  matters: Matter[];
  isLoadingMatters: boolean;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (deletedTaskId: string) => void;
}

export function TaskDetails({
  open,
  onOpenChange,
  task,
  matters,
  isLoadingMatters,
  onTaskUpdated,
  onTaskDeleted,
}: TaskDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEditClick = useCallback(() => {
    onOpenChange(false); // Close task details dialog first
    setIsEditing(true); // Then open the edit form
  }, [onOpenChange]);
  
  const handleDeleteClick = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);
  
  const handleCloseClick = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  if (!task) {
    return null;
  }

  const isTaskOverdueFlag = isTaskOverdue(
    task.due_date ?? undefined,
    task.status
  );
  const matterName = getMattersDisplayName(task.matter_id || "", matters);
  const createdDate = task.created_at ? new Date(task.created_at) : null;

  return (
    <>
      <Dialog open={open} onOpenChange={(newState) => {
        onOpenChange(newState);
      }}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center justify-between dark:text-white">
              <span className="pr-4 font-bold">{task.name}</span>
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={`${getStatusColor(task.priority)}`}
              >
                {task.priority}
              </Badge>
              <Badge
                variant="outline"
                className={`${
                  isTaskOverdueFlag
                    ? getStatusColor("overdue")
                    : getStatusColor(task.status)
                }`}
              >
                {isTaskOverdueFlag ? "overdue" : task.status}
              </Badge>
            </div>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-medium mb-2 dark:text-gray-300">
                Description
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md min-h-[80px] text-sm dark:text-gray-200">
                {task.description || (
                  <span className="text-gray-400 dark:text-gray-500">
                    No description provided
                  </span>
                )}
              </div>
            </div>

            {/* Matter */}
            {task.matter_id && (
              <div>
                <h3 className="text-sm font-medium mb-2 dark:text-gray-300">
                  Assigned Matter
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-sm dark:text-gray-200">
                  {matterName || (
                    <span className="text-gray-400 dark:text-gray-500">
                      No matter assigned
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2 dark:text-gray-300">
                  Due Date
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-sm flex items-center dark:text-gray-200">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  {task.due_date ? (
                    formatDate(task.due_date)
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">
                      No due date
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2 dark:text-gray-300">
                  Created at
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-sm flex items-center dark:text-gray-200">
                  <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  {createdDate ? (
                    formatDate(createdDate)
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">
                      Unknown
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="default"
                onClick={handleEditClick}
                className="flex-1 sm:flex-none cursor-pointer"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Task
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteClick}
                className="flex-1 sm:flex-none cursor-pointer"
              >
                <Trash2Icon className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={handleCloseClick}
              className="w-full sm:w-auto cursor-pointer"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Only render when needed */}
      {isEditing && (
        <TaskForm
          open={isEditing}
          onOpenChange={(open) => {
            setIsEditing(open);
          }}
          disableMatterSelect={false}
          onSave={(updatedTask) => {
            onTaskUpdated(updatedTask);
            setIsEditing(false);
          }}
          initialTask={task}
          matters={matters}
          isLoadingMatters={isLoadingMatters}
          getMatterNameDisplay={(matterId) =>
            getMattersDisplayName(matterId, matters)
          }
        />
      )}

      {/* Only render when needed */}
      {isDeleteDialogOpen && (
        <TaskDeleteDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={(open) => {
            setIsDeleteDialogOpen(open);
          }}
          task={task}
          onSuccess={() => {
            onTaskDeleted(task.task_id);
            setIsDeleteDialogOpen(false);
            onOpenChange(false);
          }}
        />
      )}
    </>
  );
}
