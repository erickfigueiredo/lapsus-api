// Tabela Category

exports.up = function(knex) {
    return knex.schema.createTable('category', function(table) {
        table.increments('id').notNullable().primary();
        table.string('name', 40).notNullable();
        table.string('desc', 500);
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    knex.schema.drop_table('category');
};
