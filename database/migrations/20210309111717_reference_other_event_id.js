// Tabela Reference_other_event_id

const tableName = 'reference_other_event_id';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('reference_org_id', 40).notNullable().references('id_org').inTable('reference');
        table.string('other_event_id', 40).notNullable();
        table.primary(['reference_org_id', 'other_event_id']);
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