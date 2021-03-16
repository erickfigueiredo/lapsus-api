// Tabela External_info

exports.up = function (knex) {
    return knex.schema.createTable('external_info', function (table) {
        table.increments('id').primary().notNullable();
        table.string('id_context', 40).notNullable().references('id').inTable('context');
        table.string('type', 10).references('type').inTable('external_info_type');
        table.string('uri', 200).notNullable();
        table.string('freetext', 500);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('external_info');
};
