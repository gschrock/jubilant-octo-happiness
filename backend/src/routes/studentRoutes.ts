import { Router } from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
} from "../controllers/studentController";
import {
  validateStudentData,
  validateStudentId,
} from "middleware/studentValidation";

const router = Router();

router.get("/", getStudents);
router.post("/", validateStudentData, createStudent);
router.put("/:id", validateStudentId, validateStudentData, updateStudent);

export default router;
