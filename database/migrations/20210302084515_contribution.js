// Tabela Contribution

exports.up = function(knex) {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS postgis').createTable('contribution', function(table) {
        table.increments('id').primary().notNullable();
        table.datetime('occurrence', {precision: 6});
        table.integer('risk_damage').unsigned();
        table.integer('victims').unsigned();
        table.string('desc', 500);
        table.integer('published').unsigned();
        table.specificType('local', 'Geometry');
        table.integer('category').unsigned().notNullable().references('id').inTable('category');
        table.integer('user').unsigned().notNullable().references('id').inTable('user');
        table.integer('colaborator').unsigned().notNullable().references('id').inTable('user');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('contribution');
};
