// Tabela Egeo_subweather

const tableName = 'egeo_subweather';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('subweather', 10).notNullable();
        table.string('weather', 10).references('weather').inTable('egeo_weather');
        table.string('desc', 100);
        table.primary(['subweather', 'weather']);
        table.timestamps(false, true);
    });

    await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON ${tableName}
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
};
