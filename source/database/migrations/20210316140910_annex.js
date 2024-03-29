// Tabela Annex

const tableName = 'annex';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').notNullable().primary();
        table.string('uri', 80).notNullable();
        table.string('path', 200).notNullable();
        table.integer('id_contribution').unsigned().notNullable().references('id').inTable('contribution');
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
