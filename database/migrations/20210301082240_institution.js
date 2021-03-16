// Tabela de Instituição

exports.up = function (knex) {
    return knex.schema.createTable('institution', function (table) {
        table.increments('id').primary().notNullable();
        table.string('name', 50).notNullable();
        table.string('email', 100).notNullable().unique();
        table.string('phone', 11).notNullable().unique();
        table.string('address', 256).notNullable();
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('institution');
};
