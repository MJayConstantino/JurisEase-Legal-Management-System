'use server'

import { createSupabaseClient } from '@/utils/supabase/server'
import type { SearchResult } from '@/types/searchResult.type'
import { MatterStatus } from '@/components/header/globalSearch/types'
import { Database } from '@/types/supabase'

export async function search(
  query: string,
  contentTypes: string[],
  attributes: string[]
): Promise<{ results: SearchResult[] } | { error: string }> {
  const supabase = await createSupabaseClient()
  if (!query.trim()) return { results: [] }

  const searchResults: SearchResult[] = []

  try {
    // Search matters if included
    if (contentTypes.includes('matters')) {
      const filters = attributes.map((attr) => ({
        column:
          attr === 'caseName'
            ? 'name'
            : attr === 'clientName'
            ? 'client'
            : attr === 'attorney'
            ? 'assigned_attorney'
            : attr,
        operator: 'ilike',
        value: `%${query}%`,
      }))

      let mattersQuery = supabase.from('matters').select('*')

      // Exclude UUID fields from ilike filtering
      const validFilters = filters.filter(
        (f) =>
          !['matter_id', 'assigned_attorney', 'assigned_staff'].includes(
            f.column
          )
      )

      if (validFilters.length > 0) {
        mattersQuery = mattersQuery.or(
          validFilters
            .map((f) => `${f.column}.${f.operator}."${f.value}"`)
            .join(',')
        )
      }

      // Handle UUID filtering separately
      if (query.match(/^[0-9a-fA-F-]{36}$/)) {
        // Simple UUID validation
        mattersQuery = mattersQuery.or(
          `matter_id.eq.${query}, assigned_attorney.eq.${query}, assigned_staff.eq.${query}`
        )
      }

      // Handle JSON fields separately
      const jsonFilters: {
        field: keyof Database['public']['Tables']['matters']['Row']
        property: string
      }[] = []

      if (attributes.includes('opposingCouncil')) {
        jsonFilters.push({ field: 'opposing_council', property: 'name' })
      }

      if (attributes.includes('court')) {
        jsonFilters.push({ field: 'court', property: 'name' })
      }

      const { data: matters, error } = await mattersQuery.limit(10)

      if (error) throw new Error(error.message)

      let filteredMatters = matters ?? []

      if (jsonFilters.length > 0) {
        filteredMatters = matters.filter((matter) =>
          jsonFilters.some((jf) => {
            const jsonField = matter[jf.field]
            return jsonField?.[jf.property]
              ?.toLowerCase()
              .includes(query.toLowerCase())
          })
        )
      }

      searchResults.push(
        ...filteredMatters.map((matter) => ({
          id: matter.matter_id,
          type: 'Matter' as const,
          title: matter.name,
          subtitle: `Client: ${matter.client}`,
          status: matter.status as MatterStatus,
          route: `/matters/${matter.matter_id}`,
        }))
      )
    }

    // Search tasks if included
    if (contentTypes.includes('tasks')) {
      let tasksQuery = supabase.from('tasks').select('*, matters!inner(*)')

      tasksQuery = tasksQuery
        .filter('name', 'ilike', `%${query}%`)
        .or(`description.ilike.%${query}%`)

      const { data: tasks, error } = await tasksQuery.limit(10)

      if (error) throw new Error(error.message)

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

    // Search billings if included
    if (contentTypes.includes('bills')) {
      let billingsQuery = supabase.from('billings').select('*')

      billingsQuery = billingsQuery
        .filter('name', 'ilike', `%${query}%`)
        .or(`remarks.ilike.%${query}%`)

      const { data: billings, error } = await billingsQuery.limit(10)

      if (error) throw new Error(error.message)

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

    return { results: searchResults }
  } catch (error) {
    console.error('Search error:', error)
    return { error: 'Failed to process search' }
  }
}
