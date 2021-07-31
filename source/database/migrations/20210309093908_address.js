// Tabela Address

const tableName = 'address';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        /*
        table.string('street', 100).notNullable();
        table.string('neigh', 100).notNullable();
        table.string('complement', 100);
        table.string('num', 10);
        table.string('zipcode', 8).notNullable();
        table.string('city', 60).notNullable();
        table.string('state', 60).notNullable();
        table.string('country', 60).notNullable();
        */
        table.increments('id').notNullable().primary();
        table.string('address', 256).notNullable();
        table.integer('id_loc').unsigned().references('id_loc').inTable('position');
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
