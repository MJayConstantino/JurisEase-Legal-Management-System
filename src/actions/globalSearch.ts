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
    // ✅ Case-Insensitive Matter Query
    if (contentTypes.includes('matters')) {
      let mattersQuery = supabase.from('matters').select('*')

      mattersQuery = mattersQuery.or(
        `name.ilike.%${query}%, client.ilike.%${query}%, case_number.ilike.%${query}%, court->>name.ilike.%${query}%, opposing_council->>name.ilike.%${query}%`
      )

      const { data: matters, error } = await mattersQuery.limit(10)

      console.log('🔍 Matters Query:', mattersQuery.toString())
      console.log('✅ Matters Data:', matters)
      console.log('❌ Matters Error:', error)

      if (error) throw new Error(error.message)

      searchResults.push(
        ...(matters ?? []).map((matter) => ({
          id: matter.matter_id,
          type: 'Matter' as const,
          title: matter.name,
          subtitle: `Client: ${matter.client}`,
          status: matter.status as MatterStatus,
          route: `/matters/${matter.matter_id}`,
        }))
      )
    }

    // ✅ Case-Insensitive Task Query
    if (contentTypes.includes('tasks')) {
      let tasksQuery = supabase
        .from('tasks')
        .select('*, matters(name, matter_id)')

      tasksQuery = tasksQuery.or(
        `name.ilike.%${query}%, description.ilike.%${query}%`
      )

      const { data: tasks, error } = await tasksQuery.limit(10)

      console.log('🔍 Tasks Query:', tasksQuery.toString())
      console.log('✅ Tasks Data:', tasks)
      console.log('❌ Tasks Error:', error)

      if (error) throw new Error(error.message)

      searchResults.push(
        ...(tasks ?? []).map((task) => ({
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

    // ✅ Case-Insensitive Billings Query
    if (contentTypes.includes('bills')) {
      let billingsQuery = supabase
        .from('billings')
        .select('*, matters(name, matter_id)')

      billingsQuery = billingsQuery.or(
        `name.ilike.%${query}%, remarks.ilike.%${query}%`
      )

      const { data: billings, error } = await billingsQuery.limit(10)

      console.log('🔍 Billings Query:', billingsQuery.toString())
      console.log('✅ Billings Data:', billings)
      console.log('❌ Billings Error:', error)

      if (error) throw new Error(error.message)

      searchResults.push(
        ...(billings ?? []).map((billing) => ({
          id: billing.bill_id,
          type: 'Bill' as const,
          status: billing.status,
          title: billing.name || `Invoice #${billing.bill_id}`,
          subtitle: `Matter: ${billing.matters?.name || 'Unknown'}, Amount: $${
            billing.amount || '0.00'
          }`,
          route: `/bills/${billing.bill_id}`,
        }))
      )
    }

    return { results: searchResults }
  } catch (error) {
    console.error('🚨 Search Error:', error)
    return { error: 'Failed to process search' }
  }
}
