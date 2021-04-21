// Tabela Etype_actornv3

const tableName = 'etype_actornv3';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.string('actornv3', 10).notNullable();
        table.string('actornv2', 10).notNullable();
        table.string('actor', 10).notNullable();
        table.string('desc', 100);
        table.foreign(['actornv2', 'actor']).references(['actornv2', 'actor']).on('etype_actornv2');
        table.primary(['actornv3', 'actornv2', 'actor']);
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
