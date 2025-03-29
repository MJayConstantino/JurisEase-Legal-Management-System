import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CourtInformationStepProps {
  data: {
    name: string;
    phone: string;
    email: string;
  };
  onChange: (field: string, value: string) => void;
}

export function CourtInformationStep({
  data,
  onChange,
}: CourtInformationStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="court-name">Court Name</Label>
          <Input
            id="court-name"
            placeholder="Court Name"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="court-phone">Contact Number / Phone</Label>
          <Input
            id="court-phone"
            placeholder="Contact Number / Phone"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="court-email">Email</Label>
          <Input
            id="court-email"
            type="email"
            placeholder="Court Email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
