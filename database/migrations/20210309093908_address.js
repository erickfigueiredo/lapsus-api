// Tabela Address

exports.up = function (knex) {
    return knex.schema.createTable('address', function (table) {
        table.increments('id').notNullable().primary();
        table.string('address', 256).notNullable();
        table.integer('loc_id').unsigned().references('loc_id').inTable('position');
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('address');
};
