export type MatterStatus = "open" | "closed" | "pending";
export type OpposingCouncil = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
};
export type Court = {
  name?: string;
  phone?: string;
  email?: string;
};
export type Matter = {
  matter_id: string;
  name: string;
  client: string;
  status: MatterStatus;
  created_at: Date;
  date_opened?: Date;
  description: string;
  case_number: string;
  client_phone?: string;
  client_email?: string;
  client_address?: string;
  assigned_attorney?: string;
  assigned_staff?: string;
  date_closed?: Date;
  opposing_council?: OpposingCouncil;
  court?: Court;
};
export type SortField =
  | "name"
  | "client"
  | "date_opened"
  | "case_number"
  | "assigned_attorney"
  | "assigned_staff";
export type SortDirection = "asc" | "desc";
