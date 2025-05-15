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

export function TaskList({ initialTasks = [], matterId, tasks: externalTasks, onTaskCreated }: TaskListProps) {
  
  const [tasks, setTasks] = useState<Task[]>(externalTasks ?? initialTasks);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "table">("table");
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  // Improved fetch tasks with useCallback to prevent unnecessary rerenders
  const fetchTasks = useCallback(async () => {
    console.log('[TaskList] fetchTasks called', { initialTasksLength: initialTasks.length });
    
    if (initialTasks.length > 0) {
      console.log('[TaskList] Using initialTasks instead of fetching');
      return;
    }

    try {
      console.log('[TaskList] Starting task fetch', { matterId });
      setIsLoadingTasks(true);
      let result;

      if (matterId) {
        console.log('[TaskList] Fetching tasks for matter:', matterId);
        result = await handleFetchTasksByMatterId(matterId);
      } else {
        console.log('[TaskList] Fetching all tasks');
        result = await handleFetchTasks();
      }

      if (result.error) {
        console.error('[TaskList] Error in task fetch response:', result.error);
        throw new Error(result.error);
      }

      console.log('[TaskList] Tasks fetched successfully:', { count: result.tasks.length });
      setTasks(result.tasks);
    } catch (error) {
      console.error("[TaskList] Error fetching tasks:", error);
    } finally {
      setIsLoadingTasks(false);
    }
  }, [initialTasks.length, matterId]);

  // Only fetch matters once, with proper dependency tracking
  const fetchMatters = useCallback(async () => {
    console.log('[TaskList] fetchMatters called');
    
    try {
      setIsLoadingMatters(true);
      if (matterId) {
        console.log('[TaskList] Fetching single matter with ID:', matterId);
        const { matter, error } = await handleFetchMatterById(matterId);
        if (error) {
          console.error('[TaskList] Error fetching matter:', error);
          throw new Error(error);
        }
        if (matter) {
          console.log('[TaskList] Matter fetched successfully:', matter);
          setMatters([matter]);
        } else {
          console.warn('[TaskList] No matter found for ID:', matterId);
        }
      } else {
        console.log('[TaskList] Fetching all matters');
        const { matters: matterData, error } = await handleFetchMatters();
        if (error) {
          console.error('[TaskList] Error fetching matters:', error);
          throw new Error(error);
        }
        
        console.log('[TaskList] Matters fetched successfully:', { count: matterData.length });
        // Use Set to ensure uniqueness by matter_id
        const uniqueMatterIds = new Set();
        const uniqueMatters = matterData.filter((matter) => {
          if (uniqueMatterIds.has(matter.matter_id)) return false;
          uniqueMatterIds.add(matter.matter_id);
          return true;
        });

        console.log('[TaskList] Unique matters count:', uniqueMatters.length);
        setMatters(uniqueMatters);
      }
    } catch (error) {
      console.error("[TaskList] Error fetching matters:", error);
      toast.error("Failed to load matters");
    } finally {
      setIsLoadingMatters(false);
    }
  }, [matterId]);

  // Load data on mount
  useEffect(() => {
    console.log('[TaskList] Component mounted, initiating data fetch');
    fetchTasks();
    fetchMatters();
  }, [fetchTasks, fetchMatters]);

  // If externalTasks is provided, sync it to local state
  useEffect(() => {
    if (externalTasks) {
      console.log('[TaskList] External tasks updated, syncing to local state:', { count: externalTasks.length });
      setTasks(externalTasks);
    }
  }, [externalTasks]);

  const handleTaskCreated = useCallback((newTask: Task) => {
    console.log('[TaskList] Task created:', newTask);
    setTasks((prev) => {
      console.log('[TaskList] Adding new task to state, previous count:', prev.length);
      return [newTask, ...prev];
    });
    if (onTaskCreated) {
      console.log('[TaskList] Propagating task created event to parent');
      onTaskCreated(newTask);
    }
  }, [onTaskCreated]);

  const handleTaskUpdated = useCallback((updatedTask: Task) => {
    console.log('[TaskList] Task updated:', updatedTask);
    setTasks((prev) => {
      const taskExists = prev.some(task => task.task_id === updatedTask.task_id);
      console.log(`[TaskList] Task ${taskExists ? 'exists' : 'not found'} in current state`);
      return prev.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      );
    });
  }, []);

  const handleTaskDeleted = useCallback((taskId: string) => {
    console.log('[TaskList] Task deleted, ID:', taskId);
    setTasks((prev) => {
      const beforeCount = prev.length;
      const filteredTasks = prev.filter((t) => t.task_id !== taskId);
      console.log(`[TaskList] Tasks count: ${beforeCount} -> ${filteredTasks.length}`);
      return filteredTasks;
    });
  }, []);

  // Use useMemo for expensive filtering operation
  const filteredTasks = useMemo(() => {
    console.log('[TaskList] Filtering tasks with:', { statusFilter, matterId });
    
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
    
    console.log(`[TaskList] Filtered tasks: ${filtered.length} of ${tasks.length}`);
    return filtered;
  }, [tasks, statusFilter, matterId]);

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
