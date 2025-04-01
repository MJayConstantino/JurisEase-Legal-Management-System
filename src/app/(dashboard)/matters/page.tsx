import { MattersList } from "@/components/matters/mattersList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matters | Dianson Law Office",
  description: "View and manage your legal cases and client matters",
};

export default function MattersPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <MattersList />
    </div>
  );
}
