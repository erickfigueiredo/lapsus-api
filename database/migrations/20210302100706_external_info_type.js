// Tabela External_info_type

exports.up = function (knex) {
    return knex.schema.createTable('external_info_type', function (table) {
        table.string('type', 10).primary().notNullable;
        table.string('desc', 500);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('external_info_type')
};

