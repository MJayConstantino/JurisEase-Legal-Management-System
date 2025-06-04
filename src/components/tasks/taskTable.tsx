"use client";

import { useState, useCallback, useMemo } from "react";
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
import { TaskRow } from "./taskRow";
import { Table, TableBody } from "@/components/ui/table";
import { TaskTableHeader } from "./taskTableHeader";
import type { SortField } from "@/types/task.type";

interface TaskTableProps {
  tasks: Task[];
  matters: Matter[];
  isLoadingMatters: boolean;
  isLoading?: boolean; // New prop for loading state
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (deletedTaskId: string) => void;
}

export function TaskTable({
  tasks,
  matters,
  isLoadingMatters,
  isLoading = false, // Default to false
  onTaskUpdated,
  onTaskDeleted,
}: TaskTableProps) {
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [processingTaskId, setProcessingTaskId] = useState<string | null>(null);

  const params = useParams();
  const matterId = params.matterId as string | undefined;

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        const newDirection = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(newDirection);
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    },
    [sortField, sortDirection]
  );

  const priorityOrder = useMemo(
    () => ({
      high: 3,
      medium: 2,
      low: 1,
    }),
    []
  );

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1;

      switch (sortField) {
        case "name":
          return direction * a.name.localeCompare(b.name);
        case "matter_id":
          const matterA =
            getMattersDisplayName(a.matter_id || "", matters) || "";
          const matterB =
            getMattersDisplayName(b.matter_id || "", matters) || "";
          return direction * matterA.localeCompare(matterB);
        case "due_date":
          const dateA = a.due_date ? new Date(a.due_date).getTime() : 0;
          const dateB = b.due_date ? new Date(b.due_date).getTime() : 0;
          return direction * (dateA - dateB);
        case "priority":
          const priorityA =
            priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
          const priorityB =
            priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
          return direction * (priorityA - priorityB);
        default:
          // Default to sort by created_at
          const createdAtA = a.created_at
            ? new Date(a.created_at).getTime()
            : 0;
          const createdAtB = b.created_at
            ? new Date(b.created_at).getTime()
            : 0;
          return direction * (createdAtA - createdAtB);
      }
    });
  }, [tasks, sortField, sortDirection, matters, priorityOrder]);

  const handleStatusChange = useCallback(
    (task: Task) => {
      if (processingTaskId !== task.task_id) {
        setProcessingTaskId(task.task_id);
        handleComplete(
          task,
          task,
          (updatedTask) => {
            onTaskUpdated(updatedTask);
            setTimeout(() => {
              setProcessingTaskId(null);
            }, 1000);
          },
          onTaskUpdated,
          () => {},
          false
        );
      }
    },
    [processingTaskId, onTaskUpdated]
  );

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
  }, []);

  const handleDeleteTask = useCallback((task: Task) => {
    setDeletingTask(task);
    setIsDeleteDialogOpen(true);
  }, []);

  return (
  <>
    <div className="w-full dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
      <div className="relative w-full overflow-auto">
        <Table>
          <TaskTableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            hideMatterColumn={!!matterId}
          />
          <TableBody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={!!matterId ? 6 : 7}
                  className="p-6 text-center text-muted-foreground"
                >
                  <div className="flex justify-center items-center">
                    <p>Loading tasks...</p>
                  </div>
                </td>
              </tr>
            ) : sortedTasks.length > 0 ? (
              sortedTasks.map((task) => (
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
                  onTaskUpdated={onTaskUpdated}
                  onTaskDeleted={onTaskDeleted}
                  hideMatterColumn={!!matterId}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={!!matterId ? 6 : 7}
                  className="p-6 text-center text-muted-foreground text-sm"
                >
                  No tasks found. Create a new task to get started.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
    </div>

      {/* Task forms and dialogs - only render when needed */}
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

      {isDeleteDialogOpen && deletingTask && (
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
