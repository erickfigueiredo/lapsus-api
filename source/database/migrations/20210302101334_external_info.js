// Tabela External_info

const tableName = 'external_info';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('id_context', 40).notNullable().references('id').inTable('context');
        table.string('type', 10).references('type').inTable('external_info_type');
        table.string('uri', 80).notNullable();
        table.string('path', 200).notNullable();
        table.string('freetext', 500);
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
