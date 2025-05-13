"use client";

import { useState } from "react";
import { CaseDetailsCard } from "./dashboardCards/caseDetailsCard";
import { OpposingCouncilDetailsCard } from "./dashboardCards/opposingCouncilDetailsCard";
import { CourtDetailsCard } from "./dashboardCards/courtDetailsCard";
import { Matter } from "@/types/matter.type";
import type { User as UserType } from "@/types/user.type";

interface MatterDashboardProps {
  matter: Matter;
  users: UserType[];
}

export function MatterDashboard({ matter, users }: MatterDashboardProps) {
  const [currentMatter, setCurrentMatter] = useState(matter);

  const handleMatterUpdate = (updatedMatter: Matter) => {
    setCurrentMatter(updatedMatter);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CaseDetailsCard
          matter={currentMatter}
          users={users}
          onUpdate={handleMatterUpdate}
        />
        <div className="space-y-6">
          <OpposingCouncilDetailsCard
            matter={currentMatter}
            onUpdate={handleMatterUpdate}
          />
          <CourtDetailsCard
            matter={currentMatter}
            onUpdate={handleMatterUpdate}
          />
        </div>
      </div>
    </div>
  );
}
