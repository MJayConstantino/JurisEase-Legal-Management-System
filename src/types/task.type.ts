export type Priority = "low" | "medium" | "high";

export type Status = "in-progress" | "completed" | "overdue";

export interface Task {
  task_id: string;
  name: string;
  description?: string | null;
  due_date?: Date | string | null;
  priority: Priority;
  status: Status;
  matter_id?: string;
  created_at: Date;
}

export type CreateTaskInput = {
  name: string;
  description?: string | null;
  status: string;
  priority: string;
  due_date?: Date | string | null;
  matter_id?: string;
};

export type SortField = "name" | "matter_id" | "due_date" | "status" | "priority" | "created_at";
export type SortDirection = "asc" | "desc";