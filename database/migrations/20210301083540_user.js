exports.up = function(knex) {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS postgis').createTable('user', function(table) {
        table.increments('id').notNullable().primary();
        table.string('name', 20);
        table.string('surname', 20);
        table.string('type', 1);
        table.integer('id_instituition');
        table.string('email', 100).unique();
        table.string('password', 100);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
