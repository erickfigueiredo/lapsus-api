// Tabela Etype_loctype

exports.up = function (knex) {
    return knex.schema.createTable('etype_loctype', function (table) {
        table.string('loctype', 10).notNullable().primary();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_loctype');
};
