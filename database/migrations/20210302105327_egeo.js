// Tabela Egeo

exports.up = function (knex) {
    return knex.schema.createTable('egeo', function (table) {
        table.increments('id').primary().notNullable();
        table.string('freetext', 500);
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('status', 10).references('status').inTable('egeo_status');
        table.string('subtype', 10).notNullable();
        table.string('type', 10).notNullable();
        table.foreign(['subtype', 'type']).references(['subtype', 'type']).on('egeo_subtype');
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('egeo');
};
