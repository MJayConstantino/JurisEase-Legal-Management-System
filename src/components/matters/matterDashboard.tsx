"use client";

import { useState } from "react";
import { CaseDetailsCard } from "./dashboardCards/caseDetailsCard";
import { OpposingCouncilDetailsCard } from "./dashboardCards/opposingCouncilDetailsCard";
import { CourtDetailsCard } from "./dashboardCards/courtDetailsCard";
import { Matter } from "@/types/matter.type";

interface MatterDashboardProps {
  matter: Matter;
}

export function MatterDashboard({ matter }: MatterDashboardProps) {
  const [currentMatter, setCurrentMatter] = useState(matter);

  const handleMatterUpdate = (updatedMatter: Matter) => {
    setCurrentMatter(updatedMatter);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CaseDetailsCard
            matter={currentMatter}
            onUpdate={handleMatterUpdate}
          />
        </div>
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
