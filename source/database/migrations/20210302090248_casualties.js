// Tabela Casualties

const tableName = 'casualties';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('id_event', 40).notNullable().references('id').inTable('event');
        table.string('context', 15).notNullable().references('context').inTable('casualties_context');
        table.datetime('datime', { precision: 6 });
        table.integer('decont').unsigned();
        table.integer('triagered').unsigned();
        table.integer('triageyellow').unsigned();
        table.integer('triagegreen').unsigned();
        table.integer('triageblack').unsigned();
        table.integer('missing').unsigned();
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
