"use client";

import { useState, useEffect } from "react";
import type { Task } from "@/types/task.type";
import type { Matter } from "@/types/matter.type";
import { TaskRow } from "./taskRow";
import { TaskCard } from "./taskCard";
import { TasksHeader } from "./taskHeader";
import { handleFetchMatters } from "@/action-handlers/matters";
import {
  handleFetchTasks,
  handleFetchTasksByMatterId,
} from "@/action-handlers/tasks";
import { toast } from "sonner";
import { isBefore } from "date-fns";

export interface TaskListProps {
  initialTasks: Task[];
  onTaskCreated: (newTask: Task) => void;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: string) => void;
  matters: Matter[];
  isLoadingMatters: boolean;
  isLoadingTasks: boolean;
  matterId?: string;
}

export function TaskList({ initialTasks = [], matterId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [, setIsTaskFormOpen] = useState(false);
  const [, setEditingTask] = useState<Task | null>(null);

  const checkIsOverdue = (dueDate?: Date, status?: string) => {
    if (!dueDate || status === "completed") return false;
    return isBefore(new Date(dueDate), new Date());
  };

  useEffect(() => {
    console.log("Fetching tasks...");
    async function fetchTasks() {
      try {
        setIsLoadingTasks(true);
        let result;

        if (matterId) {
          console.log("Fetching tasks for matterId:", matterId);
          result = await handleFetchTasksByMatterId(matterId);
        } else {
          result = await handleFetchTasks();
        }

        console.log("Fetched tasks:", result);
        if (result.error) {
          throw new Error(result.error);
        }

        const updatedTasks = result.tasks.map((task) => ({
          ...task,
          isOverdue: checkIsOverdue(
            task.due_date ? new Date(task.due_date) : undefined,
            task.status
          ),
        }));
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoadingTasks(false);
      }
    }

    if (!initialTasks || initialTasks.length === 0) {
      fetchTasks();
    }
  }, [matterId, initialTasks]);

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
    if (statusFilter === "all") return true;
    return task.status === statusFilter;
  });

  return (
    <div className="container mx-auto py-2 w-full h-full flex flex-col">
      <TasksHeader
        matters={matters}
        onStatusChange={setStatusFilter}
        onViewChange={setView}
        view={view}
        onTaskCreated={() => {
          setEditingTask(null);
          setIsTaskFormOpen(true);
        }}
      />

      <div className="flex-grow overflow-y-auto">
        {isLoadingTasks ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-muted-foreground">
            <p>No tasks found.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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
          <div className="mt-6">
            {filteredTasks.map((task) => (
              <TaskRow
                key={task.task_id}
                task={task}
                matters={matters}
                isLoadingMatters={isLoadingMatters}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
                isOverdue={task.status === "overdue" || false}
              />
            ))}
          </div>
        )}
      </div>

    
    </div>
  );
}
