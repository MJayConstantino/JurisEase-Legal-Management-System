"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { TaskCard } from "./taskCard";
import { TasksHeader } from "./taskHeader";
import {
  handleFetchMatterById,
  handleFetchMatters,
} from "@/action-handlers/matters";
import {
  handleFetchTasks,
  handleFetchTasksByMatterId,
} from "@/action-handlers/tasks";
import { toast } from "sonner";
import { isTaskOverdue } from "@/utils/taskHandlers";
import { TaskTable } from "./taskTable";

export interface TaskListProps {
  initialTasks: Task[];
  matterId?: string;
  tasks?: Task[];
  onTaskCreated?: (newTask: Task) => void;
}

export function TaskList({
  initialTasks = [],
  matterId,
  tasks: externalTasks,
  onTaskCreated,
}: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(externalTasks ?? initialTasks);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "table">("table");
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (initialTasks.length > 0) {
      return;
    }

    try {
      setIsLoadingTasks(true);
      let result;

      if (matterId) {
        result = await handleFetchTasksByMatterId(matterId);
      } else {
        result = await handleFetchTasks();
      }

      if (result.error) {
        throw new Error(result.error);
      }

      setTasks(result.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoadingTasks(false);
    }
  }, [initialTasks.length, matterId]);

  const fetchMatters = useCallback(async () => {
    try {
      setIsLoadingMatters(true);
      if (matterId) {
        const { matter, error } = await handleFetchMatterById(matterId);
        if (error) {
          throw new Error(error);
        }
        if (matter) {
          setMatters([matter]);
        }
      } else {
        const { matters: matterData, error } = await handleFetchMatters();
        if (error) {
          throw new Error(error);
        }

        // Use Set to ensure uniqueness by matter_id
        const uniqueMatterIds = new Set();
        const uniqueMatters = matterData.filter((matter) => {
          if (uniqueMatterIds.has(matter.matter_id)) return false;
          uniqueMatterIds.add(matter.matter_id);
          return true;
        });

        setMatters(uniqueMatters);
      }
    } catch (error) {
      console.error("Error fetching matters:", error);
      toast.error("Failed to load matters");
    } finally {
      setIsLoadingMatters(false);
    }
  }, [matterId]);

  useEffect(() => {
    fetchTasks();
    fetchMatters();
  }, [fetchTasks, fetchMatters]);

  useEffect(() => {
    if (externalTasks) {
      setTasks(externalTasks);
    }
  }, [externalTasks]);

  const handleTaskCreated = useCallback(
    (newTask: Task) => {
      setTasks((prev) => [newTask, ...prev]);
      if (onTaskCreated) {
        onTaskCreated(newTask);
      }
    },
    [onTaskCreated]
  );

  const handleTaskUpdated = useCallback((updatedTask: Task) => {
    setTasks((prev) => {
      return prev.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      );
    });
  }, []);

  const handleTaskDeleted = useCallback((taskId: string) => {
    setTasks((prev) => {
      return prev.filter((t) => t.task_id !== taskId);
    });
  }, []);

  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      if (matterId && task.matter_id !== matterId) return false;
      if (statusFilter === "all") return true;
      if (statusFilter === "overdue") {
        return isTaskOverdue(task.due_date ?? undefined, task.status);
      }
      return (
        task.status === statusFilter &&
        !isTaskOverdue(task.due_date ?? undefined, task.status)
      );
    });

    return filtered;
  }, [tasks, statusFilter, matterId]);

  return (
    <div className="border dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 w-full h-auto flex flex-col overflow-hidden mb-[56px] md:mb-0">
      <TasksHeader
        onStatusChange={setStatusFilter}
        onViewChange={setView}
        view={view}
        onTaskCreated={handleTaskCreated}
        matters={matters}
        matterId={matterId}
      />
      <div className="flex-grow overflow-y-auto w-full">
        {isLoadingTasks ? (
          <div className="flex justify-center items-center py-6 h-auto">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex justify-center items-center py-6 text-muted-foreground">
            <p> No tasks found. Create your first task to get started.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 p-5 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.task_id}
                task={task}
                matters={matters}
                isLoadingMatters={isLoadingMatters}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            ))}
          </div>
        ) : (
          <div className="w-full">
            <TaskTable
              tasks={filteredTasks}
              matters={matters}
              isLoadingMatters={isLoadingMatters}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          </div>
        )}
      </div>
    </div>
  );
}
