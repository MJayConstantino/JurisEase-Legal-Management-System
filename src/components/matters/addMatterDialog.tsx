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
import { createMatter } from "@/actions/matters";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BasicInformationStep } from "./formSteps/basicInformationStep";
import { ClientInformationStep } from "./formSteps/clientInformationStep";
import { AssignmentStep } from "./formSteps/assignmentStep";
import { OpposingCouncilStep } from "./formSteps/opposingCouncilStep";
import { CourtInformationStep } from "./formSteps/courtInformationStep";

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
    created_at: new Date().toISOString(),
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
    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      return;
    }
    setIsSubmitting(true);

    try {
      await createMatter({ ...matterData });
      toast.success("New matter has been created successfully.");

      // Reset form
      setMatterData({
        name: "",
        client: "",
        status: "open",
        description: "",
        created_at: new Date().toISOString(),
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

  const formSteps = [
    {
      title: "Basic Information",
      component: (
        <BasicInformationStep
          data={{
            name: matterData.name,
            case_number: matterData.case_number,
            status: matterData.status,
            description: matterData.description,
          }}
          onChange={handleChange}
        />
      ),
    },
    {
      title: "Client Information",
      component: (
        <ClientInformationStep
          data={{
            client: matterData.client,
            client_phone: matterData.client_phone,
            client_email: matterData.client_email,
            client_address: matterData.client_address,
          }}
          onChange={handleChange}
        />
      ),
    },
    {
      title: "Assignment",
      component: (
        <AssignmentStep
          data={{
            assigned_attorney: matterData.assigned_attorney,
            assigned_staff: matterData.assigned_staff,
          }}
          onChange={handleChange}
        />
      ),
    },
    {
      title: "Opposing Council",
      component: (
        <OpposingCouncilStep
          data={matterData.opposing_council}
          onChange={(field, value) =>
            handleNestedChange("opposing_council", field, value)
          }
        />
      ),
    },
    {
      title: "Court Information",
      component: (
        <CourtInformationStep
          data={matterData.court}
          onChange={(field, value) => handleNestedChange("court", field, value)}
        />
      ),
    },
  ];

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
          <div className="min-h-[300px]">
            {formSteps[currentStep].component}
          </div>

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
