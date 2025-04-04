// Matter types
export type MatterStatus = 'open' | 'closed' | 'pending'
export type OpposingCouncil = {
  name?: string
  phone?: string
  email?: string
  address?: string
}
export type Court = {
  name?: string
  phone?: string
  email?: string
}
export type Matter = {
  matter_id: string
  name: string
  client: string
  status: MatterStatus
  created_at: Date
  date_opened?: Date
  description: string
  case_number: string
  client_phone?: string
  client_email?: string
  client_address?: string
  assigned_attorney?: string
  assigned_staff?: string
  date_closed?: Date
  opposing_council?: OpposingCouncil
  court?: Court
}
export type SortField =
  | 'name'
  | 'client'
  | 'date_opened'
  | 'case_number'
  | 'assigned_attorney'
  | 'assigned_staff'
export type SortDirection = 'asc' | 'desc'

// Task types
export type Priority = 'low' | 'medium' | 'high'
export type TaskStatus = 'pending' | 'completed' | 'overdue'
export type BillStatus = 'Active' | 'Pending'

export interface Task {
  task_id: string
  name: string
  description?: string
  due_date?: Date
  priority: Priority
  status: TaskStatus
  matter_id?: string
  created_at?: Date
}

// Billing types
export type Billing = {
  amount: string | null
  bill_id: string
  created_at: string
  name: string | null
  remarks: string | null
  status: string | null
  matter_id: string
}

// Search result types
export type SearchResultType = 'Matter' | 'Task' | 'Bill'

export interface SearchResult {
  matterid?: string
  id: string
  type: SearchResultType
  title: string
  subtitle: string
  status?: string
  route: string
}

// Search filter types
export interface SearchByFilters {
  clientName: boolean
  attorney: boolean
  caseName: boolean
  opposingCouncil: boolean
  court: boolean
}

export interface ContentTypeFilters {
  matters: boolean
  tasks: boolean
  bills: boolean
}
