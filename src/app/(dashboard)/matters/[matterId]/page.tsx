import { notFound } from "next/navigation";
import { MatterHeader } from "@/components/matters/matterHeader";
import { MatterTabs } from "@/components/matters/matterTabs";
import { MatterDashboard } from "@/components/matters/matterDashboard";
import { getMatterById } from "@/actions/matters";
import { fetchUsersAction } from "@/actions/users";
import MatterDetailLoading from "./loading";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ matterId: string }>;
}) {
  try {
    const { matterId } = await params;
    const matter = await getMatterById(matterId);

    if (!matter) {
      return {
        title: "Matter Not Found | JurisEase",
      };
    }

    return {
      title: `${matter.name} | JurisEase`,
      description: `Details for matter ${matter.matter_id}: ${matter.name}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error | JurisEase",
    };
  }
}

export default async function MatterDetailPage({
  params,
}: {
  params: Promise<{ matterId: string }>;
}) {
  try {
    const { matterId } = await params;
    const [matter, users] = await Promise.all([
      getMatterById(matterId),
      fetchUsersAction(),
    ]);

    if (!matter) {
      notFound();
    }

    return (
      <div className="flex flex-col gap-6 h-full">
        <Suspense fallback={<MatterDetailLoading />} />
        <MatterHeader matter={matter} />
        <MatterTabs matterId={matter.matter_id}>
          <MatterDashboard matter={matter} users={users} />
        </MatterTabs>
      </div>
    );
  } catch (error) {
    console.error("Error loading matter details:", error);
    notFound();
  }
}
