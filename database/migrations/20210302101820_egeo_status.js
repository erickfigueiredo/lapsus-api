exports.up = function (knex) {
    return knex.schema.createTable('egeo_status', function (table) {
        table.string('status', 10).primary().notNullable();
        table.string('desc', 100);
        table.timestamp(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('egeo_status');
};
