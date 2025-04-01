import { MattersList } from "@/components/matters/mattersList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matters | Dianson Law Office",
  description: "View and manage your legal cases and client matters",
};

export default function MattersPage() {
  return (
    <div className="flex flex-col gap-3 h-full font-aileron">
      <h1 className="text-3xl font-bold">Matters</h1>
      <MattersList />
    </div>
  );
}
