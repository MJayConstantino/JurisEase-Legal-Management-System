import { TaskList } from "@/components/tasks/taskList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks | Dianson Law Office",
  description: "Create and manage your legal tasks and assignments.",
};

export default function Task() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <h1 className="text-3xl font-bold">Tasks</h1>
      <p className="text-muted-foreground">
        Create and manage your legal tasks and assignments.
      </p>
      <TaskList />
    </div>
  );
}
