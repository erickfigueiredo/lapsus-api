// Tabela Tso_2_0

exports.up = function (knex) {
    return knex.schema.createTable('tso_2_0', function (table) {
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('id_context', 40).notNullable().references('id').inTable('context');
        table.integer('id_contribution').unsigned().references('id').inTable('contribution');
        table.primary(['id_event', 'id_context']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('tso_2_0');
};