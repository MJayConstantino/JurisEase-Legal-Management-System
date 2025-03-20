
export interface Task {
    id: string
    name: string
    dueDate: Date | null
    description?: string
    status: string
    priority: string
    recurring?: boolean
  }
  
  