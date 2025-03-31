import knexConfig from "../db/knexfile";
import knex from "knex";
import { IStudentFormData } from "../types/student";
import { faker } from "@faker-js/faker";

const db = knex(knexConfig.development);

const getAllStudents = async () => {
  return await db("students").select("*");
};

const createStudent = async (studentData: IStudentFormData) => {
  const existingStudent = await db("students")
    .where({ email: studentData.email })
    .first();

  if (existingStudent) {
    throw new Error("Email already exists");
  }

  /**
   * @note
   * faking lat and long here, should definitely be based on city/state
   */
  const insertData = {
    ...studentData,
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    created_at: new Date(),
  };

  const [insertId] = await db("students").insert(insertData);

  const student = await db("students").where({ id: insertId }).first();

  if (!student) {
    throw new Error("Failed to retrieve created student");
  }

  return student;
};

const updateStudent = async (
  id: number,
  studentData: Partial<IStudentFormData>
) => {
  const existingStudentWithEmail = await db("students")
    .where({ email: studentData.email })
    .first();

  if (existingStudentWithEmail) {
    throw new Error("Email already in use");
  }

  const updateData = {
    ...studentData,
    /**
     * @note
     * if city/state changed here technically we would want to update
     * lat/long as well
     */
    updated_at: new Date(),
  };

  const updateCount = await db("students").where({ id }).update(updateData);

  if (updateCount === 0) {
    return null;
  }

  const student = await db("students").where({ id }).first();

  return student;
};

export { getAllStudents, createStudent, updateStudent };
