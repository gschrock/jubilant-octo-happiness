import { Router } from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
} from "../controllers/studentController";

const router = Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);

export default router;
