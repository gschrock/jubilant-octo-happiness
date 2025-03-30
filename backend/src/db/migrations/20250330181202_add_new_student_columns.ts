import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("students", (table) => {
    table.string("email").notNullable().unique();
    table.integer("graduation_year").notNullable();
    table.string("phone").notNullable();
    table.decimal("gpa", 3, 2).notNullable(); // Stores GPA with 3 digits total, 2 decimal places
    table.string("city");
    table.string("state", 2); // 2-character state code
    table.decimal("latitude", 4, 2); // Geographic precision for city-level coordinates
    table.decimal("longitude", 5, 2);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("students", (table) => {
    table.dropColumn("email");
    table.dropColumn("graduation_year");
    table.dropColumn("phone");
    table.dropColumn("gpa");
    table.dropColumn("city");
    table.dropColumn("state");
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });
}
