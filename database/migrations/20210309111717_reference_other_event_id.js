// Tabela Reference_other_event_id

exports.up = function (knex) {
    return knex.schema.createTable('reference_other_event_id', function (table) {
        table.string('reference_org_id', 40).notNullable().references('org_id').inTable('references');
        table.string('other_event_id', 40).notNullable();
        table.primary(['reference_org_id', 'other_event_id']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('reference_other_event_id');
};
