'use server'

import { createSupabaseClient } from '@/utils/supabase/server'
import type { SearchResult } from '@/types/searchResult.type'
import { MatterStatus } from '@/components/header/globalSearch/types'

export async function search(
  query: string,
  contentTypes: string[],
  attributes: string[]
): Promise<{ results: SearchResult[] } | { error: string }> {
  const supabase = await createSupabaseClient()
  if (!query.trim()) {
    return { results: [] }
  }

  const searchResults: SearchResult[] = []

  try {
    // Search matters if included in content types
    if (contentTypes.includes('matters')) {
      let mattersQuery = supabase.from('matters').select('*')

      // Build query based on selected attributes
      // Note: We're using the column names that match our Matter type
      if (attributes.includes('clientName')) {
        mattersQuery = mattersQuery.ilike('client', `%${query}%`)
      }
      if (attributes.includes('attorney')) {
        mattersQuery = mattersQuery.or(`assigned_attorney.ilike.%${query}%`)
      }
      if (attributes.includes('caseName')) {
        mattersQuery = mattersQuery.or(`name.ilike.%${query}%`)
      }
      if (attributes.includes('opposingCouncil')) {
        // For JSON fields, we need to use the -> operator to access properties
        mattersQuery = mattersQuery.or(
          `opposing_council->name.ilike.%${query}%`
        )
      }
      if (attributes.includes('court')) {
        mattersQuery = mattersQuery.or(`court->name.ilike.%${query}%`)
      }

      const { data: matters, error } = await mattersQuery.limit(10)
      if (!error && matters) {
        searchResults.push(
          ...matters.map((matter) => ({
            id: matter.matter_id,
            type: 'Matter' as const,
            title: matter.name,
            subtitle: `Client: ${matter.client}`,
            status: matter.status as MatterStatus,
            route: `/matters/${matter.matter_id}`,
          }))
        )
      }
    }

    // Search tasks if included in content types
    if (contentTypes.includes('tasks')) {
      // For tasks, we're searching by name and also joining with matters
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*, matters(name, client)')
        .ilike('name', `%${query}%`)
        .limit(10)

      if (!error && tasks) {
        searchResults.push(
          ...tasks.map((task) => ({
            id: task.task_id,
            type: 'Task' as const,
            title: task.name,
            subtitle: task.matters
              ? `Matter: ${task.matters.name}`
              : `Due: ${
                  task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : 'No date'
                }`,
            status: task.status,
            route: `/tasks/${task.task_id}`,
          }))
        )
      }
    }

    // Search billings if included in content types
    if (contentTypes.includes('bills')) {
      // For billings, we're searching by name and remarks
      const { data: billings, error } = await supabase
        .from('billings')
        .select('*, matters(name, client)')
        .or(`name.ilike.%${query}%,remarks.ilike.%${query}%`)
        .limit(10)

      if (!error && billings) {
        searchResults.push(
          ...billings.map((billing) => ({
            id: billing.bill_id,
            type: 'Bill' as const,
            title: billing.name || `Invoice #${billing.bill_id}`,
            subtitle: `Amount: $${billing.amount || '0.00'}`,
            route: `/bills/${billing.bill_id}`,
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
