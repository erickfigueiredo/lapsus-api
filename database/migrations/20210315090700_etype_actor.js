// Tabela Etype_actor

exports.up = function (knex) {
    return knex.schema.createTable('etype_actor', function (table) {
        table.string('actor', 10).notNullable().primary();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_actor');
};
