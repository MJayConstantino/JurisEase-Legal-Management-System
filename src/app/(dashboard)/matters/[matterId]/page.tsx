import { notFound } from 'next/navigation'
import { MatterHeader } from '@/components/matters/matterHeader'
import { MatterTabs } from '@/components/matters/matterTabs'
import { MatterDashboard } from '@/components/matters/matterDashboard'
import { getMatterById } from '@/actions/matters'
import { fetchUsersAction } from '@/actions/users'
import MatterDetailLoading from './loading'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ matterId: string }>
}) {
  try {
    const { matterId } = await params

    if (!matterId) {
      return {
        title: 'Matter Not Found | JurisEase',
      }
    }

    const matter = await getMatterById(matterId)

    if (!matter) {
      return {
        title: 'Matter Not Found | JurisEase',
      }
    }

    return {
      title: `${matter.name} | JurisEase`,
      description: `Details for matter ${matter.matter_id}: ${matter.name}`,
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error | JurisEase',
    }
  }
}

export default async function MatterDetailPage({
  params,
}: {
  params: Promise<{ matterId: string }>
}) {
  try {
    const { matterId } = await params

    if (!matterId) {
      notFound()
    }

    const matter = await getMatterById(matterId)

    if (!matter) {
      notFound()
    }

    const users = await fetchUsersAction()

    return (
      <div className="flex flex-col gap-6 h-full">
        <MatterHeader matter={matter} />
        <MatterTabs matterId={matter.matter_id}>
          <Suspense fallback={<MatterDetailLoading />}>
            <MatterDashboard matter={matter} users={users} />
          </Suspense>
        </MatterTabs>
      </div>
    )
  } catch (error) {
    console.error('Error fetching matter details:', error)
    notFound()
  }
}
