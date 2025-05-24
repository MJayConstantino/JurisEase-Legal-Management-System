"use client";

import { Matter } from "@/types/matter.type";
import { User } from "@/types/user.type";
import { MatterHeader } from "./matterHeader";
import { MatterTabs } from "./matterTabs";
import { MatterDashboard } from "./matterDashboard";
import { Suspense } from "react";
import MatterDetailLoading from "@/app/(dashboard)/matters/[matterId]/loading";

interface MatterPageProps {
  matter: Matter;
  users: User[];
}

export function MatterPage({ matter, users }: MatterPageProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      <MatterHeader matter={matter} />
      <MatterTabs matterId={matter.matter_id}>
        <Suspense fallback={<MatterDetailLoading />}>
          <MatterDashboard matter={matter} users={users} />
        </Suspense>
      </MatterTabs>
    </div>
  );
}
