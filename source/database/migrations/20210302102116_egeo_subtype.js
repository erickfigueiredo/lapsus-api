// Tabela Egeo_subtype

const tableName = 'egeo_subtype';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('subtype', 10).notNullable();
        table.string('type', 10).notNullable().references('type').inTable('egeo_type');
        table.string('desc', 100).notNullable();
        table.timestamps(false, true);
        table.primary(['subtype', 'type']);
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
