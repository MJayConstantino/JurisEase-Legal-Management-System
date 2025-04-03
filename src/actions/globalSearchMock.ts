'use server'

import type {
  SearchResult,
  Matter,
  Task,
  Billing,
} from '@/components/header/globalSearch/types'

/**
 * This file contains the mock implementation of the search functionality.
 * It's used as a placeholder until the real Supabase implementation is ready.
 *
 * The mock data follows the exact same types as defined in the types files:
 * - Matter: Case information with client, status, etc.
 * - Task: Task information with priority, status, etc.
 * - Billing: Billing information with amount, status, etc.
 *
 * To switch to the real implementation:
 * 1. Update the globalSearch.ts file to use the real Supabase implementation
 * 2. Change the export in globalSearch.ts to export the real search function
 */

// Mock data with the provided types
const MOCK_MATTERS: Matter[] = [
  {
    matter_id: 'm1',
    name: 'Jose Scammer Case',
    client: 'Jose Suoberon',
    status: 'open', // Using MatterStatus type
    created_at: new Date('2025-01-15'),
    date_opened: new Date('2025-01-15'),
    description: 'Fraud case against online scammer',
    case_number: 'FR-2025-001',
    client_phone: '555-123-4567',
    client_email: 'jose@example.com',
    assigned_attorney: 'Toni Legayada',
    court: { name: 'District Court' }, // Using Court type
    opposing_council: { name: 'Smith & Associates' }, // Using OpposingCouncil type
  },
  {
    matter_id: 'm2',
    name: 'Hello World',
    client: 'Jose',
    status: 'pending', // Using MatterStatus type
    created_at: new Date('2025-02-10'),
    description: 'Intellectual property dispute',
    case_number: 'IP-2025-042',
    client_email: 'jose@company.com',
    court: { name: 'Supreme Court' },
    opposing_council: { name: 'Johnson Legal' },
  },
  {
    matter_id: 'm3',
    name: 'Trademark Dispute',
    client: 'TechCorp Inc.',
    status: 'open',
    created_at: new Date('2025-03-05'),
    date_opened: new Date('2025-03-05'),
    description: 'Trademark infringement case',
    case_number: 'TM-2025-103',
    client_phone: '555-987-6543',
    client_email: 'legal@techcorp.com',
    assigned_attorney: 'Toni Legayada',
    court: { name: 'Federal Court' },
    opposing_council: { name: 'Legal Eagles LLP' },
  },
  {
    matter_id: 'm4',
    name: 'Patent Infringement',
    client: 'Innovate LLC',
    status: 'open',
    created_at: new Date('2025-02-20'),
    date_opened: new Date('2025-02-20'),
    description: 'Patent infringement lawsuit',
    case_number: 'PT-2025-078',
    client_phone: '555-456-7890',
    client_email: 'patents@innovate.com',
    assigned_attorney: 'MJ Constantino',
    court: { name: 'Federal Court' },
    opposing_council: { name: 'Tech Defense Group' },
  },
  {
    matter_id: 'm5',
    name: 'Contract Dispute',
    client: 'BuildRight Construction',
    status: 'closed',
    created_at: new Date('2024-11-15'),
    date_opened: new Date('2024-11-15'),
    date_closed: new Date('2025-03-10'),
    description: 'Construction contract dispute',
    case_number: 'CD-2024-156',
    client_phone: '555-789-0123',
    client_email: 'legal@buildright.com',
    court: { name: 'County Court' },
    opposing_council: { name: 'Legal Partners Inc.' },
  },
  {
    matter_id: 'm6',
    name: 'Employment Lawsuit',
    client: 'WorkForce Inc.',
    status: 'open',
    created_at: new Date('2025-01-05'),
    date_opened: new Date('2025-01-05'),
    description: 'Wrongful termination claim',
    case_number: 'EL-2025-023',
    client_phone: '555-234-5678',
    client_email: 'hr@workforce.com',
    assigned_attorney: 'Toni Legayada',
    court: { name: 'Labor Court' },
    opposing_council: { name: 'Employee Rights Group' },
  },
  {
    matter_id: 'm7',
    name: 'Real Estate Dispute',
    client: 'Property Holdings LLC',
    status: 'open',
    created_at: new Date('2025-02-28'),
    date_opened: new Date('2025-02-28'),
    description: 'Property boundary dispute',
    case_number: 'RE-2025-089',
    client_phone: '555-345-6789',
    client_email: 'info@propertyholdings.com',
    assigned_attorney: 'MJ Constantino',
    court: { name: 'Civil Court' },
    opposing_council: { name: 'Land Rights Advocates' },
  },
  {
    matter_id: 'm8',
    name: 'Insurance Claim',
    client: 'SafeGuard Insurance',
    status: 'pending',
    created_at: new Date('2025-03-15'),
    description: 'Insurance claim dispute',
    case_number: 'IC-2025-112',
    client_phone: '555-456-7890',
    client_email: 'claims@safeguard.com',
    court: { name: 'District Court' },
    opposing_council: { name: 'Claimant Legal Team' },
  },
]

