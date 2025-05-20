"use client"

import { Suspense } from "react"
import { useParams } from "next/navigation"
import { TaskList } from "@/components/tasks/taskList"
import { TasksLoading } from "@/app/(dashboard)/tasks/loading"
import type { Task } from "@/types/task.type"

export function MatterTaskPage({
  initialTasks = [],
}: {
  initialTasks: Task[]
}) {
  const params = useParams()
  const matterId = params.matterId as string

  return (
    <div className="dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800">
      <Suspense fallback={<TasksLoading />}>
        <TaskList initialTasks={initialTasks} matterId={matterId} />
      </Suspense>
    </div>
  )
}

export default MatterTaskPage
