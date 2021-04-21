//Tabela Evac

const tableName = 'evac';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.datetime('datime', { precision: 6 });
        table.integer('displaced').unsigned();
        table.integer('evacuated').unsigned();
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
