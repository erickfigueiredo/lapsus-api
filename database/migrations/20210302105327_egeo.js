exports.up = function(knex) {
    return knex.schema.createTable('egeo', function(table) {
        table.increment('id').primary().notNullable();
        table.string('freetext', 500);
        table.string('event_id', 40).notNullable().references('id').inTable('event');
        table.string('status', 10).references('status').inTable('egeo_status');
        
        table.timestamp(false, true);        
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('egeo');
};
