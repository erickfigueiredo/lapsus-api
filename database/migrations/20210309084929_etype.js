// Tabela Etype

exports.up = function(knex) {
    return knex.schema.createTable('etype', function (table) {
        table.string('id_event', 40).notNullable().references('id').inTable('event').primary();
        table.string('subenv', 10).notNullable();
        table.string('env', 10).notNullable();
        table.foreign(['subenv', 'env']).references(['subenv', 'env']).inTable('subenv');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('etype');
};
