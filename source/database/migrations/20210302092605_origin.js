// Tabela Origin

const tableName = 'origin';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('id_org', 40).notNullable();
        table.string('name', 80);
        table.integer('id_user').unsigned().references('id').inTable('user');   //Gestor
        table.string('id_context', 40).notNullable().references('id').inTable('context');
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
