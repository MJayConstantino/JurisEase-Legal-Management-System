import { Matter } from "@/types/matter.type";

export const mockMatter: Matter = {
  matter_id: "matter1",
  name: "Property Dispute",
  client: "John Doe",
  status: "open",
  created_at: new Date("2025-01-01"),
  date_opened: new Date("2025-01-01"),
  description: "A case regarding property boundaries and ownership.",
  case_number: "PD123456",
  client_phone: "123-456-7890",
  client_email: "john.doe@example.com",
  client_address: "123 Main St, Cityville",
  assigned_attorney: "Jane Smith",
  assigned_staff: "Emily Adams",
  opposing_council: {
    name: "Mark Johnson",
    phone: "098-765-4321",
    email: "mark.johnson@example.com",
  },
  court: {
    name: "Cityville District Court",
    phone: "555-1234",
    email: "cityville.court@example.com",
  },
};
