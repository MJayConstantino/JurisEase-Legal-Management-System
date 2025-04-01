import { BasicInformationStep } from "@/components/matters//formSteps/basicInformationStep";
import { ClientInformationStep } from "@/components/matters//formSteps/clientInformationStep";
import { AssignmentStep } from "@/components/matters//formSteps/assignmentStep";
import { OpposingCouncilStep } from "@/components/matters//formSteps/opposingCouncilStep";
import { CourtInformationStep } from "@/components/matters/formSteps/courtInformationStep";
import { Matter } from "@/types/matter.type";

export interface FormStep {
  title: string;
  component: React.ReactNode;
}

export function GetFormSteps(
  matterData: Omit<Matter, "id">,
  handleChange: (field: string, value: string) => void,
  handleNestedChange: (parent: string, field: string, value: string) => void
): FormStep[] {
  return [
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
            client_phone: matterData.client_phone || "N/A",
            client_email: matterData.client_email || "N/A",
            client_address: matterData.client_address || "N/A",
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
            assigned_attorney: matterData.assigned_attorney || "N/A",
            assigned_staff: matterData.assigned_staff || "N/A",
          }}
          onChange={handleChange}
        />
      ),
    },
    {
      title: "Opposing Council",
      component: (
        <OpposingCouncilStep
          data={
            matterData.opposing_council || {
              name: "N/A",
              phone: "N/A",
              email: "N/A",
              address: "N/A",
            }
          }
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
          data={
            matterData.court || {
              name: "N/A",
              phone: "N/A",
              email: "N/A",
            }
          }
          onChange={(field, value) => handleNestedChange("court", field, value)}
        />
      ),
    },
  ];
}
