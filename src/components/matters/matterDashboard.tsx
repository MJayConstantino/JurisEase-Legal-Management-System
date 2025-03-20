import CaseDetailsCard from "./caseDetailsCard";
import CourtDetailsCard from "./courtDetailsCard";
import OpposingCouncilDetailsCard from "./opposingCouncilDetailsCard";

interface Matter {
  id: string;
  name: string;
  client: string;
  type: string;
  status: string;
  date: string;
  description: string;
  caseNumber?: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  assignedAttorney?: string;
  assignedStaff?: string;
  closeDate?: string | null;
  opposingCouncil?: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  court?: {
    name: string;
    phone: string;
    email: string;
    nextHearing: string | null;
  };
}

interface MatterDashboardProps {
  matter: Matter;
}

export function MatterDashboard({ matter }: MatterDashboardProps) {
  // Fallback values if props are missing.
  const caseNumber = matter.caseNumber || "N/A";
  const clientPhone = matter.clientPhone || "N/A";
  const clientEmail = matter.clientEmail || "N/A";
  const clientAddress = matter.clientAddress || "N/A";
  const assignedAttorney = matter.assignedAttorney || "N/A";
  const assignedStaff = matter.assignedStaff || "N/A";

  const opposingCouncil = matter.opposingCouncil || {
    name: "N/A",
    phone: "N/A",
    email: "N/A",
    address: "N/A",
  };

  const court = matter.court || {
    name: "N/A",
    phone: "N/A",
    email: "N/A",
    nextHearing: null,
  };

  return (
    <div className="space-y-6">
      <CaseDetailsCard
        matter={matter}
        caseNumber={caseNumber}
        clientPhone={clientPhone}
        clientEmail={clientEmail}
        clientAddress={clientAddress}
        assignedAttorney={assignedAttorney}
        assignedStaff={assignedStaff}
      />

      <OpposingCouncilDetailsCard opposingCouncil={opposingCouncil} />
      <CourtDetailsCard court={court} />
    </div>
  );
}
