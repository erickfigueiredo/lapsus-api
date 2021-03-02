exports.up = function (knex) {
    return knex.schema.createTable('context_mode', function (table) {
        table.string('mode', 10).primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('context_mode');
};
