import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface BasicInformationStepProps {
  data: {
    name: string;
    case_number: string;
    status: string;
    description: string;
  };
  onChange: (field: string, value: string) => void;
}

export function BasicInformationStep({
  data,
  onChange,
}: BasicInformationStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="matter-name">Matter Name</Label>
          <Input
            id="matter-name"
            placeholder="Matter Name"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="case-number">Case Number</Label>
          <Input
            id="case-number"
            placeholder="Case Number"
            value={data.case_number}
            onChange={(e) => onChange("case_number", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={data.status}
            onValueChange={(value) => onChange("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Brief description of the matter"
            value={data.description}
            onChange={(e) => onChange("description", e.target.value)}
            className="min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );
}
