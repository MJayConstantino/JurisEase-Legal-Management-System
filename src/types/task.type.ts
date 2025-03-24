export type Priority = "low" | "medium" | "high"
export type Status = "pending" | "completed"

export interface Task {
  id: string
  name: string
  description?: string
  dueDate?: Date
  priority: Priority
  status: Status
  matter: string;
  recurring?: boolean
  createdAt?: Date
}
