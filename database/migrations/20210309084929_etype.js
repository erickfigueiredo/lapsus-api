
exports.up = function(knex) {
    return knex.schema.createTable('etype', function (table) {
        table.string('event_id', 40).notNullable().references('id').inTable('event').primary();
        table.string('subtype', 10).notNullable();
        table.string('type', 10).notNullable();
        table.timestamp(false, true);
        table.foreign(['subtype', 'type']).references(['subtype', 'type']).on('egeo_subtype');
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('etype');
};
