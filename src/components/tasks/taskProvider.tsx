"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "@/actions/tasks";
import { Task, Status } from "@/types/task.type";

interface TasksContextType {
  tasks: Task[];
  filter: "all" | "pending" | "completed";
  searchQuery: string;
  isLoading: boolean;
  setFilter: (filter: "all" | "pending" | "completed") => void;
  setSearchQuery: (query: string) => void;
  addTask: (task: Partial<Task>) => Promise<void>;
  updateTaskStatus: (id: string, status: Status) => Promise<void>;
  updateTaskItem: (id: string, task: Partial<Task>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (task: Partial<Task>) => {
    try {
      console.log("created task from context: ", task);
      if (!task.name) {
        throw new Error("Task name is required");
      }
      const newTask = await createTask(task as Omit<Task, "id">);
      if (newTask) {
        setTasks((prev) => [...prev, newTask]);
      } else {
        throw new Error("Failed to add task: newTask is undefined");
      }
    } catch (error) {
      console.error("Failed to add task:", error);
      throw error;
    }
  };

  const updateTaskStatus = async (id: string, status: Status) => {
    try {
      const taskToUpdate = tasks.find((task) => task.task_id === id);
      if (!taskToUpdate) {
        throw new Error("Task not found");
      }
      await updateTask(id, { status }, { ...taskToUpdate, status });
      setTasks((prev) =>
        prev.map((task) => (task.task_id === id ? { ...task, status } : task))
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
      throw error;
    }
  };

  const updateTaskItem = async (id: string, taskUpdate: Partial<Task>) => {
    try {
      const taskToUpdate = tasks.find((task) => task.task_id === id);
      if (!taskToUpdate) {
        throw new Error("Task not found");
      }
      if (!taskUpdate.status) {
        throw new Error("Task status is required");
      }
      await updateTask(id, { status: taskUpdate.status }, { ...taskToUpdate, ...taskUpdate });
      setTasks((prev) =>
        prev.map((task) => (task.task_id === id ? { ...task, ...taskUpdate } : task))
      );
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.task_id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "all") return true;
      return task.status === filter;
    })
    .filter((task) => {
      if (!searchQuery) return true;
      return (
        task.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return (
    <TasksContext.Provider
      value={{
        tasks: filteredTasks,
        filter,
        searchQuery,
        isLoading,
        setFilter,
        setSearchQuery,
        addTask,
        updateTaskStatus,
        updateTaskItem,
        removeTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