const MOCK_TASKS: Task[] = [
  {
    task_id: 't1',
    name: 'File motion for discovery',
    description:
      'Prepare and file motion for discovery in the Jose Scammer Case',
    due_date: new Date('2025-04-15'),
    priority: 'high', // Using Priority type
    status: 'pending', // Using TaskStatus type
    matter_id: 'm1',
    created_at: new Date('2025-03-20'),
  },
  {
    task_id: 't2',
    name: 'Client meeting preparation',
    description:
      'Prepare documents for client meeting regarding Hello World case',
    due_date: new Date('2025-04-10'),
    priority: 'medium',
    status: 'pending',
    matter_id: 'm2',
    created_at: new Date('2025-03-25'),
  },
  {
    task_id: 't3',
    name: 'Draft settlement agreement',
    description: 'Draft settlement agreement for Trademark Dispute case',
    due_date: new Date('2025-04-20'),
    priority: 'high',
    status: 'completed',
    matter_id: 'm3',
    created_at: new Date('2025-03-15'),
  },
  {
    task_id: 't4',
    name: 'Review case documents',
    description: 'Review all documents for Patent Infringement case',
    due_date: new Date('2025-04-25'),
    priority: 'medium',
    status: 'completed',
    matter_id: 'm4',
    created_at: new Date('2025-03-10'),
  },
  {
    task_id: 't5',
    name: 'Schedule expert witness',
    description:
      'Contact and schedule expert witness for Contract Dispute case',
    due_date: new Date('2025-05-01'),
    priority: 'medium',
    status: 'pending',
    matter_id: 'm5',
    created_at: new Date('2025-03-28'),
  },
  {
    task_id: 't6',
    name: 'Prepare for deposition',
    description: 'Prepare client for upcoming deposition in Employment Lawsuit',
    due_date: new Date('2025-05-05'),
    priority: 'high',
    status: 'pending',
    matter_id: 'm6',
    created_at: new Date('2025-03-30'),
  },
  {
    task_id: 't7',
    name: 'File court documents',
    description: 'File necessary court documents for Real Estate Dispute',
    due_date: new Date('2025-05-10'),
    priority: 'medium',
    status: 'completed',
    matter_id: 'm7',
    created_at: new Date('2025-03-22'),
  },
  {
    task_id: 't8',
    name: 'Research legal precedents',
    description: 'Research legal precedents for Insurance Claim case',
    due_date: new Date('2025-05-15'),
    priority: 'low',
    status: 'pending',
    matter_id: 'm8',
    created_at: new Date('2025-04-01'),
  },
]

const MOCK_BILLS: Billing[] = [
  {
    bill_id: 'b1',
    name: 'Initial Consultation',
    amount: '1250.00',
    remarks: 'Initial consultation and case assessment',
    status: 'Paid',
    created_at: '2025-03-01',
  },
  {
    bill_id: 'b2',
    name: 'Document Preparation',
    amount: '750.00',
    remarks: 'Preparation of legal documents',
    status: 'Unpaid',
    created_at: '2025-03-15',
  },
  {
    bill_id: 'b3',
    name: 'Court Filing Fees',
    amount: '2500.00',
    remarks: 'Court filing fees and related expenses',
    status: 'Paid',
    created_at: '2025-03-10',
  },
  {
    bill_id: 'b4',
    name: 'Expert Witness Fees',
    amount: '3750.00',
    remarks: 'Expert witness consultation and testimony',
    status: 'Pending',
    created_at: '2025-03-20',
  },
  {
    bill_id: 'b5',
    name: 'Legal Research',
    amount: '1800.00',
    remarks: 'Legal research and case analysis',
    status: 'Unpaid',
    created_at: '2025-03-25',
  },
  {
    bill_id: 'b6',
    name: 'Deposition Services',
    amount: '2200.00',
    remarks: 'Deposition services and transcripts',
    status: 'Paid',
    created_at: '2025-03-18',
  },
  {
    bill_id: 'b7',
    name: 'Settlement Negotiation',
    amount: '3100.00',
    remarks: 'Settlement negotiation services',
    status: 'Pending',
    created_at: '2025-03-28',
  },
  {
    bill_id: 'b8',
    name: 'Trial Preparation',
    amount: '950.00',
    remarks: 'Trial preparation and document organization',
    status: 'Unpaid',
    created_at: '2025-04-01',
  },
]

