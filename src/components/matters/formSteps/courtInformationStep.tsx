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
            placeholder="Superior Court of California"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="court-phone">Phone</Label>
          <Input
            id="court-phone"
            placeholder="(213) 555-1212"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="court-email">Email</Label>
          <Input
            id="court-email"
            type="email"
            placeholder="clerk@court.gov"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
