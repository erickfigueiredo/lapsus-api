// Tabela Etype_actor

const tableName = 'etype_actor';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('actor', 10).notNullable().primary();
        table.string('desc', 100);
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
