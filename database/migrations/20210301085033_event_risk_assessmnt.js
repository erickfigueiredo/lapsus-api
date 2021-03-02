exports.up = function(knex) {
    return knex.schema.createTable('event_risk_assessmnt', function (table) {
        table.string('risk_assessmnt', 10).primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('event_risk_assessmnt')
};
