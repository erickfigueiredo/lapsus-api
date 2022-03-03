// Tabela de Tokens para Redefinição de Senha

const tableName = 'reset_token';

exports.up = async function(knex) {
    await knex.schema.createTable(tableName, function(table) {
        table.string('token', 256).notNullable().primary();
        table.bool('accessed').defaultTo(false).notNullable();
        table.integer('id_user').references('id').inTable('user');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(tableName);
};
