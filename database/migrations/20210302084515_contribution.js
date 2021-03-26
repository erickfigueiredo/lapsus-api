// Tabela Contribution

const tableName = 'contribution';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.datetime('occurrence', { precision: 6 });
        table.integer('risk_damage').unsigned();
        table.integer('victims').unsigned();
        table.string('desc', 500);
        table.integer('published').unsigned();
        table.specificType('local', 'Geometry');
        table.integer('category').unsigned().notNullable().references('id').inTable('category');
        table.integer('user').unsigned().notNullable().references('id').inTable('user');
        table.integer('colaborator').unsigned().notNullable().references('id').inTable('user');
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
