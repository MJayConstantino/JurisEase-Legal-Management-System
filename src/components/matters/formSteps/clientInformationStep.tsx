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
            placeholder="Full name"
            value={data.client}
            onChange={(e) => onChange("client", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="client-phone">Phone</Label>
          <Input
            id="client-phone"
            placeholder="(555) 123-4567"
            value={data.client_phone}
            onChange={(e) => onChange("clientPhone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="client-email">Email</Label>
          <Input
            id="client-email"
            type="email"
            placeholder="client@example.com"
            value={data.client_email}
            onChange={(e) => onChange("clientEmail", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="client-address">Address</Label>
          <Input
            id="client-address"
            placeholder="123 Main St, Anytown, CA 94321"
            value={data.client_address}
            onChange={(e) => onChange("clientAddress", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
