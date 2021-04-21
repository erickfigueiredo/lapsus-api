// Tabela Shapefile

const tableName = 'shapefile';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').notNullable().primary();
        table.string('title', 50).notNullable().unique();
        table.string('uri', 100).notNullable();
        table.string('desc', 100);
        table.integer('added_by').unsigned().notNullable().references('id').inTable('user');
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
