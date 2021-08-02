// Tabela Event_scale

const tableName = 'event_scale';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.integer('scale').unsigned().primary().notNullable();
        table.string('desc', 200);
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
