import { z } from "zod";

const studentFormSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email format").min(1, "Required"),
  phone: z
    .string()
    .regex(
      /^[\d\s().-]+(\s*(x|ext)\s*\d{1,5})?$/,
      "Phone must contain only numbers and valid phone characters"
    )
    /**
     * @note
     * Yes, would be good to align on those formats and validate for them.
     * Keeping loose for now.
     */
    .min(10, "Phone must be in a valid format")
    .min(1, "Phone is required"),
  graduation_year: z
    .number()
    .int("Must be a whole number")
    .min(new Date().getFullYear(), "Year cannot be in the past"),
  gpa: z
    .number()
    .min(0, "GPA cannot be negative")
    .max(4.0, "GPA cannot exceed 4.0"),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
});

export { studentFormSchema };
