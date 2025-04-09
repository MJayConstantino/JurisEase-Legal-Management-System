"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TasksHeader } from "@/components/tasks/taskHeader";
import { TaskForm } from "@/components/tasks/taskForm";
import type { Task } from "@/types/task.type";
import { getTasksByMatterId, createTask } from "@/actions/tasks";
import { toast } from "sonner";
import { TaskCard } from "@/components/tasks/taskCard";
import { TaskRow } from "@/components/tasks/taskRow";
import { getMatters } from "@/actions/matters";
import type { Matter } from "@/types/matter.type";

interface MatterTaskPage {
  matterId: string;
}

export function MatterTaskPage() {    
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [matters, setMatters] = useState<Matter[]>([]);

  const params = useParams();
  const matterId = params.matterId as string;

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      try {
        const [tasksData, mattersData] = await Promise.all([
          getTasksByMatterId(matterId),
          getMatters(),
        ]);
        setTasks(tasksData || []);
        setMatters(mattersData);
      } catch (error) {
        console.error("Error fetching tasks for matter:", error);
        toast.error("Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    }

    if (matterId) {
      fetchTasks();
    }
  }, [matterId]);

  const handleCreateTask = async (task: Task) => {
    try {
      const newTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
        matter_id: matterId,
      } as Omit<Task, "id">;

      const createdTask = await createTask(newTask);
      if (createdTask) {
        setTasks((prev) => [createdTask, ...prev]);
        toast.success("Task created successfully");
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  const filteredTasks = tasks
    .filter((task) => {

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "in-progress" && task.status === "in-progress") ||
        (statusFilter === "overdue" && task.status === "overdue") ||
        (statusFilter === "completed" && task.status === "completed");

      return matchesStatus;
    })
    .sort((a, b) => {
      if (a.status === "overdue" && b.status !== "overdue") return -1;
      if (a.status !== "overdue" && b.status === "overdue") return 1;

      if (a.status === "completed" && b.status !== "completed") return 1;
      if (a.status !== "completed" && b.status === "completed") return -1;

      const dateA = a.due_date ? new Date(a.due_date).getTime() : 0;
      const dateB = b.due_date ? new Date(b.due_date).getTime() : 0;
      return dateA - dateB;
    });

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };


  const handleViewChange = (newView: "grid" | "table") => {
    setView(newView);
  };

  const handleTaskUpdated = () => {
    if (matterId) {
      getTasksByMatterId(matterId)
        .then((data) => setTasks(data || []))
        .catch((error) => {
          console.error("Error refreshing tasks:", error);
          toast.error("Failed to refresh tasks");
        });
    }
  };

  return (
        <div className="dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 mt-0 ">
          <TasksHeader
            onStatusChange={handleStatusChange}
            onViewChange={handleViewChange}
            view={view}
            onTaskCreated={(task) => setTasks((prev) => [task, ...prev])}
            matter_id={matterId}

          />

          <div className="p-4">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <p>Loading tasks...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="flex justify-center items-center h-36 text-muted-foreground">
                <p>
                  No tasks found for this matter. Create a new task to get
                  started.
                </p>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {filteredTasks.map((task) => (
                  <div key={task.task_id} className="task-card">
                    <TaskCard task={task} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-2">
                {filteredTasks.map((task) => (
                  <TaskRow
                    key={task.task_id}
                    task={task}
                    onTaskUpdated={handleTaskUpdated}
                  />
                ))}
              </div>
            )}

        <TaskForm
          open={isAddTaskOpen}
          onOpenChange={setIsAddTaskOpen}
          onSave={handleCreateTask}
          onSaveAndCreateAnother={handleCreateTask}
          matters={matters}
          initialTask={{
            task_id: "",
            name: "",
            description: "",
            due_date: undefined,
            priority: "low",
            status: "in-progress",
            matter_id: matterId,
            created_at: new Date(),
          }}
        />
      </div>
    </div>
  );
}

export default MatterTaskPage;
