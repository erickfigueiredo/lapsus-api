
exports.up = function(knex) {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS postgis').createTable('position', function(table) {
        table.increment('id').notNullable().primary();
        table.string('name', 80);
        table.specificType('coord', 'Geometry');
        table.integer('egeo_id').notNullable().reference('id').onTable('egeo');
        table.timestamp(false, true);
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('position');
};
