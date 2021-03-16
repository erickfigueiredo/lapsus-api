// Tabela Etype_has_etype_subloctype

exports.up = function (knex) {
    return knex.schema.createTable('etype_has_etype_subloctype', function (table) {
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('subloctype', 10).notNullable();
        table.string('loctype', 10).notNullable();
        table.timestamps(false, true);
        table.foreign(['subloctype', 'loctype']).references(['subloctype', 'loctype']).on('etype_subloctype');
        table.primary(['id_event', 'subloctype', 'loctype']);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_has_etype_subloctype');
};
