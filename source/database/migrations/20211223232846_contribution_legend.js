// Tabela de Legenda para os Mapas de Contribuição

const tableName = 'contribution_legend';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').notNullable().primary();
        table.string('title', 50).notNullable();
        table.string('uri', 200).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
};
