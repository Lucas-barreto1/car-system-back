/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('users', function (table) {
    table.uuid('id').primary();
    table.string('email').notNullable().unique();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.timestamp('create_date').defaultTo(knex.fn.now());
    table.timestamp('updated_date').defaultTo(knex.fn.now());
    table.specificType('roles', 'text[]').defaultTo('{}');
  });

  await knex('users').insert([
    {
      id: 'bd66b9f9-38bb-4a59-9dd7-9c9a896a2122',
      name: 'Admin',
      email: 'admin@admin.com',
      password: '$2a$12$LT3iLPLlOltV2Sq5GwgLIO344d4yYCerHUh.DXPfxL5GHd4EkgbjO',
      roles: ['ADMIN'],
    },
    {
      id: 'e2a16d1d-97b5-4c2f-94f6-401a5192babc',
      name: 'User',
      email: 'user@user.com',
      password: '$2a$12$4xhGjIBHRaMiGoyR5Ho6xOcWf5ZF.FTsn7k70VUTMbw1oV3BrCiAu',
      roles: ['DEFAULT_USER'],
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
