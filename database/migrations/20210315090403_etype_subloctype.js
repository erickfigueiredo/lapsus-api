// Tabela Etype_subloctype

exports.up = function (knex) {
    return knex.schema.createTable('etype_subloctype', function (table) {
        table.string('subloctype', 10).notNullable();
        table.string('loctype', 10).notNullable().references('loctype').inTable('etype_loctype');
        table.string('desc', 100);
        table.primary(['subloctype', 'loctype']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_subloctype');
};
