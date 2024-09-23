/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary(); // UUID para a chave primária
    table.string('email').notNullable().unique(); // E-mail
    table.string('name').notNullable(); // Nome de usuário
    table.string('password').notNullable(); // Senha
    table.timestamp('create_date').defaultTo(knex.fn.now()); // Data de criação
    table.timestamp('updated_date').defaultTo(knex.fn.now()); // Data de atualização
    table.timestamp('last_login'); // Último login
    table.string('hash_refresh_token'); // Hash do token de refresh
    table.specificType('roles', 'text[]').defaultTo('{}'); // Lista de funções (roles)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
