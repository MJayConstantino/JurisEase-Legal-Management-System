"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TaskList } from "@/components/tasks/taskList";
import type { Task } from "@/types/task.type";
import { handleFetchMatters } from "@/action-handlers/matters";
import type { Matter } from "@/types/matter.type";
import { getTasksByMatterId, createTask } from "@/actions/tasks";
import { toast } from "sonner";

export function MatterTaskPage() {
  const params = useParams();
  const matterId = params.matterId as string;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("Fetching tasks for matterId:", matterId);
      try {
        const tasksData = await getTasksByMatterId(matterId);
        console.log("Fetched tasks:", tasksData);
        setTasks(tasksData || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [matterId]);

  useEffect(() => {
    const fetchMatters = async () => {
      console.log("Fetching matters...");
      try {
        const { matters: matterData } = await handleFetchMatters();
        console.log("Fetched matters:", matterData);
        setMatters(matterData);
      } catch (error) {
        console.error("Error fetching matters:", error);
        toast.error("Failed to load matters");
      } finally {
        setIsLoadingMatters(false);
      }
    };

    fetchMatters();
  }, []);

  const handleTaskCreated = async (newTask: Task) => {
    console.log("Creating task:", newTask);
    try {
      const taskWithMatter = {
        ...newTask,
        matter_id: matterId,
      };

      const createdTask = await createTask(taskWithMatter);
      console.log("Created task:", createdTask);
      if (createdTask) {
        setTasks((prev) => [createdTask, ...prev]);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.task_id !== taskId));
  };

  return (
    <div className="dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 mt-0">
      <TaskList
        matterId={matterId}
        initialTasks={tasks}
        onTaskCreated={handleTaskCreated}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
        matters={matters}
        isLoadingMatters={isLoadingMatters}
        isLoadingTasks={isLoading}
      />
    </div>
  );
}

export default MatterTaskPage;
