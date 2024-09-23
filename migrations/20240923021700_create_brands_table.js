/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('brands', function (table) {
    table.uuid('id').primary(); // UUID para a chave primária
    table.string('name').notNullable(); // Nome da marca
    table.timestamp('created_date').defaultTo(knex.fn.now()); // Data de criação
    table.timestamp('updated_date').defaultTo(knex.fn.now()); // Data de atualização
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('brands');
};
