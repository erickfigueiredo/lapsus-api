// Tabela Etype_category

const tableName = 'etype_category';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('category', 10).primary().notNullable();
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
