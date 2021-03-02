exports.up = function(knex) {
    return knex.schema.createTable('event', function (table) {
        table.increment('id').primary().notNullable();
        table.string('name', 40);
        table.string('main_event_id', 40);
        table.integer('certainty');
        table.datetime('decl_datime', {precision: 6});
        table.datetime('occ_datime', {precision: 6});
        table.datetime('obs_datime', {precision: 6});
        table.string('freetext', 500);
        table.string('source', 10).references('source').inTable('event_source').onDelete('CASCADE');
        table.integer('scale').references('scale').inTable('event_scale').onDelete('CASCADE');
        table.string('status').references('status').inTable('event_status').onDelete('CASCADE');
        table.string('risk_assessmnt').references('risk_assessmnt').inTable('event_risk_assessmnt').onDelete('CASCADE');
        table.string('cause').references('cause').inTable('event_cause').onDelete('CASCADE');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('event');
};
