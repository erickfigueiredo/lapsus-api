// Tabela Etype_subloctype

const tableName = 'etype_subloctype';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('subloctype', 10).notNullable();
        table.string('loctype', 10).notNullable().references('loctype').inTable('etype_loctype');
        table.string('desc', 100);
        table.primary(['subloctype', 'loctype']);
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
