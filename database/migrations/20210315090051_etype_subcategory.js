// Tabela Etype_subcategory

exports.up = function (knex) {
    return knex.schema.createTable('etype_subcategory', function (table) {
        table.string('subcategory', 10).notNullable();
        table.string('category', 10).notNullable().references('category').inTable('etype_category');
        table.string('desc', 100);
        table.primary(['subcategory', 'category']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_subcategory');
};
