// Tabela Event_scale

exports.up = function (knex) {
    return knex.schema.createTable('event_scale', function (table) {
        table.integer('scale').unsigned().primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('event_scale');
};
