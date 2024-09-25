/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('vehicles', function (table) {
    table.uuid('id').primary();
    table.string('model').notNullable();
    table.string('make').notNullable();
    table.integer('year').notNullable();
    table.string('color').notNullable();
    table.decimal('price').notNullable();
    table.timestamp('created_date').defaultTo(knex.fn.now());
    table.timestamp('updated_date').defaultTo(knex.fn.now());
    table
      .uuid('brand_id')
      .references('id')
      .inTable('brands')
      .onDelete('CASCADE'); // Relacionamento com a tabela 'brands'
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('vehicles');
};
