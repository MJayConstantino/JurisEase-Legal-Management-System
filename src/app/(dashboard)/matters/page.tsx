import { MattersList } from "@/components/matters/mattersList";
import type { Metadata } from "next";
import { handleFetchMatters } from "@/action-handlers/matters";

export const metadata: Metadata = {
  title: "Matters | Dianson Law Office",
  description: "View and manage your legal cases and client matters",
};

export default async function MattersPage() {
  const { matters = [] } = await handleFetchMatters();

  return (
    <div className="flex flex-col gap-6 h-full">
      <MattersList matters={matters} />
    </div>
  );
}
