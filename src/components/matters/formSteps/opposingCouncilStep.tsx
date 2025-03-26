import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OpposingCouncilStepProps {
  data: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  onChange: (field: string, value: string) => void;
}

export function OpposingCouncilStep({
  data,
  onChange,
}: OpposingCouncilStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="opposing-name">Name</Label>
          <Input
            id="opposing-name"
            placeholder="Law firm or attorney name"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="opposing-phone">Phone</Label>
          <Input
            id="opposing-phone"
            placeholder="(555) 987-6543"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="opposing-email">Email</Label>
          <Input
            id="opposing-email"
            type="email"
            placeholder="contact@example.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="opposing-address">Address</Label>
          <Input
            id="opposing-address"
            placeholder="456 Oak Ave, Othertown, CA 94322"
            value={data.address}
            onChange={(e) => onChange("address", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