/**
 * Mock implementation of the search functionality
 *
 * This function:
 * 1. Accepts search query, content types, and attributes parameters
 * 2. Filters mock data based on search criteria
 * 3. Returns formatted results for display in the search dialog
 * 4. Supports searching across matters, tasks, and bills
 *
 * The filtering logic mimics how Supabase would filter data in a real implementation,
 * making it easier to switch to the real implementation later.
 */
export async function searchMock(
  query: string,
  contentTypes: string[],
  attributes: string[]
): Promise<{ results: SearchResult[] } | { error: string }> {
  if (!query.trim()) {
    return { results: [] }
  }

  const searchResults: SearchResult[] = []
  const queryLower = query.toLowerCase()

  try {
    // Search matters if included in content types
    if (contentTypes.includes('matters')) {
      // Filter matters based on selected attributes
      const filteredMatters = MOCK_MATTERS.filter((matter) => {
        return (
          (attributes.includes('clientName') &&
            matter.client.toLowerCase().includes(queryLower)) ||
          (attributes.includes('attorney') &&
            matter.assigned_attorney?.toLowerCase()?.includes(queryLower)) ||
          (attributes.includes('caseName') &&
            matter.name.toLowerCase().includes(queryLower)) ||
          (attributes.includes('opposingCouncil') &&
            matter.opposing_council?.name
              ?.toLowerCase()
              ?.includes(queryLower)) ||
          (attributes.includes('court') &&
            matter.court?.name?.toLowerCase()?.includes(queryLower))
        )
      })

      // Format matters for display in search results
      searchResults.push(
        ...filteredMatters.map((matter) => ({
          id: matter.matter_id,
          type: 'Matter' as const,
          title: matter.name,
          subtitle: `Client: ${matter.client}`,
          status: matter.status,
          route: `/matters/${matter.matter_id}`,
        }))
      )
    }

    // Search tasks if included in content types
    if (contentTypes.includes('tasks')) {
      // Filter tasks based on name, description, or related matter
      const filteredTasks = MOCK_TASKS.filter((task) => {
        // Direct match on task name or description
        if (
          task.name.toLowerCase().includes(queryLower) ||
          (task.description &&
            task.description.toLowerCase().includes(queryLower))
        ) {
          return true
        }

        // Match on related matter if relevant attributes are selected
        if (
          attributes.some((attr) =>
            ['clientName', 'attorney', 'caseName'].includes(attr)
          ) &&
          task.matter_id
        ) {
          const relatedMatter = MOCK_MATTERS.find(
            (m) => m.matter_id === task.matter_id
          )
          if (relatedMatter) {
            return (
              (attributes.includes('clientName') &&
                relatedMatter.client.toLowerCase().includes(queryLower)) ||
              (attributes.includes('attorney') &&
                relatedMatter.assigned_attorney
                  ?.toLowerCase()
                  ?.includes(queryLower)) ||
              (attributes.includes('caseName') &&
                relatedMatter.name.toLowerCase().includes(queryLower))
            )
          }
        }

        return false
      })

      // Format tasks for display in search results
      searchResults.push(
        ...filteredTasks.map((task) => {
          const relatedMatter = task.matter_id
            ? MOCK_MATTERS.find((m) => m.matter_id === task.matter_id)
            : undefined

          return {
            id: task.task_id,
            type: 'Task' as const,
            title: task.name,
            subtitle: relatedMatter
              ? `Matter: ${relatedMatter.name}`
              : `Due: ${
                  task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : 'No date'
                }`,
            status: task.status,
            route: `/tasks/${task.task_id}`,
          }
        })
      )
    }

    // Search bills if included in content types
    if (contentTypes.includes('bills')) {
      // Filter bills based on name or remarks
      const filteredBills = MOCK_BILLS.filter((bill) => {
        return (
          (bill.name && bill.name.toLowerCase().includes(queryLower)) ||
          (bill.remarks && bill.remarks.toLowerCase().includes(queryLower))
        )
      })

      // Format bills for display in search results
      searchResults.push(
        ...filteredBills.map((bill) => ({
          id: bill.bill_id,
          type: 'Bill' as const,
          title: bill.name || `Invoice #${bill.bill_id}`,
          subtitle: `Amount: $${bill.amount || '0.00'}`,
          route: `/bills/${bill.bill_id}`,
        }))
      )
    }

    // Simulate a slight delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return { results: searchResults }
  } catch (error) {
    console.error('Error processing search:', error)
    return { error: 'Failed to process search' }
  }
}
