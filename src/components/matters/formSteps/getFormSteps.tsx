import { BasicInformationStep } from "@/components/matters//formSteps/basicInformationStep";
import { ClientInformationStep } from "@/components/matters//formSteps/clientInformationStep";
import { AssignmentStep } from "@/components/matters//formSteps/assignmentStep";
import { OpposingCouncilStep } from "@/components/matters//formSteps/opposingCouncilStep";
import { CourtInformationStep } from "@/components/matters/formSteps/courtInformationStep";

export interface FormStep {
  title: string;
  component: React.ReactNode;
}

export function GetFormSteps(
  matterData: {
    name: string;
    case_number: string;
    status: string;
    description: string;
    client: string;
    client_phone: string;
    client_email: string;
    client_address: string;
    assigned_attorney: string;
    assigned_staff: string;
    opposing_council: {
      name: string;
      phone: string;
      email: string;
      address: string;
    };
    court: {
      name: string;
      phone: string;
      email: string;
    };
  },
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
}
