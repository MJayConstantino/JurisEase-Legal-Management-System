export const formatDateForDisplay = (
  dateValue: string | Date | null | undefined
): string => {
  if (!dateValue) return "N/A";

  try {
    const date =
      typeof dateValue === "string" ? new Date(dateValue) : dateValue;

    // Check if date is valid
    if (!(date instanceof Date) || isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString();
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
};
