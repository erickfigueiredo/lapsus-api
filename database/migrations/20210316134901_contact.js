// Tabela Contact

const tableName = 'contact';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').notNullable().primary();
        table.string('sender', 50).notNullable();
        table.string('subject', 50).notNullable();
        table.string('email', 100).notNullable();
        table.string('body', 500).notNullable();
        //table.integer('id_user').references('id').inTable('user')
        table.boolean('is_visualized').defaultTo(false).notNullable();
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
