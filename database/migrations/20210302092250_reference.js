// Tabela Reference

exports.up = function (knex) {
    return knex.schema.createTable('references', function (table) {
        table.string('id_org', 40).primary().notNullable();
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('other_event_id', 40).notNullable();
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('references');
};

