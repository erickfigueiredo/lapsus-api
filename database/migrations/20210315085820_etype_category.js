// Tabela Etype_category

exports.up = function (knex) {
    return knex.schema.createTable('etype_category', function (table) {
        table.string('category', 10).primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_category');
};
