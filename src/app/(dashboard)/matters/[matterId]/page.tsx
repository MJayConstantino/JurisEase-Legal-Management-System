import { notFound } from "next/navigation";
import { MatterHeader } from "@/components/matters/matterHeader";
import { MatterTabs } from "@/components/matters/matterTabs";
import { MatterDashboard } from "@/components/matters/matterDashboard";

// Sample data - in a real app, this would come from an API or database
const sampleMatters = [
  {
    id: "MAT-001",
    name: "Johnson Divorce Settlement",
    client: "Sarah Johnson",
    type: "Family Law",
    status: "open",
    date: "2023-05-15",
    description:
      "Handling divorce proceedings and asset division for Sarah Johnson.",
    caseNumber: "CV-2023-001",
    clientPhone: "(555) 123-4567",
    clientEmail: "sarah.johnson@example.com",
    clientAddress: "123 Main St, Anytown, CA 94321",
    assignedAttorney: "James Wilson",
    assignedStaff: "Sarah Parker",
    closeDate: null,
    opposingCouncil: {
      name: "Smith & Associates",
      phone: "(555) 987-6543",
      email: "contact@smithassociates.com",
      address: "456 Oak Ave, Othertown, CA 94322",
    },
    court: {
      name: "Superior Court of California, County of Los Angeles",
      phone: "(213) 555-1212",
      email: "clerk@lasuperiorcourt.gov",
      nextHearing: "2023-06-15T10:00:00",
    },
  },
  {
    id: "MAT-002",
    name: "Smith vs. ABC Corp",
    client: "John Smith",
    type: "Litigation",
    status: "pending",
    date: "2023-06-22",
    description:
      "Representing John Smith in a workplace discrimination lawsuit against ABC Corporation.",
    caseNumber: "CV-2023-002",
    clientPhone: "(555) 234-5678",
    clientEmail: "john.smith@example.com",
    clientAddress: "456 Elm St, Anytown, CA 94321",
    assignedAttorney: "Michael Brown",
    assignedStaff: "David Miller",
    closeDate: null,
    opposingCouncil: {
      name: "Corporate Legal Team",
      phone: "(555) 876-5432",
      email: "legal@abccorp.com",
      address: "789 Corporate Blvd, Business City, CA 94323",
    },
    court: {
      name: "U.S. District Court, Northern District of California",
      phone: "(415) 555-1212",
      email: "clerk@cand.uscourts.gov",
      nextHearing: "2023-07-20T09:30:00",
    },
  },
  {
    id: "MAT-003",
    name: "Williams Estate Planning",
    client: "Robert Williams",
    type: "Estate Planning",
    status: "closed",
    date: "2023-04-10",
    description:
      "Completed estate planning and will preparation for Robert Williams.",
    caseNumber: "EP-2023-003",
    clientPhone: "(555) 345-6789",
    clientEmail: "robert.williams@example.com",
    clientAddress: "789 Pine St, Anytown, CA 94321",
    assignedAttorney: "Jennifer Davis",
    assignedStaff: "Thomas Wilson",
    closeDate: "2023-08-15",
    opposingCouncil: {
      name: "N/A",
      phone: "N/A",
      email: "N/A",
      address: "N/A",
    },
    court: {
      name: "N/A",
      phone: "N/A",
      email: "N/A",
      nextHearing: null,
    },
  },
  {
    id: "MAT-004",
    name: "Davis Criminal Defense",
    client: "Michael Davis",
    type: "Criminal Defense",
    status: "open",
    date: "2023-07-05",
    description: "Defending Michael Davis against criminal charges.",
    caseNumber: "CR-2023-004",
    clientPhone: "(555) 456-7890",
    clientEmail: "michael.davis@example.com",
    clientAddress: "101 Oak St, Anytown, CA 94321",
    assignedAttorney: "Robert Johnson",
    assignedStaff: "Emily Clark",
    closeDate: null,
    opposingCouncil: {
      name: "District Attorney's Office",
      phone: "(555) 765-4321",
      email: "prosecution@da.gov",
      address: "200 Justice Way, Anytown, CA 94321",
    },
    court: {
      name: "Anytown Criminal Court",
      phone: "(555) 555-1212",
      email: "clerk@anytowncourt.gov",
      nextHearing: "2023-08-05T11:00:00",
    },
  },
  {
    id: "MAT-005",
    name: "Thompson LLC Formation",
    client: "Jennifer Thompson",
    type: "Corporate",
    status: "pending",
    date: "2023-06-30",
    description:
      "Assisting Jennifer Thompson with the formation of her new LLC and related business matters.",
    caseNumber: "BL-2023-005",
    clientPhone: "(555) 567-8901",
    clientEmail: "jennifer.thompson@example.com",
    clientAddress: "222 Maple Ave, Anytown, CA 94321",
    assignedAttorney: "William Taylor",
    assignedStaff: "Jessica Adams",
    closeDate: null,
    opposingCouncil: {
      name: "N/A",
      phone: "N/A",
      email: "N/A",
      address: "N/A",
    },
    court: {
      name: "N/A",
      phone: "N/A",
      email: "N/A",
      nextHearing: null,
    },
  },
];

export async function generateMetadata({
  params,
}: {
  params: { matterId: string };
}) {
  const matter = sampleMatters.find((m) => m.id === params.matterId);

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

export default function MatterDetailPage({
  params,
}: {
  params: { matterId: string };
}) {
  const matter = sampleMatters.find((m) => m.id === params.matterId);

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
