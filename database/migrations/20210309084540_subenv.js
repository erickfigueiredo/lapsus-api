// Tabela Etype_subenv

exports.up = function (knex) {
    return knex.schema.createTable('subenv', function (table) {
        table.string('subenv', 10).primary().notNullable();
        table.string('desc', 100).notNullable();
        table.string('env', 10).references('env').inTable('etype_env');
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('subenv');
};
