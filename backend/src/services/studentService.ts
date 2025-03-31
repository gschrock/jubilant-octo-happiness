import {
  getAllStudents as getAllStudentsRepo,
  createStudent as createStudentRepo,
  updateStudent as updateStudentRepo,
} from "../repositories/studentRepository";
import { IStudent, IStudentFormData } from "../types/student";

export const getAllStudents = async (): Promise<IStudent[]> => {
  return await getAllStudentsRepo();
};

export const addStudent = async (
  studentData: IStudentFormData
): Promise<IStudent> => {
  return await createStudentRepo(studentData);
};

export const modifyStudent = async (
  id: number,
  studentData: Partial<IStudentFormData>
): Promise<IStudent | null> => {
  return await updateStudentRepo(id, studentData);
};
