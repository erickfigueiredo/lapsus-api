// Tabela Casualties_context

const tableName = 'casualties_context';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('context', 15).primary().notNullable();
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
