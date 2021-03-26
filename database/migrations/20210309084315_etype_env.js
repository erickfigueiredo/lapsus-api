// Tabela Etype_env

const tableName = 'etype_env';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('env', 10).primary().notNullable();
        table.string('desc', 100);
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
