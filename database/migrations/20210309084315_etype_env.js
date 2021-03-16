// Tabela Etype_env

exports.up = function (knex) {
    return knex.schema.createTable('etype_env', function (table) {
        table.string('env', 10).primary().notNullable();
        table.string('desc', 100);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('etype_env');
};
