exports.up = function (knex) {
    return knex.schema.createTable('event_cause', function (table) {
        table.string('cause', 10).primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('event_cause')
};
