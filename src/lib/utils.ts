import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | string, locale: string = "en-US") => {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function parseSupabaseDate(dateString: string | null): Date | null {
  if (!dateString) {
    return null;
  }
  return new Date(dateString);
}


