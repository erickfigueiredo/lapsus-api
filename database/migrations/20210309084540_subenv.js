// Tabela Etype_subenv

exports.up = function (knex) {
    return knex.schema.createTable('subenv', function (table) {
        table.string('subenv', 10).notNullable();
        table.string('env', 10).notNullable().references('env').inTable('etype_env');
        table.string('desc', 100);
        table.primary(['subenv', 'env']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('subenv');
};
