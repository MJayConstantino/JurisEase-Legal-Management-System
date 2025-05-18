import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('_SUPABASE_URL')!,
  Deno.env.get('_SUPABASE_SERVICE_KEY')!
)
const mockUser = {
  user_id: 'e9c14776-0c63-4a74-bd76-1ee41b8eadcb',
  user_name: 'TestUser',
  user_email: 'testUser@test.com',
}
const mockMatter = {
  name: 'testMatter',
  client: 'testMatterClient',
  case_number: 'testCaseNumber',
  status: 'pending',
  description: 'testDescription',
  created_at: new Date(),
  date_opened: new Date(),
  assigned_attorney: 'e9c14776-0c63-4a74-bd76-1ee41b8eadcb',
  opposing_council: { name: 'testOpposingCouncil' },
  court: { name: 'testCourt', email: 'N/A', phone: 'N/A' },
}

const mockTaskWithoutMatter = {
  name: 'Mock Task (No Matter)',
  description: 'Standalone task',
  due_date: undefined,
  priority: 'low',
  status: 'in-progress',
  created_at: new Date(),
}
type ContentTypeFilter = 'matters' | 'tasks' | 'bills'
type AttributeTypeFilter =
  | 'attorney'
  | 'clientName'
  | 'caseName'
  | 'opposingCouncil'
  | 'court'
interface RequestType {
  action:
    | 'INITIALIZE_MOCKS'
    | 'VERIFY_MOCK_EXISTS'
    | 'SEARCH_MATTERS'
    | 'SEARCH_TASKS'
    | 'SEARCH_BILLS'
    | 'DELETE_ALL_MOCKS'

  query: string
  contentTypes: ContentTypeFilter[]
  attributes: AttributeTypeFilter[]
}

