import { faker } from "@faker-js/faker";
import type { Knex } from "knex";

// Random GPA generator
const generateGPA = (): number => {
  return parseFloat((Math.random() * 4).toFixed(2));
};

// Random grad year generator (current year + 0-4 years)
const generateGraduationYear = (): number => {
  const currentYear = new Date().getFullYear();
  return currentYear + Math.floor(Math.random() * 5);
};

/**
 * Creates 10 randomized student entries for aiding in local development.
 */
export async function seed(knex: Knex): Promise<void> {
  await knex("students").del();

  const students = [];

  for (let i = 0; i < 10; i++) {
    const state = faker.location.state({ abbreviated: true });

    students.push({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      graduation_year: generateGraduationYear(),
      phone: faker.phone.number(),
      gpa: generateGPA(),
      city: faker.location.city(),
      state: state,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    });
  }

  await knex("students").insert(students);
}
