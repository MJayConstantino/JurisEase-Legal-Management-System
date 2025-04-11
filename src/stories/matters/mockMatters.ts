// matters.mock.ts
import type {
  Matter,
  MatterStatus,
  OpposingCouncil,
  Court,
} from "@/types/matter.type";

export const mockMatters: Matter[] = [
  {
    matter_id: "1",
    name: "Smith vs. Johnson",
    client: "John Smith",
    status: "open",
    created_at: new Date("2023-01-01"),
    date_opened: new Date("2023-01-02"),
    description: "A civil dispute regarding contract terms.",
    case_number: "A123",
    client_phone: "555-1234",
    client_email: "john.smith@example.com",
    client_address: "123 Main St, Springfield",
    assigned_attorney: "Att. Jane Doe",
    assigned_staff: "Staff Joe Bloggs",
    opposing_council: {
      name: "Opposing Law Firm",
      phone: "555-4321",
      email: "info@oppose.com",
      address: "456 Opposition Rd, Capital City",
    },
    court: {
      name: "Springfield Court",
      phone: "555-6789",
      email: "contact@springfieldcourt.gov",
    },
    date_closed: undefined,
  },
  {
    matter_id: "2",
    name: "Doe vs. Roe",
    client: "Jane Doe",
    status: "closed",
    created_at: new Date("2022-07-01"),
    date_opened: new Date("2022-07-05"),
    description: "Matters involving a dispute over property boundaries.",
    case_number: "B456",
    assigned_attorney: "Att. John Smith",
    assigned_staff: "Staff Mary Johnson",
    // Minimal information to illustrate optional fields
    date_closed: new Date("2022-12-01"),
  },
  {
    matter_id: "3",
    name: "Acme Corp. Fraud",
    client: "Acme Corp.",
    status: "pending",
    created_at: new Date("2023-03-15"),
    description: "Investigation regarding alleged fraudulent activities.",
    case_number: "C789",
    client_phone: "555-9876",
    client_email: "contact@acme.com",
    assigned_attorney: "Att. Sarah Connor",
    // Optional fields intentionally omitted to show variety
  },
];
