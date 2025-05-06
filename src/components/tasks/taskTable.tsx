"use client";

import { useState } from "react";
import type { Matter } from "@/types/matter.type";
import type { Task } from "@/types/task.type";
import { TaskForm } from "./taskForm";
import { TaskDeleteDialog } from "./taskDeleteDialog";
import { useParams } from "next/navigation";
import {
  handleComplete,
  handleSaveTask,
  handleDelete,
} from "@/utils/taskHandlers";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { TaskTableHeader } from "./taskTableHeader";
import { TaskRow } from "./taskRow";

interface TaskTableProps {
  tasks: Task[];
  matters: Matter[];
  isLoadingMatters: boolean;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (deletedTaskId: string) => void;
}

type SortField = "name" | "matter_id" | "due_date" | "status" | "priority";

export function TaskTable({
  tasks,
  matters,
  isLoadingMatters,
  onTaskUpdated,
  onTaskDeleted,
}: TaskTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [processingTaskId, setProcessingTaskId] = useState<string | null>(null);

  const params = useParams();
  const matterId = params.matterId as string | undefined;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const direction = sortDirection === "asc" ? 1 : -1;

    switch (sortField) {
      case "name":
        return direction * a.name.localeCompare(b.name);
      case "matter_id":
        const matterA = getMattersDisplayName(a.matter_id || "", matters) || "";
        const matterB = getMattersDisplayName(b.matter_id || "", matters) || "";
        return direction * matterA.localeCompare(matterB);
      case "due_date":
        const dateA = a.due_date ? new Date(a.due_date).getTime() : 0;
        const dateB = b.due_date ? new Date(b.due_date).getTime() : 0;
        return direction * (dateA - dateB);
      case "status":
        return direction * a.status.localeCompare(b.status);
      case "priority":
        const priorityA =
          priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        const priorityB =
          priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
        return direction * (priorityA - priorityB);
      default:
        return 0;
    }
  });

  const handleStatusChange = (task: Task) => {
    if (processingTaskId !== task.task_id) {
      setProcessingTaskId(task.task_id);
      handleComplete(
        task,
        task,
        (updatedTask) => {
          onTaskUpdated(updatedTask);
          setTimeout(() => setProcessingTaskId(null), 1000);
        },
        onTaskUpdated,
        () => {},
        false
      );
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (task: Task) => {
    setDeletingTask(task);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="overflow-x-auto dark:border-gray-700">
        <div className="min-w-[600px]">
          <TaskTableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedTasks.map((task) => (
              <TaskRow
                key={task.task_id}
                task={task}
                matters={matters}
                isLoadingMatters={isLoadingMatters}
                getMatterName={(matterId) =>
                  getMattersDisplayName(matterId, matters)
                }
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
                isProcessing={processingTaskId === task.task_id}
              />
            ))}
          </div>
          {sortedTasks.length === 0 && (
            <div className="p-6 text-center text-muted-foreground">
              No tasks found.
            </div>
          )}
        </div>
      </div>

      {editingTask && (
        <TaskForm
          open={!!editingTask}
          onOpenChange={(open) => {
            if (!open) setEditingTask(null);
          }}
          disableMatterSelect={!!matterId}
          onSave={(updatedTask) =>
            handleSaveTask(
              editingTask,
              updatedTask,
              () => {},
              onTaskUpdated,
              () => {},
              () => setEditingTask(null)
            )
          }
          onSaveAndCreateAnother={(updatedTask) =>
            handleSaveTask(
              editingTask,
              updatedTask,
              () => {},
              onTaskUpdated,
              () => {},
              () => setEditingTask(null)
            )
          }
          initialTask={editingTask}
          matters={matters}
          isLoadingMatters={isLoadingMatters}
          getMatterNameDisplay={(matterId) =>
            getMattersDisplayName(matterId, matters)
          }
        />
      )}

      {deletingTask && (
        <TaskDeleteDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          task={deletingTask}
          onSuccess={() => {
            handleDelete(deletingTask.task_id, onTaskDeleted, () => {});
            setDeletingTask(null);
          }}
        />
      )}
    </>
  );
}