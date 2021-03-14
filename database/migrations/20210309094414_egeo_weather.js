
exports.up = function(knex) {
    return knex.schema.createTable('egeo_weather', function(table) {
        table.string('weather', 10).notNullable().primary();
        table.string('desc', 100);
        table.timestamp(false, true);
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('egeo_weather');
};
