// Tabela de Usuários

const tableName = 'user';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('name', 50).notNullable();
        table.string('surname', 50).notNullable();
        table.string('email', 100).notNullable().unique();
        table.string('password', 256).notNullable();
        table.integer('added_by').unsigned().references('id').inTable('user');
        table.integer('id_institution').unsigned().references('id').inTable('institution');
        table.string('type', 1).notNullable();
        table.boolean('is_active').notNullable().defaultTo(true);
        table.timestamps(false, true);
    })
    .alterTable('institution', function (table) {
        table.integer('added_by').unsigned().notNullable().references('id').inTable(tableName);
    });

    await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON "${tableName}"
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
};

/**
 * Tipos de usuário:
 * A - Administrator
 * T - Technician
 * R - registered (Anonymous);
 * M - Moderator (registered);
 *
 **/
