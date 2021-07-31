// Tabela Reference

const tableName = 'reference';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id_org', 40).primary().notNullable();
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('id_other_event', 40).notNullable();
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
