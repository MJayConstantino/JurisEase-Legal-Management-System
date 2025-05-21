import { z } from "zod";

const numbersOnlyRegex = /^[0-9]*$/;
const phoneDigitsRegex = /^[0-9]{8,11}$/;

// Zod schema for validation
export const matterSchema = z.object({
  name: z.string().min(1, "Matter name is required"),
  client: z.string().optional(),
  case_number: z.string().min(1, "Case number is required"),
  status: z.enum(["open", "pending", "closed"]),
});

// Case Details Schema
export const caseSchema = z.object({
  name: z
    .string()
    .min(1, "Case title is required")
    .max(100, "Max 100 characters"),
  case_number: z.string().min(1, "Case number is required"),
  status: z.enum(["open", "pending", "closed"]),
  description: z.string().max(200, "Max 200 characters").optional(),
  client: z.string().max(50, "Max 50 characters").optional(),
  client_phone: z
    .string()
    .refine((val) => val === "" || numbersOnlyRegex.test(val), {
      message: "Phone can only contain numbers",
    })
    .refine((val) => val === "" || phoneDigitsRegex.test(val), {
      message: "Phone number must be between 8 and 11 digits",
    })
    .optional()
    .nullable(),
  client_email: z
    .string()
    .refine((val) => val === "" || numbersOnlyRegex.test(val), {
      message: "Phone can only contain numbers",
    })
    .refine((val) => val === "" || phoneDigitsRegex.test(val), {
      message: "Phone number must be between 8 and 11 digits",
    })
    .optional()
    .nullable(),
  client_address: z
    .string()
    .max(200, "Max 200 characters")
    .optional()
    .nullable(),
});

// Opposing Council Schema
export const opposingCouncilSchema = z.object({
  name: z.string().max(50, "Max 50 characters").optional(),
  phone: z
    .string()
    .refine((val) => val === "" || numbersOnlyRegex.test(val), {
      message: "Phone can only contain numbers",
    })
    .refine((val) => val === "" || phoneDigitsRegex.test(val), {
      message: "Phone number must be between 8 and 11 digits",
    })
    .optional(),
  email: z
    .string()
    .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Invalid email format",
    })
    .optional(),
  address: z.string().max(200, "Max 200 characters").optional(),
});

// Court Schema
export const courtSchema = z.object({
  name: z.string().max(50, "Max 50 characters").optional(),
  phone: z
    .string()
    .refine((val) => val === "" || numbersOnlyRegex.test(val), {
      message: "Phone can only contain numbers",
    })
    .refine((val) => val === "" || phoneDigitsRegex.test(val), {
      message: "Phone number must be between 8 and 11 digits",
    })
    .optional(),
  email: z
    .string()
    .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Invalid email format",
    })
    .optional(),
});
