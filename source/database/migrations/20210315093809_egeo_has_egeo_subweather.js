// Tabela Egeo_has_egeo_subweather

const tableName = 'egeo_has_egeo_subweather';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.integer('id_egeo').unsigned().notNullable().references('id').inTable('egeo');
        table.string('subweather', 10).notNullable();
        table.string('weather', 10).notNullable();
        table.foreign(['subweather', 'weather']).references(['subweather', 'weather']).on('egeo_subweather');
        table.primary(['id_egeo', 'subweather', 'weather']);
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