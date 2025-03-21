import { notFound } from "next/navigation";
import { MatterHeader } from "@/components/matters/matterHeader";
import { MatterTabs } from "@/components/matters/matterTabs";
import { MatterDashboard } from "@/components/matters/matterDashboard";
import { getMatterById } from "@/actions/matters";

export async function generateMetadata({
  params,
}: {
  params: { matterId: string };
}) {
  // Await the params object
  const resolvedParams = await Promise.resolve(params);
  const matterId = resolvedParams.matterId;
  const matter = await getMatterById(matterId);

  if (!matter) {
    return {
      title: "Matter Not Found | Dianson Law Office",
    };
  }

  return {
    title: `${matter.name} | Dianson Law Office`,
    description: `Details for matter ${matter.id}: ${matter.name}`,
  };
}

export default async function MatterDetailPage({
  params,
}: {
  params: { matterId: string };
}) {
  const matterId = params.matterId;
  const matter = await getMatterById(matterId);

  if (!matter) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <MatterHeader matter={matter} />
      <MatterTabs matterId={matter.id}>
        <MatterDashboard matter={matter} />
      </MatterTabs>
    </div>
  );
}
