// Tabela Annex

exports.up = function (knex) {
    return knex.schema.createTable('annex', function (table) {
        table.increments('id').notNullable().primary();
        table.string('uri', 200);
        table.integer('id_contribution').unsigned().notNullable().references('id').inTable('contribution');
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('annex');
};
