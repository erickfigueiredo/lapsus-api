exports.up = function (knex) {
    return knex.schema.createTable('event_status', function (table) {
        table.string('status',10).primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('event_status');
};
