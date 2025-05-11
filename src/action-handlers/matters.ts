import { toast } from "sonner";
import type { Matter, MatterStatus } from "@/types/matter.type";
import {
  createMatter,
  updateMatter,
  deleteMatter,
  getMatters,
  getMatterById,
} from "@/actions/matters";

interface CreateMatterInput {
  name: string;
  client: string;
  case_number: string;
  status: MatterStatus;
}

export const handleCreateMatter = async (
  matterData: CreateMatterInput
): Promise<{ matter?: Matter; error: string | null }> => {
  if (!matterData.name.trim()) {
    toast.error("Matter name is required");
    return { error: "Matter name is required" };
  }
  if (!matterData.case_number.trim()) {
    toast.error("Case Number is required");
    return { error: "Case Number is required" };
  }

  try {
    const newMatter = await createMatter({
      name: matterData.name,
      client: matterData.client || "To be determined",
      case_number: matterData.case_number,
      status: matterData.status,
      description: "",
      created_at: new Date(),
      date_opened: new Date(),
    });
    toast.success("New matter has been created successfully.");
    return { matter: newMatter, error: null };
  } catch (error: any) {
    console.error("Error in handleCreateMatter:", error);
    toast.error("Failed to create matter. Please try again.");
    return { error: "Failed to create matter." };
  }
};

export const handleUpdateMatter = async (
  matter: Matter
): Promise<{ matter?: Matter; error: string | null }> => {
  try {
    const updatedMatter = await updateMatter(matter);
    toast.success("Matter updated successfully.");
    return { matter: updatedMatter, error: null };
  } catch (error: any) {
    console.error("Error in handleUpdateMatter:", error);
    toast.error("Failed to update matter. Please try again.");
    return { error: "Failed to update matter." };
  }
};

export const handleSaveMatter = async (
  editedMatter: Matter
): Promise<{ matter?: Matter; error: string | null }> => {
  try {
    const updatedMatter = await updateMatter(editedMatter);
    toast.success("Case details have been updated successfully.");
    return { matter: updatedMatter, error: null };
  } catch (error: any) {
    console.error("Error in handleSaveMatter:", error);
    toast.error("Failed to update case details. Please try again.");
    return { error: "Failed to update case details." };
  }
};

export const handleCancelMatter = (
  originalMatter: Matter
): { matter: Matter } => {
  return { matter: { ...originalMatter } };
};

export const handleDeleteMatter = async (
  matterId: string
): Promise<{ error: string | null }> => {
  try {
    await deleteMatter(matterId);
    toast.success("Matter deleted successfully.");
    return { error: null };
  } catch (error: any) {
    console.error("Error in handleDeleteMatter:", error);
    toast.error("Failed to delete matter. Please try again.");
    return { error: "Failed to delete matter." };
  }
};

export const handleFetchMatters = async (): Promise<{
  matters: Matter[];
  error: string | null;
}> => {
  try {
    const matters = await getMatters();
    return { matters, error: null };
  } catch (error: any) {
    console.error("Error in handleFetchMatters:", error);
    toast.error("Failed to fetch matters. Please try again.");
    return { matters: [], error: "Failed to fetch matters." };
  }
};

export const handleFetchMatterById = async (
  matterId: string
): Promise<{ matter?: Matter; error: string | null }> => {
  try {
    const matter = await getMatterById(matterId);
    
    if (!matter) throw new Error("Matter not found");
    
    return { matter, error: null };
  } catch (error: any) {
    console.error("Error in handleFetchMatterById:", error);
    return { error: "Failed to fetch matter." };
  }
};