Deno.serve(async (req) => {
  const { action, query, contentTypes, attributes }: RequestType =
    await req.json()

  //// ✅ Verify Authorization Header
  const authHeader = req.headers.get('Authorization')
  if (
    !authHeader ||
    // 🚨change this bearer token in the env
    authHeader !== `Bearer ${Deno.env.get('_USER_CRUD_TOKEN')}`
  ) {
    return new Response(
      JSON.stringify({
        code: 401,
        message: 'Missing or invalid authorization header',
      }),
      { headers: { 'Content-Type': 'application/json' }, status: 401 }
    )
  }

  try {
    // ✅ 1. Initialize Mock Data
    if (action === 'INITIALIZE_MOCKS') {
      console.log('Initializing mock test data...')
      // ✅Create User

      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([mockUser])
        .select()

      //✅ Create Matter

      if (userError) {
        throw new Error('User Creation failed:' + userError.message)
      }
      const { data: matterData, error: matterError } = await supabase
        .from('matters')
        .insert([mockMatter])
        .select()

      if (matterError)
        throw new Error('Matter creation failed: ' + matterError.message)
      const matterId = matterData[0].matter_id

      const { data: taskWithoutMatter, error: taskError1 } = await supabase
        .from('tasks')
        .insert([mockTaskWithoutMatter])
        .select()

      if (taskError1)
        throw new Error('Task creation failed: ' + taskError1.message)

      const mockTaskWithMatter = {
        name: 'Mock Task (With Matter)',
        description: 'Task tied to initialized Matter',
        due_date: new Date(),
        priority: 'medium',
        status: 'completed',
        matter_id: matterId,
        created_at: new Date(),
      }

      const { data: taskWithMatter, error: taskError2 } = await supabase
        .from('tasks')
        .insert([mockTaskWithMatter])
        .select()

      if (taskError2)
        throw new Error('Task creation failed: ' + taskError2.message)

      const mockBill = {
        matter_id: matterId,
        name: 'MockBill',
        amount: 100,
        created_at: new Date().toISOString(),
        status: 'paid',
        remarks: '',
      }

      const { data: billData, error: billError } = await supabase
        .from('billings')
        .insert([mockBill])
        .select()

      if (billError)
        throw new Error('Bill creation failed: ' + billError.message)

      return new Response(
        JSON.stringify({
          status: 201,
          message: 'Mock records initialized successfully.',
          data: {
            matter: matterData,
            tasks: [taskWithoutMatter, taskWithMatter],
            bill: billData,
            user: userData,
          },
        }),
        { headers: { 'Content-Type': 'application/json' }, status: 201 }
      )
    }

    // ✅ 2. Verify Mock Records Exist
    if (action === 'VERIFY_MOCK_EXISTS') {
      console.log('Verifying mock records in Supabase...')

      const { data: matters, error: mattersError } = await supabase
        .from('matters')
        .select('*')
        .eq('name', 'testMatter')

      const { data: tasks, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .or('name.eq.Mock Task (No Matter),name.eq.Mock Task (With Matter)')

      const { data: bills, error: billsError } = await supabase
        .from('billings')
        .select('*')
        .eq('name', 'MockBill')

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', mockUser.user_id)

      if (mattersError || tasksError || billsError || userError) {
        throw new Error('Failed to verify mock records.')
      }

      return new Response(
        JSON.stringify({
          status: 200,
          message: 'Mock records verified successfully.',
          data: { matters, tasks, bills, user },
        }),
        { headers: { 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // ✅3. SEARCH MATTERS
    if (action == 'SEARCH_MATTERS') {
      console.log('searching matters...')
      if (!contentTypes.includes('matters')) {
        return new Response(
          JSON.stringify({
            status: 400,
            message: 'Matters was not included in content-type',
          }),
          { headers: { 'Content-Type': 'application/json' }, status: 400 }
        )
      }
      // then individually change the dynamic by providing or
      const { data: matters, error: matterError } = await supabase
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

      if (matterError) {
        return new Response(
          JSON.stringify({
            status: 500,
            message: matterError.message,
          }),
          { headers: { 'Content-Type': 'application/json' }, status: 500 }
        )
      }
      return new Response(
        JSON.stringify({
          status: 200,
          message: 'Mock records verified successfully.',
          data: { matters },
        }),
        { headers: { 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // ✅4. SEARCH TASKS
    if (action == 'SEARCH_TASKS') {
      console.log('searching tasks...')
      if (!contentTypes.includes('tasks')) {
        return new Response(
          JSON.stringify({
            status: 400,
            message: 'Tasks was not included in content-type',
          }),
          { headers: { 'Content-Type': 'application/json' }, status: 400 }
        )
      }
      // 🚨then individually change the dynamic by providing or
      const { data: tasks, error: taskError } = await supabase
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

      if (taskError) {
        return new Response(
          JSON.stringify({
            status: 500,
            message: taskError.message,
          }),
          { headers: { 'Content-Type': 'application/json' }, status: 500 }
        )
      }
      return new Response(
        JSON.stringify({
          status: 200,
          message: 'Mock records verified successfully.',
          data: { tasks },
        }),
        { headers: { 'Content-Type': 'application/json' }, status: 200 }
      )
    }
    // ✅5. SEARCH BILLS
    if (action == 'SEARCH_BILLS') {
      console.log('searching bills...')
      if (!contentTypes.includes('bills')) {
        return new Response(
          JSON.stringify({
            status: 400,
            message: 'Bills was not included in content-type',
          }),
          { headers: { 'Content-Type': 'application/json' }, status: 400 }
        )
      }
      // then individually change the dynamic by providing or
      const { data: bills, error: billError } = await supabase
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

      if (billError) {
        return new Response(
          JSON.stringify({
            status: 500,
            message: billError.message,
          }),
          { headers: { 'Content-Type': 'application/json' }, status: 500 }
        )
      }
      return new Response(
        JSON.stringify({
          status: 200,
          message: 'Mock records verified successfully.',
          data: { bills },
        }),
        { headers: { 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // ✅ 6.  Clean Up Mock Data
    if (action === 'DELETE_ALL_MOCKS') {
      console.log('Cleaning up mock data...')
      const { error: mattersDeleteError } = await supabase
        .from('matters')
        .delete()
        .eq('name', 'testMatter')
      const { error: userDeleteError } = await supabase
        .from('users')
        .delete()
        .eq('user_id', mockUser.user_id)
      const { error: taskDeleteError } = await supabase
        .from('tasks')
        .delete()
        .eq('name', 'Mock Task (No Matter)')

      if (mattersDeleteError || userDeleteError || taskDeleteError) {
        throw new Error('Failed to clean up records')
      }
      return new Response(
        JSON.stringify({
          status: 200,
          message: 'Mock records deleted.',
        }),
        { headers: { 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    //❌ invalid action
    return new Response(
      JSON.stringify({ status: 400, error: 'Invalid action provided' }),
      { headers: { 'Content-Type': 'application/json' }, status: 400 }
    )
  } catch (error: any) {
    //❌ GENERAL ERROR HANDLING
    console.error('Function Error:', error.message)
    return new Response(JSON.stringify({ status: 500, error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
