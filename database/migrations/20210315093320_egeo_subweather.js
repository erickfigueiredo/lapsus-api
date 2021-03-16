// Tabela Egeo_subweather

exports.up = function (knex) {
    return knex.schema.createTable('egeo_subweather', function (table) {
        table.string('subweather', 10).notNullable();
        table.string('weather', 10).references('weather').inTable('egeo_weather');
        table.string('desc', 100);
        table.primary(['subweather', 'weather']);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('egeo_subweather');
};
