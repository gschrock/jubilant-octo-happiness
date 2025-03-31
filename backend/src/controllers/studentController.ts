import { Request, Response } from "express";
import {
  getAllStudents,
  addStudent,
  modifyStudent,
} from "../services/studentService";
import { IStudentFormData } from "../types/student";

const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData: IStudentFormData = req.body;
    const newStudent = await addStudent(studentData);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    if (error instanceof Error) {
      if (error.message.includes("already exists")) {
        return res.status(409).json({ error: "Email already in use" });
      }
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const studentData: Partial<IStudentFormData> = req.body;
    const updatedStudent = await modifyStudent(id, studentData);

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);

    if (error instanceof Error) {
      if (error.message.includes("already in use")) {
        return res.status(409).json({ error: error.message });
      }
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export { getStudents, createStudent, updateStudent };
