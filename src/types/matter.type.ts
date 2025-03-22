export type Matter = {
    id: string;
    name: string;
    client: string;
    status: string;
    created_at: string;
    date_opened: string;
    description: string;
    case_number: string;
    client_phone?: string;
    client_email?: string;
    client_address?: string;
    assigned_attorney?: string;
    assigned_staff?: string;
    date_closed?: string | null;
    opposing_council?: {
      name: string;
      phone: string;
      email: string;
      address: string;
    };
    court?: {
      name: string;
      phone: string;
      email: string;
    };
  };
  