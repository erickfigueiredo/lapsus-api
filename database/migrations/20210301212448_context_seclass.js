exports.up = function(knex) {
    return knex.schema.createTable('context_seclass', function(table) {
        table.string('seclass', 10).primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('context_seclass');
};
