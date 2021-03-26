// Tabela Tso_2_0

const tableName = 'tso_2_0';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('id_context', 40).notNullable().references('id').inTable('context');
        table.integer('id_contribution').unsigned().references('id').inTable('contribution');
        table.primary(['id_event', 'id_context']);
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
