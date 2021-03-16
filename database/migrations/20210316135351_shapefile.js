// Tabela Shapefile

exports.up = function (knex) {
    return knex.schema.createTable('shapefile', function (table) {
        table.increments('id').notNullable().primary();
        table.string('uri', 50);
        table.string('desc', 100);
        table.integer('id_user').unsigned().notNullable().references('id').inTable('user');
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('shapefile');
};
