// Tabela Etype

const tableName = 'etype';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id_event', 40).notNullable().references('id').inTable('event').primary();
        table.string('subenv', 10).notNullable();
        table.string('env', 10).notNullable();
        table.foreign(['subenv', 'env']).references(['subenv', 'env']).inTable('subenv');
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