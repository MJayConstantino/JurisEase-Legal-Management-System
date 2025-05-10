"use client";

import { useState, useEffect } from "react";
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
}

export function TaskList({ initialTasks = [], matterId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "table">("table");
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  useEffect(() => {
    console.log(
      "Fetching tasks...",
      matterId ? `for matter: ${matterId}` : "all tasks"
    );
    async function fetchTasks() {
      try {
        setIsLoadingTasks(true);
        let result;

        if (matterId) {
          console.log(`Fetching tasks for specific matter ID: ${matterId}`);
          result = await handleFetchTasksByMatterId(matterId);
        } else {
          console.log("Fetching all tasks");
          result = await handleFetchTasks();
        }

        if (result.error) {
          throw new Error(result.error);
        }

        console.log("Tasks fetched successfully:", result.tasks);
        console.log(`Total tasks fetched: ${result.tasks.length}`);
        setTasks(result.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoadingTasks(false);
      }
    }

    if (!initialTasks || initialTasks.length === 0) {
      fetchTasks();
    } else {
      console.log("Using initialTasks:", initialTasks);
      console.log(`Total initial tasks: ${initialTasks.length}`);
    }
  }, [initialTasks, matterId]);

  // Optimize matter fetching based on context
  useEffect(() => {
    console.log("Fetching matters...");
    async function fetchMatters() {
      try {
        setIsLoadingMatters(true);
        if (matterId) {
          console.log(`Fetching specific matter with ID: ${matterId}`);
          const { matter, error } = await handleFetchMatterById(matterId);

          if (error) {
            throw new Error(error);
          }

          if (matter) {
            console.log("Specific matter fetched:", matter);
            setMatters([matter]);
          }
        } else {
          console.log("Fetching all matters");
          const { matters: matterData } = await handleFetchMatters();
          console.log("All matters fetched:", matterData);

          const uniqueMatters = matterData.filter(
            (matter, index, self) =>
              index === self.findIndex((m) => m.matter_id === matter.matter_id)
          );
          console.log(`Total unique matters: ${uniqueMatters.length}`);
          setMatters(uniqueMatters);
        }
      } catch (error) {
        console.error("Error fetching matters:", error);
        toast.error("Failed to load matters");
      } finally {
        setIsLoadingMatters(false);
      }
    }

    fetchMatters();
  }, [matterId]);

  const handleTaskCreated = (newTask: Task) => {
    console.log("New task created:", newTask);
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    console.log("Task updated:", updatedTask);
    setTasks((prev) =>
      prev.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (taskId: string) => {
    console.log("Task deleted:", taskId);
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

  console.log(
    `Filtered tasks: ${filteredTasks.length} of ${tasks.length} total tasks`
  );

  return (
    <div className="border w-full container mx-auto h-full flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg shadow">
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
