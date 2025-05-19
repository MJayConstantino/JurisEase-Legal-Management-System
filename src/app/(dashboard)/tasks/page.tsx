import { Suspense } from "react";
import { TaskList } from "@/components/tasks/taskList";
import { TasksLoading } from "./loading";
import { handleFetchTasks } from "@/action-handlers/tasks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks | JurisEase",
  description: "View and manage your tasks and to-do items.",
};

export default async function TasksPage() {
  const { tasks = [] } = await handleFetchTasks();

  return (
    <div className="flex flex-col gap-6 h-full">
      <Suspense fallback={<TasksLoading />} />
      <TaskList initialTasks={tasks} />
    </div>
  );
}
