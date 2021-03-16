// Tabela Egeo_subtype

exports.up = function (knex) {
    return knex.schema.createTable('egeo_subtype', function (table) {
        table.string('subtype', 10).notNullable();
        table.string('type', 10).notNullable().references('type').inTable('egeo_type');
        table.string('desc', 100).notNullable();
        table.timestamps(false, true);
        table.primary(['type', 'subtype']);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('egeo_subtype');
};
