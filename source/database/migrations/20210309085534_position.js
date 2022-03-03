// Tabela Position

const tableName = 'position';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id_loc').notNullable().primary();
        table.string('name', 80);
        //table.specificType('coord', 'Geometry');
        table.integer('id_egeo').unsigned().notNullable().references('id').inTable('egeo');
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
