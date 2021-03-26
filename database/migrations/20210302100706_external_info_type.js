// Tabela External_info_type

const tableName = 'external_info_type';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('type', 10).primary().notNullable();
        table.string('desc', 500);
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
