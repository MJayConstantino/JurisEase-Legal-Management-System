import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClientInformationStepProps {
  data: {
    client: string;
    client_phone: string;
    client_email: string;
    client_address: string;
  };
  onChange: (field: string, value: string) => void;
}

export function ClientInformationStep({
  data,
  onChange,
}: ClientInformationStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client-name">Client Name</Label>
          <Input
            id="client-name"
            placeholder="Client Full Name"
            value={data.client}
            onChange={(e) => onChange("client", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="client-phone">Contact Number / Phone</Label>
          <Input
            id="client-phone"
            placeholder="Contact Number / Phone"
            value={data.client_phone}
            onChange={(e) => onChange("client_phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="client-email">Email</Label>
          <Input
            id="client-email"
            type="email"
            placeholder="Client Email"
            value={data.client_email}
            onChange={(e) => onChange("client_email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="client-address">Address</Label>
          <Input
            id="client-address"
            placeholder="Client Address"
            value={data.client_address}
            onChange={(e) => onChange("client_address", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
