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
  if (!query.trim()) return { results: [] }

  const searchResults: SearchResult[] = []

  //problem with the join caused me to rely on raw SQL lol
  try {
    if (contentTypes.includes('matters')) {
      let { data: matters, error } = await supabase
        .rpc('search_matters', {
          search_term: query,
          include_attorney: attributes.includes('attorney'),
          include_client: attributes.includes('clientName'),
          include_case: attributes.includes('caseName'),
          include_opposing: attributes.includes('opposingCouncil'),
          include_court: attributes.includes('court'),
        })
        .limit(10)

      if (error) throw new Error(error.message)

      searchResults.push(
        ...(matters ?? []).map(
          (matter: {
            matter_id: any
            name: any
            client: any
            status: string
          }) => ({
            id: matter.matter_id,
            type: 'Matter' as const,
            title: matter.name,
            subtitle: `Client: ${matter.client}`,
            status: matter.status as MatterStatus,
            route: `/matters/${matter.matter_id}`,
          })
        )
      )
    }

    // ✅ Case-Insensitive Task Query
    if (contentTypes.includes('tasks')) {
      console.log(attributes)
      let { data: tasks, error } = await supabase
        .rpc('search_tasks', {
          search_term: query,
          include_attorney: attributes.includes('attorney'),
          include_client: attributes.includes('clientName'),
          include_case: attributes.includes('caseName'),
          include_opposing: attributes.includes('opposingCouncil'),
          include_court: attributes.includes('court'),
        })
        .select(
          '*, matters!inner(name, client, opposing_council, court, attorney:users!assigned_attorney(user_name))'
        )
        .limit(10)

      console.log('✅ Tasks Data:', tasks)
      console.log('❌ Tasks Error:', error)

      if (error) throw new Error(error.message)

      searchResults.push(
        ...(tasks ?? []).map(
          (task: {
            task_id: any
            matter_id: any
            name: any
            matters: { name: any }
            due_date: string | number | Date
            status: any
          }) => ({
            id: task.task_id,
            matterid: task.matter_id,
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
          })
        )
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
          matterid: billing.matter_id,
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
