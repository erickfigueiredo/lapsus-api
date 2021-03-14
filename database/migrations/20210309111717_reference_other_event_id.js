
exports.up = function (knex) {
    return knex.schema.createTable('reference_other_event_id', function (table) {
        table.string('reference_org_id', 40).notNullable();
        table.string('other_event_id', 40).notNullable().references();
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('reference_other_event_id');
};
