// Tabela Etype_loctype

const tableName = 'etype_loctype';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('loctype', 10).notNullable().primary();
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
