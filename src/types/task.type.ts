export type Priority = "low" | "medium" | "high"
export type Status = "pending" | "completed"

export interface Task {
  task_id: string
  name: string
  description?: string
  dueDate?: Date
  priority: Priority
  status: Status
  matter_id?: string
  createdAt?: Date
}
