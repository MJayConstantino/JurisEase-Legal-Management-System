"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { createMatter } from "@/actions/matters";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AddMatterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMatterDialog({ open, onOpenChange }: AddMatterDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [matterData, setMatterData] = useState({
    name: "",
    client: "",
    status: "open",
    description: "",
    date_opened: new Date().toISOString().split("T")[0],
    case_number: "",
    client_phone: "",
    client_email: "",
    client_address: "",
    assigned_attorney: "",
    assigned_staff: "",
    opposing_council: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    court: {
      name: "",
      phone: "",
      email: "",
    },
  });

  // Define form steps
  const formSteps = [
    {
      title: "Basic Information",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="matter-name">Matter Name</Label>
              <Input
                id="matter-name"
                placeholder="e.g. Smith Divorce Case"
                value={matterData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="case-number">Case Number</Label>
              <Input
                id="case-number"
                placeholder="e.g. CV-2023-001"
                value={matterData.case_number}
                onChange={(e) => handleChange("case_number", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={matterData.status}
                onValueChange={(value) => handleChange("status", value)}
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
                value={matterData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Client Information",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-name">Client Name</Label>
              <Input
                id="client-name"
                placeholder="Full name"
                value={matterData.client}
                onChange={(e) => handleChange("client", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-phone">Phone</Label>
              <Input
                id="client-phone"
                placeholder="(555) 123-4567"
                value={matterData.client_phone}
                onChange={(e) => handleChange("client_phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-email">Email</Label>
              <Input
                id="client-email"
                type="email"
                placeholder="client@example.com"
                value={matterData.client_email}
                onChange={(e) => handleChange("client_email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-address">Address</Label>
              <Input
                id="client-address"
                placeholder="123 Main St, Anytown, CA 94321"
                value={matterData.client_address}
                onChange={(e) => handleChange("client_address", e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Assignment",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assigned-attorney">Assigned Attorney</Label>
              <Input
                id="assigned-attorney"
                placeholder="Attorney name"
                value={matterData.assigned_attorney}
                onChange={(e) =>
                  handleChange("assigned_attorney", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assigned-staff">Assigned Staff</Label>
              <Input
                id="assigned-staff"
                placeholder="Staff name"
                value={matterData.assigned_staff}
                onChange={(e) => handleChange("assigned_staff", e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Opposing Council",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="opposing-name">Name</Label>
              <Input
                id="opposing-name"
                placeholder="Law firm or attorney name"
                value={matterData.opposing_council.name}
                onChange={(e) =>
                  handleNestedChange("opposing_council", "name", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="opposing-phone">Phone</Label>
              <Input
                id="opposing-phone"
                placeholder="(555) 987-6543"
                value={matterData.opposing_council.phone}
                onChange={(e) =>
                  handleNestedChange(
                    "opposing_council",
                    "phone",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="opposing-email">Email</Label>
              <Input
                id="opposing-email"
                type="email"
                placeholder="contact@example.com"
                value={matterData.opposing_council.email}
                onChange={(e) =>
                  handleNestedChange(
                    "opposing_council",
                    "email",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="opposing-address">Address</Label>
              <Input
                id="opposing-address"
                placeholder="456 Oak Ave, Othertown, CA 94322"
                value={matterData.opposing_council.address}
                onChange={(e) =>
                  handleNestedChange(
                    "opposing_council",
                    "address",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Court Information",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="court-name">Court Name</Label>
              <Input
                id="court-name"
                placeholder="Superior Court of California"
                value={matterData.court.name}
                onChange={(e) =>
                  handleNestedChange("court", "name", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="court-phone">Phone</Label>
              <Input
                id="court-phone"
                placeholder="(213) 555-1212"
                value={matterData.court.phone}
                onChange={(e) =>
                  handleNestedChange("court", "phone", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="court-email">Email</Label>
              <Input
                id="court-email"
                type="email"
                placeholder="clerk@court.gov"
                value={matterData.court.email}
                onChange={(e) =>
                  handleNestedChange("court", "email", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleChange = (field: string, value: string) => {
    setMatterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: string) => {
    setMatterData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as any),
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createMatter({
        ...matterData,
      });

      toast.success("New matter has been created successfully.");

      // Reset form
      setMatterData({
        name: "",
        client: "",
        status: "open",
        description: "",
        date_opened: new Date().toISOString().split("T")[0],
        case_number: "",
        client_phone: "",
        client_email: "",
        client_address: "",
        assigned_attorney: "",
        assigned_staff: "",
        opposing_council: {
          name: "",
          phone: "",
          email: "",
          address: "",
        },
        court: {
          name: "",
          phone: "",
          email: "",
        },
      });
      setCurrentStep(0);
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create matter. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === formSteps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          // Reset to first step when dialog is closed
          setTimeout(() => setCurrentStep(0), 300);
        }
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Matter</DialogTitle>
          <DialogDescription>
            Create a new legal matter or case for your client.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step indicator */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">
              {formSteps[currentStep].title}
            </h3>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {formSteps.length}
            </div>
          </div>

          {/* Step content */}
          <div className="min-h-[300px]">{formSteps[currentStep].content}</div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={isFirstStep}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              {isLastStep ? (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Matter"}
                </Button>
              ) : (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
