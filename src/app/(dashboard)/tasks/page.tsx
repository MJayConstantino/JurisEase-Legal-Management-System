import { Suspense } from "react";
import { TaskList } from "@/components/tasks/taskList";
import { TaskPageSkeleton } from "@/components/tasks/taskPageSkeleton";
import { handleFetchTasks } from "@/action-handlers/tasks";

export default async function TasksPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <Suspense fallback={<TaskPageSkeleton />}>
        <TaskListWrapper />
      </Suspense>
    </div>
  );
}

async function TaskListWrapper() {
  const { tasks, error } = await handleFetchTasks();

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Error loading tasks: {error}</p>
      </div>
    );
  }

  return <TaskList initialTasks={tasks} />;
}
