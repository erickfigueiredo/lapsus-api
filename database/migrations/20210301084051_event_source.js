// Tabela Event_source

exports.up = function(knex) {
    return knex.schema.createTable('event_source', function(table) {
        table.string('source', 10).notNullable().primary();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('event_source');
};
