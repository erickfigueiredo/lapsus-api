// Tabela Casualties_context

exports.up = function (knex) {
    return knex.schema.createTable('casualties_context', function (table) {
        table.string('context', 15).primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('casualties_context');
};
