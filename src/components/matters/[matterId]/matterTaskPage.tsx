"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TaskList } from "@/components/tasks/taskList";
import type { Task } from "@/types/task.type";
import { getTasksByMatterId } from "@/actions/tasks";
import { toast } from "sonner";

export function MatterTaskPage({
  initialTasks = [],
}: {
  initialTasks: Task[];
}) {
  const params = useParams();
  const matterId = params.matterId as string;
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    if (initialTasks.length === 0) {
      const fetchTasks = async () => {
        try {
          const tasksData = await getTasksByMatterId(matterId);
          setTasks(tasksData || []);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error("Failed to load tasks");
        }
      };

      fetchTasks();
    }
  }, [matterId, initialTasks.length]);

  return (
    <div className="dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 mt-0">
      <TaskList initialTasks={tasks} matterId={matterId} />
    </div>
  );
}

export default MatterTaskPage;
