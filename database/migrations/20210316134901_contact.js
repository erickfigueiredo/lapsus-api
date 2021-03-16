// Tabela Contact

exports.up = function (knex) {
    return knex.schema.createTable('contact', function (table) {
        table.increments('id').notNullable().primary();
        table.string('sender', 50).notNullable();
        table.string('subject', 50).notNullable();
        table.string('email', 100).notNullable();
        table.string('body', 500).notNullable();
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.increments.drop_table('contact');
};
