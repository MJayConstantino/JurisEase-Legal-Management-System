import { MattersList } from "@/components/matters/mattersList";
import type { Metadata } from "next";
import { handleFetchMatters } from "@/action-handlers/matters";
import { Suspense } from "react";
import MattersLoading from "./loading";

export const metadata: Metadata = {
  title: "Matters | JurisEase",
  description: "View and manage your legal cases and client matters",
};

export default async function MattersPage() {
  const { matters = [] } = await handleFetchMatters();

  return (
    <div className="flex flex-col gap-6 h-full">
      <Suspense fallback={<MattersLoading />} />
      <MattersList matters={matters} />
    </div>
  );
}
