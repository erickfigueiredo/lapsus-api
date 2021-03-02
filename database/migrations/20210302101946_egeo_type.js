exports.up = function (knex) {
    return knex.schema.createTable('egeo_type', function (table) {
        table.string('type', 10).primary().notNullable();
        table.string('desc', 100);
        table.timestamp(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('egeo_type');
};
