import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Same validation schema as frontend
const studentSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email format").min(1, "Required"),
  phone: z
    .string()
    .regex(
      /^[\d\s().-]+(\s*(x|ext)\s*\d{1,5})?$/,
      "Phone must contain only numbers and valid phone characters"
    )
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

// Validation middleware
const validateStudentData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = studentSchema.parse(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors,
      });
    }
    next(error);
  }
};

// Student ID middleware
const validateStudentId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Student ID is required",
    });
  }
  next();
};

export { validateStudentData, validateStudentId };
