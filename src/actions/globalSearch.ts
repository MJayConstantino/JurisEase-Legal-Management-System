'use server'

import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Define Supabase types for stricter checks
interface Matter {
  id: string
  name: string
  client_name: string
  attorney?: string
  opposing_council?: string
  court?: string
}

interface Task {
  id: string
  title: string
  status?: string
  matters?: { name: string; client_name: string }
}

interface Bill {
  id: string
  invoice_number: string
  matters?: { name: string; client_name: string }
}

interface SearchResult {
  id: string
  type: 'Matter' | 'Task' | 'Bill'
  title: string
  subtitle: string
  status?: string
  route: string
}

const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function search(
  query: string,
  contentTypes: string[],
  attributes: string[]
): Promise<{ results: SearchResult[] } | { error: string }> {
  if (!query.trim()) {
    return { results: [] }
  }

  const searchResults: SearchResult[] = []

  try {
    // Search matters
    if (contentTypes.includes('matters')) {
      let mattersQuery = supabase.from('matters').select('*')

      if (attributes.includes('clientName')) {
        mattersQuery = mattersQuery.ilike('client_name', `%${query}%`)
      }
      if (attributes.includes('attorney')) {
        mattersQuery = mattersQuery.or(`attorney.ilike.%${query}%`)
      }
      if (attributes.includes('caseName')) {
        mattersQuery = mattersQuery.or(`name.ilike.%${query}%`)
      }
      if (attributes.includes('opposingCouncil')) {
        mattersQuery = mattersQuery.or(`opposing_council.ilike.%${query}%`)
      }
      if (attributes.includes('court')) {
        mattersQuery = mattersQuery.or(`court.ilike.%${query}%`)
      }

      const { data: matters, error } = await mattersQuery.limit(10)
      if (!error && matters) {
        searchResults.push(
          ...matters.map((matter) => ({
            id: matter.id,
            type: 'Matter' as const,
            title: matter.name,
            subtitle: `Client: ${matter.client_name}`,
            status: matter.attorney ? 'Assigned' : 'Unassigned',
            route: `/matters/${matter.id}`,
          }))
        )
      }
    }

    // Search tasks
    if (contentTypes.includes('tasks')) {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*, matters(name, client_name)')
        .ilike('title', `%${query}%`)
        .limit(10)

      if (!error && tasks) {
        searchResults.push(
          ...tasks.map((task) => ({
            id: task.id,
            type: 'Task' as const,
            title: task.title,
            subtitle: task.matters
              ? `Matter: ${task.matters.name}`
              : 'No matter assigned',
            status: task.status,
            route: `/tasks/${task.id}`,
          }))
        )
      }
    }

    // Search bills
    if (contentTypes.includes('bills')) {
      const { data: bills, error } = await supabase
        .from('bills')
        .select('*, matters(name, client_name)')
        .ilike('invoice_number', `%${query}%`)
        .limit(10)

      if (!error && bills) {
        searchResults.push(
          ...bills.map((bill) => ({
            id: bill.id,
            type: 'Bill' as const,
            title: `Invoice #${bill.invoice_number}`,
            subtitle: bill.matters
              ? `Matter: ${bill.matters.name}`
              : 'No matter assigned',
            route: `/bills/${bill.id}`,
          }))
        )
      }
    }

    return { results: searchResults }
  } catch (error) {
    console.error('Error processing search:', error)
    return { error: 'Failed to process search' }
  }
}
