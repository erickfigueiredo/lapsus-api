// Tabela Org Information

const tableName = 'org_information'

exports.up = function(knex) {
    await knex.schema.createTable(tableName, function(table) {
        table.increments('id').notNullable().primary();
        table.string('name', 80).notNullable();
        table.string('uuid',40).notNullable();
        table.boolean('was_updated').defaultTo('false').notNullable();
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
