// Tabela Reference_other_event_id

const tableName = 'reference_other_event_id';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id_reference_org', 40).notNullable().references('id_org').inTable('reference');
        table.string('id_other_event', 40).notNullable();
        table.primary(['id_reference_org', 'id_other_event']);
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