
exports.up = function(knex) {
    return knex.schema.createTable('address', function(table) {
        table.increment('id').notNullable().primary();
        table.string('address', 256). notNullable();
        table.integer('loc_id').references('id').onTable('position');
        table.timestamp(false, true);
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('address');
};
