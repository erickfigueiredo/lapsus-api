exports.up = function(knex) {
    return knex.schema.createTable('tso_2_0', function (table) {
        table.string('event_id', 40).notNullable().references('id').inTable('event');
        table.string('context_id', 40).notNullable().references('id').inTable('context');
        table.timestamps(false, true);
        // Falta contribuição
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('tso_2_0')
};
