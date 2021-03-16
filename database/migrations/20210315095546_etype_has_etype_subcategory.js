// Tabela Etype_has_etype_subcategory

exports.up = function (knex) {
    return knex.schema.createTable('etype_has_etype_subcategory', function (table) {
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('subcategory', 10).notNullable();
        table.string('category', 10).notNullable();
        table.foreign(['subcategory', 'category']).references(['subcategory', 'category']).on('etype_subcategory');
        table.primary(['id_event', 'subcategory', 'category']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_has_etype_subcategory');
};
