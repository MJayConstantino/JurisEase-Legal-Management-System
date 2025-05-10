"use client";

import { useState, useEffect } from "react";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { TaskCard } from "./taskCard";
import { TasksHeader } from "./taskHeader";
import { handleFetchMatters } from "@/action-handlers/matters";
import { handleFetchTasks } from "@/action-handlers/tasks";
import { toast } from "sonner";
import { isTaskOverdue } from "@/utils/taskHandlers";
import { TaskTable } from "./taskTable";

export interface TaskListProps {
  initialTasks: Task[];
  matterId?: string;
}

export function TaskList({ initialTasks = [], matterId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  useEffect(() => {
    console.log("Fetching tasks...");
    async function fetchTasks() {
      try {
        setIsLoadingTasks(true);
        const result = await handleFetchTasks();

        console.log("Fetched tasks:", result);
        if (result.error) {
          throw new Error(result.error);
        }

        setTasks(result.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoadingTasks(false);
      }
    }

    if (!initialTasks || initialTasks.length === 0) {
      fetchTasks();
    }
  }, [initialTasks]);

  useEffect(() => {
    console.log("Fetching matters...");
    async function fetchMatters() {
      try {
        setIsLoadingMatters(true);
        const { matters: matterData }: { matters: Matter[] } =
          await handleFetchMatters();
        console.log("Fetched matters:", matterData);
        const uniqueMatters = matterData.filter(
          (matter, index, self) =>
            index === self.findIndex((m) => m.matter_id === matter.matter_id)
        );
        setMatters(uniqueMatters);
      } catch (error) {
        console.error("Error fetching matters:", error);
        toast.error("Failed to load matters");
      } finally {
        setIsLoadingMatters(false);
      }
    }
    fetchMatters();
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.task_id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
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

  return (
    <div className="border w-full container mx-auto py-4 pt-2 h-full flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
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
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-muted-foreground">
            <p>No tasks found.</p>
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
