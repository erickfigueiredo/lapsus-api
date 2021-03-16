// Tabela Egeo_has_egeo_subweather

exports.up = function (knex) {
    return knex.schema.createTable('egeo_has_egeo_subweather', function (table) {
        table.integer('id_egeo').unsigned().notNullable().references('id').inTable('egeo');
        table.string('subweather', 10).notNullable();
        table.string('weather', 10).notNullable();
        table.foreign(['subweather', 'weather']).references(['subweather', 'weather']).on('egeo_subweather');
        table.primary(['id_egeo', 'subweather', 'weather']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('egeo_has_egeo_subweather');
};
