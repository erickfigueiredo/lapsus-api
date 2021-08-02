// Tabela Etype_subenv

const tableName = 'etype_subenv';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('subenv', 10).notNullable();
        table.string('env', 10).notNullable().references('env').inTable('etype_env');
        table.string('desc', 100);
        table.primary(['subenv', 'env']);
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
