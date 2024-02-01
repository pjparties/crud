/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("products", (tbl) => {
    tbl.increments("id");
    tbl.string("product_name", 255).notNullable().unique();
    tbl.string("description", 255);
    tbl.decimal("price", 8, 2);
    tbl.integer("quantity");
    tbl.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("products");
}
