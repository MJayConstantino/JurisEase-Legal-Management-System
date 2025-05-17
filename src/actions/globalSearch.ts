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
        .select(
          '*, attorney:users!assigned_attorney(user_name, user_id),staff:users!assigned_staff(user_name, user_id)'
        )
        .limit(10)
      // console.log('✅ Tasks Data:', matters)
      // console.log('❌ Tasks Error:', error)
      if (error) throw new Error(error.message)

      searchResults.push(
        ...(matters ?? []).map(
          (matter: {
            opposing_council: any
            court: any
            attorney: any
            matter_id: any
            name: any
            client: any
            status: string
          }) => ({
            id: matter.matter_id,
            type: 'Matter' as const,
            title: matter.name,
            subtitle: `Client: ${matter.client},\nAttorney: ${
              matter.attorney ? matter.attorney.user_name : 'N/A'
            },\nOpposing Council: ${
              matter.opposing_council ? matter.opposing_council.name : 'N/A'
            },\nCourt: ${matter.court ? matter.court.name : 'N/A'}`,
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
          '*, matters(name, client, opposing_council, court, attorney:users!assigned_attorney(user_name))'
        )
        .limit(10)

      // console.log('✅ Tasks Data:', tasks)
      // console.log('❌ Tasks Error:', error)

      if (error) throw new Error(error.message)

      searchResults.push(
        ...(tasks ?? []).map(
          (task: {
            priority: any
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
            subtitle: `Matter: ${
              task.matters ? task.matters.name : 'N/A'
            }, Priority: ${task.priority}, Due date: ${
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
      console.log(attributes)
      let { data: billings, error } = await supabase
        .rpc('search_billings', {
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

      // console.log('🔍 Billings Query:', billingsQuery.toString())
      // console.log('✅ Billings Data:', billings)
      // console.log('❌ Billings Error:', error)

      if (error) throw new Error(error.message)

      searchResults.push(
        ...(billings ?? []).map(
          (billing: {
            bill_id: any
            matter_id: any
            status: any
            name: any
            matters: { name: any }
            amount: any
          }) => ({
            id: billing.bill_id,
            matterid: billing.matter_id,
            type: 'Bill' as const,
            status: billing.status,
            title: billing.name || `Invoice #${billing.bill_id}`,
            subtitle: `Matter: ${billing.matters.name || 'Unknown'}, Amount: $${
              billing.amount || '0.00'
            }`,
            route: `/bills/${billing.bill_id}`,
          })
        )
      )
    }

    return { results: searchResults }
  } catch (error) {
    console.error('🚨 Search Error:', error)
    return { error: 'Failed to process search' }
  }
}
