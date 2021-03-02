exports.up = function (knex) {
    return knex.schema.createTable('context_level', function (table) {
        table.string('level', 10).primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('context_level');
};
