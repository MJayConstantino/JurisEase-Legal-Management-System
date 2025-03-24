import { TasksProvider } from "@/components/tasks/taskProvider"
import { TasksHeader } from "@/components/tasks/taskHeader"
import { TasksTable } from "@/components/tasks/taskTable"

export default function TasksPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <TasksProvider>
        <div className="bg-white rounded-lg border shadow-sm">
          <TasksHeader />
          <TasksTable />
        </div>
      </TasksProvider>
    </div>
  )
}

