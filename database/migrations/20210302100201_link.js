// Tabela Link

const tableName = 'link';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id', 40).primary().notNullable();
        table.string('id_context', 40).notNullable().references('id').inTable('context');
        table.string('role', 10).references('role').inTable('link_role');
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
