exports.up = function (knex) {
    return knex.schema.createTable('reference', function (table) {
        table.string('org_id', 40).primary().notNullable();
        table.string('event_id', 40).notNullable().references('id').inTable('event');
        table.string('other_event_id', 40).notNullable();
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('reference')
};

