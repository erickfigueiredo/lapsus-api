// Tabela Position

exports.up = function (knex) {
    return knex.schema.createTable('position', function (table) {
        table.increments('loc_id').notNullable().primary();
        table.string('name', 80);
        table.specificType('coord', 'Geometry');
        table.integer('id_egeo').unsigned().notNullable().references('id').inTable('egeo');
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('position');
};
