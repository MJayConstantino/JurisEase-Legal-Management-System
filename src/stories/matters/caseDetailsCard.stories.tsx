import type { Meta, StoryObj } from "@storybook/react";
import { CourtDetailsCard } from "@/components/matters/dashboardCards/courtDetailsCard";
import { action } from "@storybook/addon-actions";
import type { Matter } from "@/types/matter.type";

export const sampleCourtMatter: Matter = {
  matter_id: "1",
  created_at: new Date("2023-01-01"),
  name: "Sample Case Title",
  case_number: "CASE-1234",
  status: "open",
  description: "This is a sample case description.",
  date_opened: new Date("2023-01-01"),
  date_closed: undefined,
  client: "John Doe",
  client_phone: "555-1234",
  client_email: "john.doe@example.com",
  client_address: "123 Main St, Cityville",
  assigned_attorney: "attorney1",
  assigned_staff: "staff1",
  court: {
    name: "Superior Court",
    phone: "555-5678",
    email: "court@example.com",
  },
  opposing_council: {
    name: "Opposing Law Firm",
    phone: "555-8765",
    email: "council@example.com",
    address: "456 Another St, Townsville",
  },
};

// Create a variant with missing court details.
const incompleteCourtMatter: Matter = {
  ...sampleCourtMatter,
  court: {
    name: "",
    phone: undefined,
    email: undefined,
  },
};

const meta: Meta<typeof CourtDetailsCard> = {
  title: "Cards/CourtDetailsCard",
  component: CourtDetailsCard,
};

export default meta;
type Story = StoryObj<typeof CourtDetailsCard>;

export const CompleteCourtDetails: Story = {
  args: {
    matter: sampleCourtMatter,
    onUpdate: action("onUpdate"),
  },
};

export const IncompleteCourtDetails: Story = {
  args: {
    matter: incompleteCourtMatter,
    onUpdate: action("onUpdate"),
  },
};
