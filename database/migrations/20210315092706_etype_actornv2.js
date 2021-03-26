// Tabela Etype_actornv2

const tableName = 'etype_actornv2';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('actornv2', 10).notNullable();
        table.string('actor', 10).notNullable().references('actor').inTable('etype_actor');
        table.string('desc', 100);
        table.primary(['actornv2', 'actor']);
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
