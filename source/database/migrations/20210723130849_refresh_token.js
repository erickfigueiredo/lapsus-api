//Tabela de Token

const tableName = 'refresh_token'

exports.up = async function(knex) {
    await knex.schema.createTable(tableName, function(table) {
        table.increments('id').primary().notNullable();
        table.string('hash', 255).notNullable();
        table.integer('id_user').unsigned().notNullable().references('id').inTable('user');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(tableName);
};
