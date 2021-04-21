// Tabela Category

const tableName = 'category';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').notNullable().primary();
        table.string('name', 40).notNullable();
        table.string('desc', 500);
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
