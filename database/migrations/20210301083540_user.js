// Tabela de Usuários

exports.up = function (knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments('id').primary().notNullable();
        table.string('name', 50).notNullable();
        table.string('surname', 50).notNullable();
        table.string('email', 100).notNullable().unique();
        table.string('password', 100).notNullable();
        table.date('birthdate').notNullable();
        table.integer('added_by').unsigned().references('id').inTable('user');
        table.integer('id_institution').unsigned().references('id').inTable('institution');
        table.string('type', 1).notNullable();
        table.timestamps(false, true);
    }).alterTable('institution', function(table) {
        table.integer('id_adm').unsigned().notNullable().references('id').inTable('user');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};

/**
 * Tipos de usuário:
 * A - Administrator
 * T - Technician
 * R - registered (Anonymous);
 * M - Moderator
 *
 **/
