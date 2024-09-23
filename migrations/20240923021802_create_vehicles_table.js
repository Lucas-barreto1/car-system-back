/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('vehicles', function (table) {
    table.uuid('id').primary(); // UUID para a chave primária
    table.string('model').notNullable(); // Modelo do veículo
    table.string('make').notNullable(); // Marca do veículo
    table.integer('year').notNullable(); // Ano do veículo
    table.string('color').notNullable(); // Cor do veículo
    table.decimal('price').notNullable(); // Preço do veículo
    table.timestamp('created_date').defaultTo(knex.fn.now()); // Data de criação
    table.timestamp('updated_date').defaultTo(knex.fn.now()); // Data de atualização
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
