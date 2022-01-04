// Tabela Contatos de Emergência

const tableName = 'emergency_contact'

exports.up = function(knex) {
    await knex.schema.createTable(tableName, function(table) {
        table.increments('id').notNullable().primary();
        table.string('name', 50).notNullable();
        table.string('phone',11).notNullable();
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

exports.down = function(knex) {
    return knex.schema.dropTable(tableName);
};
