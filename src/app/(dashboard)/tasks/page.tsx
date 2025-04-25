import { handleFetchTasks } from "@/action-handlers/tasks";
import { TaskList } from "@/components/tasks/taskList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks | Dianson Law Office",
  description: "Create and manage your legal tasks and assignments.",
};

export default async function Task() {
  const { tasks = [] } = await handleFetchTasks();
  
  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto">
      <TaskList initialTasks={tasks} />
    </div>
  );
}