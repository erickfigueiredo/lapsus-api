// Tabela Link_role

exports.up = function (knex) {
    return knex.schema.createTable('link_role', function (table) {
        table.string('role', 10).primary().notNullable();
        table.string('desc', 100);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('link_role')
};