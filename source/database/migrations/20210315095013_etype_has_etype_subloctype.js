// Tabela Etype_has_etype_subloctype

const tableName = 'etype_has_etype_subloctype';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('subloctype', 10).notNullable();
        table.string('loctype', 10).notNullable();
        table.timestamps(false, true);
        table.foreign(['subloctype', 'loctype']).references(['subloctype', 'loctype']).on('etype_subloctype');
        table.primary(['id_event', 'subloctype', 'loctype']);
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
