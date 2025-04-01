export const formatDateForInput = (
  dateValue: string | Date | null | undefined
): string => {
  if (!dateValue) return "";

  let date: Date;
  if (typeof dateValue === "string") {
    date = new Date(dateValue);
  } else if (dateValue instanceof Date) {
    date = dateValue;
  } else {
    return "";
  }

  // Check if date is valid
  if (isNaN(date.getTime())) return "";

  // Format as YYYY-MM-DD for input[type="date"]
  return date.toISOString().split("T")[0];
};
